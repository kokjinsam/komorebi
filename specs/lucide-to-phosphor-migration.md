# Lucide → Phosphor Icon Migration

Replace every `lucide-react` icon in `komorebi` with the equivalent icon from
`@phosphor-icons/react`, normalize naming, and introduce an optional
`<Provider>` that sets sensible Phosphor defaults for consumers.

---

## Context

- Komorebi is a React Aria component library (`@kokjinsam/komorebi`).
- `@phosphor-icons/react@^2.1.10` is already declared as a `peerDependency`.
- 23 distinct Lucide icons are referenced across 23 files (17 in `src/`,
  5 in `stories/`).
- **`lucide-react` is not in `package.json` and not in `pnpm-lock.yaml`** —
  the imports are unresolved. This migration repairs the broken state in
  addition to changing icon sets.

## Goals

1. Zero `lucide-react` imports anywhere in the repo.
2. All icons sourced from `@phosphor-icons/react` with a consistent
   import + naming convention.
3. A `<Provider>` component that sets `IconContext` defaults so consumers
   get a coherent Phosphor look without per-icon configuration.
4. Leverage Phosphor's `weight="fill"` for stateful UI (checked, selected,
   destructive) — a deliberate visual upgrade, not a like-for-like swap.
5. Storybook builds cleanly and all stories render.

## Non-goals

- **No consumer-facing icon-override props.** Components keep their icons
  hardcoded; adding overrides is a separate, future PR.
- **No `src/index.ts` barrel.** The package's missing entry-point /
  Vite build config is out of scope; do not invent one here.
- **No bundle-size measurement gate.** Acceptance is build + storybook
  smoke; consumers are expected to tree-shake Phosphor via their own
  bundler.
- **No codemod tooling.** ~23 files, mechanical changes — do them by hand
  and keep the diff reviewable.

---

## Design decisions (recorded from interview)

### 1. Weight policy: regular default, fill for state

- Default weight everywhere: `regular`.
- Switch to `weight="fill"` for the following stateful renders:
  - **Checkbox**: `CheckIcon` and `MinusIcon` when `checked` /
    `indeterminate`.
  - **Menu**: the checkmark for `isSelected` menu items.
  - **Calendar / RangeCalendar**: indicator on the selected date (today
    or selected day, whichever currently uses an icon).
  - **Toast / AlertDialog**: destructive / warning severity icon
    (`WarningIcon`, `WarningCircleIcon`) — fill weight; neutral/info
    severity stays `regular`.
- Everywhere else: rely on the `<Provider>` default, do not pass `weight`
  explicitly.

### 2. Import strategy: barrel import

- Always `import { Foo } from "@phosphor-icons/react"`.
- Trust Vite (and consumer bundlers) for tree-shaking.
- No deep imports, no SSR subpath, no internal `src/icons.ts` re-export
  shim.

### 3. Naming convention: always `Icon` suffix, aliased at import

- Every imported Phosphor icon is aliased to add an `Icon` suffix:

  ```ts
  import {
    CaretDown as CaretDownIcon,
    Check as CheckIcon,
  } from "@phosphor-icons/react"
  ```

- Component code only ever references the suffixed name
  (`<CaretDownIcon />`), so JSX is unambiguous about icon vs. component.
- Avoid naming collisions: `Calendar as CalendarIcon` is required because
  Komorebi already exports a `Calendar` component.

### 4. Sizing: keep Tailwind classes

- Do **not** use Phosphor's numeric `size` prop.
- Continue with `className="size-4"` / `h-4 w-4` exactly as the Lucide
  versions did. Phosphor respects CSS sizing; classes stay responsive to
  Tailwind theme tokens.

### 5. `<Provider>` component

- File: **new** `src/Provider.tsx`.
- Wraps children in Phosphor's `IconContext.Provider` with defaults:

  ```ts
  { weight: "regular", mirrored: false }
  ```

- Does **not** set `size` (Tailwind controls size).
- Optional for consumers — every component still works without it
  because each call site that needs a non-default weight passes
  `weight="fill"` explicitly.
- Not exported through a barrel (none exists). It's available at
  `@kokjinsam/komorebi/Provider` once Vite builds, mirroring the
  pattern of other per-file components.

### 6. Stories: migrated in-PR

- All 5 affected stories files (`Menu.stories.tsx`,
  `Popover.stories.tsx`, `ToggleButtonGroup.stories.tsx`,
  `Toolbar.stories.tsx`, `Tooltip.stories.tsx`) are updated in the same
  PR. They are currently broken (Lucide not installed); leaving them
  for a follow-up would leave Storybook unbuildable.

---

## Icon mapping table

| Lucide (any alias)           | Phosphor              | Imported as          | Notes |
|------------------------------|-----------------------|----------------------|-------|
| `AlertCircleIcon`            | `WarningCircle`       | `WarningCircleIcon`  | |
| `AlertTriangle`              | `Warning`             | `WarningIcon`        | Used in destructive AlertDialog |
| `ArrowUp`                    | `ArrowUp`             | `ArrowUpIcon`        | Table sort indicator |
| `Bold`, `BoldIcon`           | `TextB`               | `BoldIcon`           | Toolbar story |
| `CalendarIcon`               | `Calendar`            | `CalendarIcon`       | Phosphor `Calendar` aliased to avoid collision with Komorebi's `Calendar` component |
| `Check`                      | `Check`               | `CheckIcon`          | `weight="fill"` when checked/selected |
| `ChevronDown`                | `CaretDown`           | `CaretDownIcon`      | |
| `ChevronLeft`                | `CaretLeft`           | `CaretLeftIcon`      | |
| `ChevronRight`               | `CaretRight`          | `CaretRightIcon`     | |
| `ChevronUp`                  | `CaretUp`             | `CaretUpIcon`        | |
| `HelpCircle`                 | `Question`            | `QuestionIcon`       | |
| `InfoIcon`                   | `Info`                | `InfoIcon`           | |
| `Italic`, `ItalicIcon`       | `TextItalic`          | `ItalicIcon`         | |
| `Minus`                      | `Minus`               | `MinusIcon`          | `weight="fill"` for indeterminate checkbox |
| `MoreHorizontal`             | `DotsThree`           | `DotsThreeIcon`      | |
| `PrinterIcon`                | `Printer`             | `PrinterIcon`        | |
| `SaveIcon`                   | `DownloadSimple`      | `DownloadSimpleIcon` | Conceptual rename — no floppy metaphor |
| `SearchIcon`                 | `MagnifyingGlass`     | `MagnifyingGlassIcon`| |
| `Underline`, `UnderlineIcon` | `TextUnderline`       | `UnderlineIcon`      | |
| `XIcon`                      | `X`                   | `XIcon`              | |

Use one aliased name per imported icon per file, even if multiple Lucide
aliases (`Bold`, `BoldIcon`) collapse to it.

---

## File-by-file changes

### Source (`src/`)

Update the import line and any JSX usage. Apply `weight="fill"` per
§ Weight policy.

- `src/AlertDialog.tsx` — `AlertTriangle` → `WarningIcon`. Use
  `weight="fill"` on destructive variant.
- `src/Breadcrumbs.tsx` — `ChevronRight` → `CaretRightIcon`.
- `src/Calendar.tsx` — `ChevronLeft`/`ChevronRight` → `CaretLeftIcon`/
  `CaretRightIcon`. If an icon is rendered for the currently selected
  date, use `weight="fill"`.
- `src/Checkbox.tsx` — `Check` → `CheckIcon` (fill when checked);
  `Minus` (if used) → `MinusIcon` (fill when indeterminate).
- `src/ComboBox.tsx` — `ChevronDown` → `CaretDownIcon`.
- `src/DatePicker.tsx` — `CalendarIcon` (Lucide) → Phosphor `Calendar`
  imported as `CalendarIcon`.
- `src/DateRangePicker.tsx` — same as DatePicker.
- `src/Disclosure.tsx` — `ChevronRight` → `CaretRightIcon`.
- `src/ListBox.tsx` — replace listed icons; preserve `Check` selected
  marker with `weight="fill"`.
- `src/Menu.tsx` — `Check`, `ChevronRight` → `CheckIcon` (fill on
  selected), `CaretRightIcon` (submenu indicator, regular weight).
- `src/Meter.tsx` — `AlertTriangle` → `WarningIcon`. Fill for critical
  threshold state if currently rendered as solid.
- `src/NumberField.tsx` — `ChevronUp`/`ChevronDown` → `CaretUpIcon`/
  `CaretDownIcon`.
- `src/SearchField.tsx` — `SearchIcon` (Lucide) → Phosphor
  `MagnifyingGlass` imported as `MagnifyingGlassIcon`.
- `src/Select.tsx` — `ChevronDown` → `CaretDownIcon`.
- `src/Table.tsx` — `ArrowUp`, `ChevronRight` → `ArrowUpIcon`,
  `CaretRightIcon`.
- `src/TagGroup.tsx` — replace listed icons.
- `src/Toast.tsx` — `AlertCircleIcon`, `InfoIcon` → `WarningCircleIcon`,
  `InfoIcon`. `weight="fill"` for destructive/warning severity; regular
  for info.
- `src/Tree.tsx` — `ChevronRight` → `CaretRightIcon`.

### Stories (`stories/`)

- `stories/Menu.stories.tsx` — update text-format icons (`Bold`,
  `Italic`, `Underline` → `BoldIcon`, `ItalicIcon`, `UnderlineIcon`).
- `stories/Popover.stories.tsx` — `HelpCircle` → `QuestionIcon`.
- `stories/ToggleButtonGroup.stories.tsx` — text-format icons.
- `stories/Toolbar.stories.tsx` — text-format icons; `PrinterIcon`,
  `SaveIcon` → `PrinterIcon`, `DownloadSimpleIcon`.
- `stories/Tooltip.stories.tsx` — `HelpCircle` → `QuestionIcon` (or
  whatever the story uses).

### New file

- `src/Provider.tsx`:

  ```tsx
  import { IconContext } from "@phosphor-icons/react"
  import type { ReactNode } from "react"

  export function Provider({ children }: { children: ReactNode }) {
    return (
      <IconContext.Provider value={{ weight: "regular", mirrored: false }}>
        {children}
      </IconContext.Provider>
    )
  }
  ```

  No barrel re-export (none exists). Consumers import directly:
  `import { Provider } from "@kokjinsam/komorebi/Provider"`.

---

## Acceptance criteria

1. `pnpm build` exits 0.
2. `pnpm storybook` boots and at least the migrated stories render
   without console errors.
3. `grep -rn "lucide" src stories package.json pnpm-lock.yaml` returns
   no results.
4. `grep -rn "@phosphor-icons/react" src stories` shows every icon
   imported with `as XxxIcon` aliasing (no bare Phosphor names in JSX).
5. The four stateful-fill components (Checkbox, Menu, Calendar, Toast/
   AlertDialog) demonstrably render `weight="fill"` in their stateful
   variants — verified visually in Storybook on one example each.

## Out-of-scope follow-ups

- Component-level `icon` override props for consumers.
- `src/index.ts` barrel + Vite library-build config.
- Bundle-size benchmarking.
- Adopting `weight="duotone"` anywhere.
