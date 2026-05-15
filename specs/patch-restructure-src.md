# Patch — Restructure `src/`, relocate CSS, fix lint

Status: proposed
Owner: @kokjinsam
Branch target: `main`

## Goal

Three patch fixes, applied as one cohesive change:

1. Move all UI components from `src/*.tsx` into per-folder modules under `src/components/<Name>/index.tsx`.
2. Move all CSS into `src/styles/`.
3. Run `pnpm lint` (with `--fix`), then hand-fix any remaining errors **and** warnings, then run `pnpm fmt`.

This is a hard-cut refactor — no backwards-compatibility shims, no aliases at old paths.

## Decisions (locked in via interview)

| Topic | Decision |
| --- | --- |
| Component layout | Per-folder: `src/components/<PascalName>/index.tsx` |
| CSS folder name | `src/styles/` (not `/src/files`) |
| `utils.ts` | Move to `src/utils/`, rename to `cn.ts`, keep all three exports unchanged |
| `Provider.tsx` | Move to `src/utils/icon-provider.tsx`, rename export `Provider` → `IconProvider` |
| File naming | Components: **PascalCase** folder name. Utils: **kebab-case** filename. |
| Cross-tree imports | Use `@/...` alias (already wired in `vite.config.ts`) |
| `@/utils` resolution | Add `src/utils/index.ts` barrel re-exporting from `cn.ts` + `icon-provider.tsx` |
| Public API barrel | New `src/index.ts` re-exporting **every** component + `IconProvider` + `cn` + `focusRing` + `composeTailwindRenderProps` |
| Stories | Rewrite all story imports to come from `"../src"` (the barrel) |
| Back-compat shims | None |

## Target structure

```
src/
├── index.ts                        # NEW — public API barrel
├── components/
│   ├── AlertDialog/index.tsx
│   ├── Badge/index.tsx
│   ├── Breadcrumbs/index.tsx
│   ├── Button/index.tsx
│   ├── Calendar/index.tsx
│   ├── Card/index.tsx
│   ├── Checkbox/index.tsx
│   ├── CheckboxGroup/index.tsx
│   ├── ColorArea/index.tsx
│   ├── ColorField/index.tsx
│   ├── ColorPicker/index.tsx
│   ├── ColorSlider/index.tsx
│   ├── ColorSwatch/index.tsx
│   ├── ColorSwatchPicker/index.tsx
│   ├── ColorThumb/index.tsx
│   ├── ColorWheel/index.tsx
│   ├── ComboBox/index.tsx
│   ├── CommandPalette/index.tsx
│   ├── DateField/index.tsx
│   ├── DatePicker/index.tsx
│   ├── DateRangePicker/index.tsx
│   ├── Dialog/index.tsx
│   ├── Disclosure/index.tsx
│   ├── DisclosureGroup/index.tsx
│   ├── DropZone/index.tsx
│   ├── Field/index.tsx
│   ├── FieldButton/index.tsx
│   ├── Form/index.tsx
│   ├── GridList/index.tsx
│   ├── Link/index.tsx
│   ├── ListBox/index.tsx
│   ├── Menu/index.tsx
│   ├── Meter/index.tsx
│   ├── Modal/index.tsx
│   ├── NumberField/index.tsx
│   ├── Popover/index.tsx
│   ├── ProgressBar/index.tsx
│   ├── RadioGroup/index.tsx
│   ├── RangeCalendar/index.tsx
│   ├── SearchField/index.tsx
│   ├── Select/index.tsx
│   ├── Separator/index.tsx
│   ├── Slider/index.tsx
│   ├── Switch/index.tsx
│   ├── Table/index.tsx
│   ├── Tabs/index.tsx
│   ├── TagGroup/index.tsx
│   ├── TextField/index.tsx
│   ├── TimeField/index.tsx
│   ├── Toast/index.tsx              # imports "@/styles/Toast.css"
│   ├── ToggleButton/index.tsx
│   ├── ToggleButtonGroup/index.tsx
│   ├── Toolbar/index.tsx
│   ├── Tooltip/index.tsx
│   └── Tree/index.tsx
├── styles/
│   ├── index.css                    # was src/index.css
│   └── Toast.css                    # was src/Toast.css
└── utils/
    ├── index.ts                     # NEW — barrel for @/utils
    ├── cn.ts                        # renamed from src/utils.ts (exports unchanged)
    └── icon-provider.tsx            # renamed from src/Provider.tsx; export IconProvider
```

## Step-by-step plan

### 1. Create the new directories

`mkdir -p src/components src/styles src/utils` — then 53 component subfolders under `src/components/`.

### 2. Move components

For each `src/<Name>.tsx`:

```
git mv src/<Name>.tsx src/components/<Name>/index.tsx
```

Use `git mv` so history is preserved.

### 3. Move CSS

```
git mv src/index.css src/styles/index.css
git mv src/Toast.css src/styles/Toast.css
```

### 4. Relocate and rename utils

```
git mv src/utils.ts src/utils/cn.ts
git mv src/Provider.tsx src/utils/icon-provider.tsx
```

In `src/utils/icon-provider.tsx`, rename the exported function `Provider` → `IconProvider`. (No other call sites currently use it inside `src/`, so this is a contained rename.)

Add `src/utils/index.ts`:

```ts
export * from "./cn"
export { IconProvider } from "./icon-provider"
```

### 5. Rewrite intra-`src` imports

Two classes of imports need to change.

**5a. `./utils` → `@/utils`** (32 callsites)

```diff
- import { cn, focusRing } from "./utils"
+ import { cn, focusRing } from "@/utils"
```

**5b. Sibling component imports** — currently `./X`, must become `../X` after the per-folder move. Example: in `src/components/AlertDialog/index.tsx`:

```diff
- import { Button } from "./Button"
- import { Dialog } from "./Dialog"
+ import { Button } from "../Button"
+ import { Dialog } from "../Dialog"
```

Known files with sibling imports (verified by grep — not exhaustive, re-grep before applying):

| File | Imports |
| --- | --- |
| `AlertDialog` | Button, Dialog |
| `Breadcrumbs` | Link |
| `ColorField` | Field |
| `ColorSlider` | ColorThumb, Field |
| `ColorWheel` | ColorThumb |
| `ComboBox` | Field |
| `CommandPalette` | Menu, Modal, SearchField |
| `DatePicker` | Calendar, DateField, Field, FieldButton, Popover |
| `DateRangePicker` | DateField, Field, FieldButton, Popover, RangeCalendar |
| `Disclosure` | Button |
| `GridList` | Checkbox |
| `Meter` | Field |
| `NumberField` | Field |
| `ProgressBar` | Field |
| `RangeCalendar` | Calendar |
| `SearchField` | Field, FieldButton |
| `Slider` | Field |
| (re-grep for the full set before editing — `grep -rEn "from ['\\\"]\\./[A-Z]" src/`) |

Sibling imports stay relative (`../X`) rather than alias (`@/components/X`) for short hop ergonomics. The alias is reserved for cross-tree references (utils, styles).

**5c. Toast CSS import**

In `src/components/Toast/index.tsx`:

```diff
- import "./Toast.css"
+ import "@/styles/Toast.css"
```

### 6. Create `src/index.ts` (public API barrel)

Re-export every component plus the utils that should be public:

```ts
// Components
export * from "./components/AlertDialog"
export * from "./components/Badge"
// ...one line per component...
export * from "./components/Tree"

// Utilities (public)
export { IconProvider, cn, focusRing, composeTailwindRenderProps } from "./utils"
```

This satisfies `vite.config.ts`'s `entry: { index: resolve(__dirname, "src/index.ts") }`, which currently has no target.

### 7. Update story imports

All 49 story files currently import like `import { Button } from "../src/Button"`. Rewrite to:

```ts
import { Button } from "../src"
```

Done via a single sed pass:

```
find stories -name "*.stories.tsx" -exec sed -i '' -E \
  's|from "\.\./src/[A-Za-z]+"|from "../src"|g' {} +
```

Then verify with `pnpm tsc --noEmit` (via the build) or by running storybook.

### 8. Update `.storybook/preview.js`

```diff
- import "../src/index.css"
+ import "../src/styles/index.css"
```

### 9. Lint and format

Run in order:

```
pnpm lint --fix      # auto-fix safe issues
pnpm lint            # confirm no errors AND no warnings remain
# fix any residual lint findings (errors + warnings) by hand
pnpm fmt             # oxfmt the new tree
pnpm lint            # final pass — must be clean
```

Warnings are treated as errors for this patch (no `eslint-disable` band-aids; fix the underlying issue).

### 10. Smoke test

- `pnpm build` succeeds and emits `dist/index.js` + `dist/index.css` (no `src/index.ts` resolution error).
- `pnpm storybook` boots; spot-check a handful of components (Button, AlertDialog, DatePicker, Toast, CommandPalette — the cross-importers).
- `pnpm build-storybook` succeeds.
- `git status` — nothing weird left behind in `src/` root (only `src/index.ts` should remain at the root level).

## Things that should NOT change

- `package.json` (no rename of `./styles.css` export — Vite still emits `dist/index.css`).
- `vite.config.ts` (entry is already `src/index.ts`; alias `@` → `src` already present).
- `tsconfig.json` `include` array (`src`, `stories` is still correct).
- Component public APIs — names, props, render output unchanged.
- The `sideEffects: ["*.css", "dist/styles/*.css"]` entry in `package.json` — CSS imports still need preservation.
- Existing skills/specs under `specs/*.md` referencing `src/index.css` — those are historical docs, not runtime references. Leave them.

## Risks / sharp edges

- **Stale references in non-`src` paths.** `.storybook/preview.js` is the obvious one (handled in step 8). Re-grep `src/index.css`, `src/Toast.css`, `src/Provider`, `from "./utils"` after the move to catch anything missed.
- **`vite-plugin-dts` glob.** It uses `include: ["src/**/*", ...]` — this already covers the new layout, no change needed.
- **`IconContext.Provider` rename collision.** Renaming the exported function to `IconProvider` shadows nothing; the inner `IconContext.Provider` JSX is unaffected.
- **Per-folder layout enables future colocation** (tests, types, css) but adds one directory of nesting. Stories importing from `"../src"` insulate consumers from this depth.
- **No back-compat shims.** Any external consumer of `@vrmn/komorebi` pinning a deep path (`@vrmn/komorebi/dist/Button.js`) will break — acceptable at v0.0.1.

## Out of scope

- Splitting `Card` / `Field` / `DateField` into multiple files even though each exports multiple symbols. They stay as one `index.tsx` per folder.
- Renaming any component besides `Provider → IconProvider`.
- Reorganizing components into category subfolders (forms/, overlays/, etc.).
- Adding tests (none exist yet — out of scope for a layout patch).
- Touching `oxlint.config.ts` rules. We fix code to match the rules, not the other way around.

## Acceptance criteria

- [ ] No `*.tsx` or `*.ts` files remain at `src/` root except `src/index.ts`.
- [ ] No `*.css` files remain anywhere except `src/styles/`.
- [ ] `src/utils/` contains exactly `index.ts`, `cn.ts`, `icon-provider.tsx`.
- [ ] All component sibling imports use `../X`; all `utils` imports use `@/utils`; Toast CSS uses `@/styles/Toast.css`.
- [ ] All story files import from `"../src"` only.
- [ ] `pnpm lint` exits 0 with zero warnings.
- [ ] `pnpm fmt` produces no diff on second run.
- [ ] `pnpm build` succeeds.
- [ ] `pnpm storybook` renders without console errors on a spot-check of Button, AlertDialog, DatePicker, Toast, CommandPalette.
- [ ] `git log --follow` works on any moved file (verifies `git mv` was used, not delete+add).
