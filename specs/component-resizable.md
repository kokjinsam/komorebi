# Component — Resizable

Status: proposed
Owner: @kokjinsam
Branch target: `main`
Adapts: [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/base/resizable)
Built on: [`react-resizable-panels`](https://github.com/bvaughn/react-resizable-panels)

## Goal

Add a `Resizable` component to komorebi that wraps `react-resizable-panels` and ports shadcn's design language, adapted to komorebi's conventions (namespaced API, tailwind-variants styling, Phosphor icons, design tokens).

This is a layout primitive — three composable pieces (`Group`, `Panel`, `Handle`) that consumers assemble.

## Decisions (locked in via interview)

| Topic | Decision | Rationale |
| --- | --- | --- |
| Public API shape | **Namespaced**: `Resizable.Group`, `Resizable.Panel`, `Resizable.Handle` | Single import; composition reads cleanly. Departs from komorebi's flat-export convention, accepted because this is the first 3-piece composition primitive. |
| Imperative refs | **Silently forwarded**; only `collapse`/`expand`/`resize` documented | Power users can reach the rest via TS; docs stay tight. |
| Orientation prop | **`direction`** (`"horizontal"` \| `"vertical"`) | Match upstream + shadcn. Inconsistent with komorebi's `orientation`-named components, accepted for zero-translation docs. |
| Visible handle | 1px hairline (`bg-border`) | Clean hairline aesthetic. |
| Hit area | ~8px invisible, via `::after` pseudo | Decoupled from visible thickness — fixes shadcn's well-known trackpad/touch weakness. |
| Grip indicator | **Opt-in via `withHandle` prop**; Phosphor `DotsSixVertical` (vertical handle) / `DotsSix` (horizontal handle) | Off by default keeps hairline look; opt-in for sidebar-toggle UIs. |
| Grip badge | **Compact**: 4w × 12h, `bg-border`, `rounded-xs`, icon `text-muted-foreground` | Reads as part of the line. |
| Handle states | `bg-border` idle → `bg-ring/50` hover → `bg-ring` drag | Reuses komorebi's existing focus-ring color language. |
| Keyboard focus | Visible focus ring: `focus-visible:ring-3 focus-visible:ring-ring/30` | Matches Tabs/Button. Required for keyboard resize users. |
| Forced-colors mode | `forced-colors:bg-[ButtonBorder]` | Matches `Separator`. Cheap a11y win. |
| Global cursor lock during drag | **Rejected** | Avoids body manipulation. Cursor briefly flickers if pointer leaves the handle area — acceptable. |
| Collapse animation | **None** — props passed through unchanged | Matches upstream + shadcn. Animating `flex-grow` is jank-prone. |
| Panel defaults | **None** — pass-through | Don't second-guess the consumer. Forgetting `minSize` lets a panel disappear; documented but not guard-railed. |
| `disabled` on handle | **Passed through**; renders as plain divider (same color, no hover state) | Useful for read-only layouts. |
| `autoSaveId` / `storage` | **Passed through transparently** | Same API as upstream. |
| SSR | Standard `"use client"` directive | No extra callouts (no flash-on-mount docs, no SSR fallback recipe). |
| Dependency placement | **`dependencies`** (not peerDependency) | Small leaf library; not something consumers typically pin. Differs from how `react-aria-components` is treated. |
| Stories | **One story**: nested 3-pane IDE layout (Sidebar \| Editor / Terminal) | Highest-signal demo. Covers nesting, both directions, default sizing. |

## API

### `Resizable.Group`

Wraps `PanelGroup`. Wires `data-slot="resizable-group"` for downstream CSS hooks.

```ts
type ResizableGroupProps = PanelGroupProps  // re-export upstream type, including `direction`, `autoSaveId`, `storage`, `id`, `onLayout`, etc.
```

- **`direction`**: `"horizontal" | "vertical"` — required.
- **`autoSaveId`**: `string` — opt-in localStorage persistence. Footgun: two groups with the same ID corrupt each other's saved layout. Documented in JSDoc on the prop.
- **`storage`**: `PanelGroupStorage` — swap localStorage for sessionStorage / custom.
- Refs: forwarded silently. Imperative API includes `getLayout()` / `setLayout(sizes: number[])`.

Base styles:
```
"flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
```

(`react-resizable-panels` sets `data-panel-group-direction` on the rendered element automatically.)

### `Resizable.Panel`

Wraps `Panel`. Re-exports upstream props verbatim.

```ts
type ResizablePanelProps = PanelProps
```

- `defaultSize`, `minSize`, `maxSize`, `collapsible`, `collapsedSize`, `onCollapse`, `onExpand`, `onResize`, `order`, `id` — pass-through.
- No komorebi-imposed defaults.
- Refs: forwarded silently. Documented imperative methods: `collapse()`, `expand()`, `resize(size: number)`. Undocumented but accessible via TS: `getId()`, `getSize()`, `isCollapsed()`, `isExpanded()`.
- `data-slot="resizable-panel"`.

Base styles:
```
""   // no styling — Panel is purely a layout primitive
```

(Consumers style panel content themselves. The Panel root gets inline `flex-grow` from the library and that's all it needs.)

### `Resizable.Handle`

Wraps `PanelResizeHandle`. Adds the visible line, hit area, focus ring, and optional grip.

```ts
type ResizableHandleProps = PanelResizeHandleProps & {
  /** Render a grip indicator (DotsSix icon in a small badge) centered on the handle. */
  withHandle?: boolean
}
```

- `disabled` — pass-through. When `disabled`, no hover/drag state classes apply; renders as a plain divider.
- `withHandle` — opt-in. When true, renders the compact grip badge as the only child of the handle.
- `id`, `onDragging`, `tabIndex` (defaults to `0`), `className` — pass-through.
- `data-slot="resizable-handle"`.

#### Handle styling

The handle element is **8px** wide (horizontal direction) or **8px** tall (vertical direction) — the full hit area. The visible 1px line is drawn by an absolutely-positioned `::after` pseudo-element so the visible thickness is decoupled from the hit zone.

Approximate tailwind-variants config:

```ts
const handleStyles = tv({
  base: [
    "relative flex shrink-0 items-center justify-center",
    "bg-transparent outline-none",
    // visible 1px line via ::after
    "after:absolute after:bg-border after:transition-colors",
    "forced-colors:after:bg-[ButtonBorder]",
    // hover / drag state on the visible line
    "data-[resize-handle-state=hover]:after:bg-ring/50",
    "data-[resize-handle-state=drag]:after:bg-ring",
    // focus
    "focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:rounded-sm",
    // disabled: no state changes
    "data-[panel-resize-handle-enabled=false]:after:!bg-border",
  ],
  variants: {
    // We can't read `direction` directly from the handle, but the rendered
    // element has `data-panel-group-direction` on the parent group. We use
    // a `group/resizable` className on Resizable.Group so the handle can
    // condition on its parent's direction.
    direction: {
      horizontal: [
        "w-2 h-full cursor-col-resize",
        "after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2",
      ],
      vertical: [
        "h-2 w-full cursor-row-resize",
        "after:inset-x-0 after:top-1/2 after:h-px after:-translate-y-1/2",
      ],
    },
  },
})
```

Implementation choice for orientation: instead of a `direction` prop on `Handle`, derive it from the group via parent selectors. Use a marker class on the group (`group/resizable`) and apply:

```
"group-data-[panel-group-direction=horizontal]/resizable:w-2 group-data-[panel-group-direction=horizontal]/resizable:cursor-col-resize ..."
```

This keeps `Resizable.Handle` API-free of orientation duplication.

#### Grip badge (`withHandle`)

When `withHandle` is true, the handle renders a single child:

- 4w × 12h badge (or 12w × 4h when group is vertical — same data-attribute trick)
- `bg-border`, `rounded-xs`
- Centered icon: `DotsSixVertical` when group is horizontal; `DotsSix` when group is vertical
- Icon: 10×10, `text-muted-foreground`

```tsx
<Resizable.Handle withHandle>
  {/* internal render */}
  <div
    data-slot="resizable-handle-grip"
    className="z-10 flex items-center justify-center rounded-xs bg-border
               group-data-[panel-group-direction=horizontal]/resizable:h-3 group-data-[panel-group-direction=horizontal]/resizable:w-1
               group-data-[panel-group-direction=vertical]/resizable:h-1 group-data-[panel-group-direction=vertical]/resizable:w-3"
  >
    <DotsSixVertical
      size={10}
      className="text-muted-foreground
                 group-data-[panel-group-direction=vertical]/resizable:hidden"
    />
    <DotsSix
      size={10}
      className="hidden text-muted-foreground
                 group-data-[panel-group-direction=vertical]/resizable:block"
    />
  </div>
</Resizable.Handle>
```

(Both icons rendered, one hidden — avoids reading direction from React context.)

## File layout

```
src/components/Resizable/
  └── index.tsx                  # all three sub-components + the Resizable namespace export
```

`index.tsx` exports:

```ts
"use client"

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
// ... wrappers ...

export const Resizable = {
  Group: ResizableGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
}

// Also re-export the upstream types so consumers can type refs:
export type {
  ImperativePanelGroupHandle,
  ImperativePanelHandle,
  PanelGroupProps,
  PanelProps,
  PanelResizeHandleProps,
} from "react-resizable-panels"
```

## Wiring into the package

1. **Install dependency** (note: regular dependency, not peer):
   ```
   pnpm add react-resizable-panels
   ```
2. **Add to `src/index.ts` barrel**:
   ```ts
   export * from "./components/Resizable"
   ```
3. **Run sync-exports** to update `package.json` `exports` map:
   ```
   pnpm sync-exports
   ```
   Verify a new `"./Resizable"` entry appears.
4. **Verify check-exports passes**:
   ```
   pnpm check-exports
   ```

## Storybook

Single story file: `stories/Resizable.stories.tsx`.

Story: **`IDELayout`** — nested 3-pane IDE layout.

```
┌────────────┬──────────────────────────────────────┐
│            │             Editor                   │
│  Sidebar   │                                      │
│  (file     ├──────────────────────────────────────┤
│   tree)    │             Terminal                 │
│            │                                      │
└────────────┴──────────────────────────────────────┘
```

```tsx
<Resizable.Group direction="horizontal" className="h-[480px] rounded-3xl border">
  <Resizable.Panel defaultSize={25} minSize={15}>
    <div className="p-4 text-sm text-muted-foreground">Sidebar</div>
  </Resizable.Panel>
  <Resizable.Handle withHandle />
  <Resizable.Panel defaultSize={75}>
    <Resizable.Group direction="vertical">
      <Resizable.Panel defaultSize={70}>
        <div className="p-4 text-sm">Editor</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel defaultSize={30} minSize={10}>
        <div className="p-4 text-sm font-mono">Terminal</div>
      </Resizable.Panel>
    </Resizable.Group>
  </Resizable.Panel>
</Resizable.Group>
```

This single story exercises: both directions, nesting, `withHandle` (so the grip is testable), `defaultSize`, and `minSize`. Story heading and source code render via `@storybook/addon-docs`.

Out of scope for stories (deferred):
- Basic horizontal-only / vertical-only standalone stories
- Persisted layout (`autoSaveId`) demo
- Imperative ref + collapse-button example
- Inside-a-Card composition test

## Things that should NOT change

- `oxlint.config.ts` — no rule changes; code must conform.
- `package.json` peer dependencies — `react-resizable-panels` goes into `dependencies`, not `peerDependencies`.
- Existing components — Resizable is additive.
- Build pipeline (`vite.config.ts`, `vite-plugin-dts`) — the `src/**/*` glob already picks up the new folder.

## Risks / sharp edges

- **Namespace export breaks tree-shaking expectations**: `import { Resizable } from "@vrmn/komorebi/Resizable"` pulls all three sub-components even if the consumer uses only `Resizable.Group`. Mitigated by per-component package export entry (`./Resizable`) so a consumer who imports the whole library still gets the rest tree-shaken; within the Resizable bundle, all three pieces ship together. Acceptable — they're typically used together anyway.
- **`direction` vs `orientation` inconsistency**: Documented as a deliberate divergence. Future linter rule could flag the inconsistency in component-author code, but not in this patch.
- **Panel with no `minSize` can collapse to 0%**: documented in JSDoc on `Resizable.Panel`. No runtime guard.
- **`autoSaveId` cross-mount collision**: documented in JSDoc. No runtime detection.
- **Hit area overlaps neighboring panels**: the 8px hit zone is centered on the 1px line, so the handle "steals" ~3.5px of clickable space from each adjacent panel. Acceptable — those pixels are next to a border, not over content the user typically clicks.
- **Drag cursor flicker**: since we deliberately don't lock body cursor, the OS cursor briefly reverts when the pointer leaves the handle's bounding box during a fast drag. Documented gotcha; can revisit if it bothers anyone in practice.
- **SSR with `autoSaveId`**: persisted sizes don't apply during SSR; first paint uses `defaultSize`, then hydration may shift the layout. Not documented in v1 (deferred); consumers will discover via testing.

## Out of scope

- Animation on collapse/expand.
- An `orientation` alias for `direction`.
- Runtime warnings for missing `minSize`.
- Multiple story scenarios beyond the IDE layout.
- An imperative-API showcase story.
- A shadcn-to-komorebi migration note.
- Adding tests (no test infrastructure exists in this repo).
- Splitting `index.tsx` into multiple files per sub-component (one file, namespace-exported, matches the rest of komorebi).

## Acceptance criteria

- [ ] `src/components/Resizable/index.tsx` exists and exports `Resizable` (namespace object) + upstream types.
- [ ] `Resizable.Group`, `Resizable.Panel`, `Resizable.Handle` all render with `data-slot` attributes.
- [ ] `Resizable.Handle` renders an 8px hit zone with a 1px visible line via `::after`.
- [ ] `Resizable.Handle withHandle` renders the compact 4×12 (or 12×4) `bg-border` `rounded-xs` badge with the correct Phosphor icon per orientation.
- [ ] Keyboard focus on the handle shows a visible focus ring (`ring-3 ring-ring/30`).
- [ ] Hover and drag states color the visible line `bg-ring/50` and `bg-ring` respectively.
- [ ] Forced-colors mode renders the line as `ButtonBorder`.
- [ ] `disabled` handle renders as a plain divider with no hover/drag color shift.
- [ ] `react-resizable-panels` appears in `dependencies` (not peer).
- [ ] `src/index.ts` re-exports `Resizable`.
- [ ] `package.json` `exports` includes `"./Resizable"` (via `pnpm sync-exports`).
- [ ] `pnpm check-exports` passes.
- [ ] `pnpm lint` exits 0 with zero warnings.
- [ ] `pnpm fmt` produces no diff on second run.
- [ ] `pnpm build` succeeds.
- [ ] `stories/Resizable.stories.tsx` renders the IDE layout story without console errors in `pnpm storybook`.
- [ ] Refs typed as `ImperativePanelHandle` / `ImperativePanelGroupHandle` can call `.collapse()`, `.expand()`, `.resize()` and `.getLayout()` / `.setLayout()` respectively (verified by TS compilation of an inline example, even if no story uses it).
