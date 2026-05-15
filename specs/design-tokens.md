# Design Tokens for Komorebi

> **Partially superseded by [`specs/luma-aesthetic.md`](./luma-aesthetic.md).**
> Where the two specs conflict, `luma-aesthetic.md` takes precedence.
> Specifically superseded: the Radius scale, State composition (hover/pressed
> via `color-mix`), Focus ring utility, Modal/Popover translucency, Chart token
> defaults, TagGroup variant names, and disabled styling patterns.
> The semantic token list, naming conventions, CSS export shape, `.dark` mode,
> and `forced-colors:` decisions remain valid.

Introduce a shadcn-aligned, CSS-variable–based design token system to
`@vrmn/komorebi` and migrate every component off hardcoded Tailwind
palette classes so consumers can re-theme the library by overriding tokens.

---

## Context

- Komorebi is a React Aria component library (`@vrmn/komorebi`), Tailwind 4
  + `tailwind-variants`, currently at v0.0.1.
- Every component hardcodes Tailwind palette classes (`bg-blue-600`,
  `dark:bg-neutral-800`, `border-red-700`, …) — ~17 colors × shades referenced
  across 40+ component files, each with explicit `dark:` overrides.
- shadcn-style `:root` + `.dark` CSS custom properties in `oklch()` are the
  target shape. The user supplied a canonical shadcn `globals.css` to align to.
- Tailwind 4 is already on the project (no `tailwind.config.js`); themes are
  expressed via `@theme` in CSS.

## Goals

1. Single source of truth for color/radius decisions, expressed as oklch
   CSS variables (`--background`, `--foreground`, `--primary`, …).
2. Every component reads from semantic tokens; **no `bg-blue-600` /
   `dark:bg-neutral-700` style classes remain in `src/*.tsx`**.
3. Library ships its own default theme (`src/index.css`, exposed via the
   package entry) — `import "@vrmn/komorebi/styles.css"` gives consumers
   a working look out of the box.
4. Consumers can re-theme by redeclaring any variable in their own CSS after
   the import. shadcn-using consumers get implicit theme inheritance because
   the token names are unprefixed and shadcn-identical where they overlap.
5. Dark mode controlled by `.dark` class on an ancestor element (shadcn
   convention), replacing the current `dark:` Tailwind variant usage at the
   component layer.
6. Storybook builds cleanly, every story renders, light + dark both look
   coherent (no visual regression validation beyond manual review).

## Non-goals

- **No core palette layer.** Tokens are semantic only (`--primary`,
  `--muted`, `--destructive`, …). No raw `--blue-500` / `--neutral-200`
  ramps. If a component needs a one-off shade, it derives it via `color-mix`
  on a semantic token rather than introducing a new core variable.
- **No `--success` / `--warning` / `--info` semantic tokens.** Status surfaces
  (Meter ranges, ProgressBar bands, Tag variants) consume the `--chart-1..5`
  palette instead. `--destructive` remains the only "negative" semantic token.
- **No success/warning Toast variants in this spec.** Toast keeps its current
  single (accent-bg) appearance; multi-variant Toasts are future work.
- **No new build pipeline or `src/index.ts` barrel.** Spec inherits the
  package's existing distribution shape (no entry point yet). CSS export
  mechanism is defined below; component code remains import-from-deep-path
  as today.
- **No visual snapshot tooling.** Acceptance is "Storybook builds + manual
  light/dark eyeball." Chromatic / `storybook-test-runner` are out of scope.
- **No Sidebar component.** Sidebar tokens (`--sidebar-*`) ship as forward-
  compatible stubs aliasing the main surface, but no component consumes them.
- **No prefix on token names.** `--primary`, not `--komorebi-primary`. This
  is an intentional design decision (see "Naming & namespacing" below).
- **No bundle-size or perf gate.** Adding `color-mix()` and CSS variables has
  negligible impact; we do not measure.

---

## Decisions (recorded from interview)

These shaped the spec — kept here for future readers asking "why".

1. **Two-layer rejected, semantic only.** Core palette (raw ramps) was
   considered and dropped: it doubles the public surface and isn't load-
   bearing for the current component set. Re-add later if a component
   genuinely needs a third shade of one role.
2. **Status palette consolidated into `--chart-*`.** No `--success` /
   `--warning`. Status-band UI (Meter low/mid/high) consumes
   `--chart-1..5`. Rationale: status colors are themable data viz from the
   consumer's perspective; one palette serves both.
3. **Accent color is consumer-themable.** Library ships a shadcn-neutral
   default (`--primary` near-black). Consumers pick blue / brand color
   downstream by overriding `--primary`. Komorebi makes no opinionated
   default beyond shadcn's.
4. **State composition via `color-mix()`.** No `--primary-hover` /
   `--primary-pressed` tokens. Hover / pressed / disabled / invalid states
   are derived inline in component classes using
   `color-mix(in oklch, var(--primary), black 10%)` and friends. Single
   token per role; states are mechanical.
5. **Border variation via `color-mix()`.** Public border tokens are
   `--border` and `--input` only (shadcn's set). "Stronger" / "subtle"
   border variants used by internal components (Field hovered border, Table
   header border) compose `--border` against `--foreground` /
   `--background` via `color-mix`.
6. **Radius derives from a single `--radius`.** Tailwind's `rounded-sm` /
   `rounded-md` / `rounded-lg` / `rounded-xl` are mapped to
   `calc(var(--radius) - 4px)` / `calc(var(--radius) - 2px)` /
   `var(--radius)` / `calc(var(--radius) + 4px)`. Components keep writing
   `rounded-lg` etc. and inherit the scale.
   > ⚠️ **Superseded by `specs/luma-aesthetic.md`:** The radius scale now uses
   > multipliers (`sm 0.6× / md 0.8× / lg 1× / xl 1.4× / 2xl 1.8× / 3xl 2.2× /
   > 4xl 2.6×`) and extends to `rounded-4xl`. Components use `rounded-4xl` for
   > buttons/cards/modals and `rounded-3xl` for inputs/popovers.
7. **Focus ring uses neutral `--ring`.** Komorebi's current blue focus ring
   becomes consumer-themable; default is shadcn's mid-neutral. `focusRing`
   in `src/utils.ts` is rewritten to reference `--ring`.
   > ⚠️ **Superseded by `specs/luma-aesthetic.md`:** The focus ring is now an
   > inset ring (`focus-visible:border-ring focus-visible:ring-3
   > focus-visible:ring-ring/30`) rather than an `outline outline-offset-2`.
   > The `focusRing` tv() helper in `src/utils.ts` emits these classes.
8. **Distribution: ship `tokens.css`.** Library exports a CSS file
   containing `:root` + `.dark` variable declarations. Consumer imports
   once. Documented override surface: every public token is stable, every
   `--kmb-*`–internal name (if added later) is private. None at present.
9. **Naming unprefixed, shadcn-aligned.** Tokens that exist in shadcn
   use shadcn's exact name (`--background`, `--foreground`, `--primary`,
   `--popover`, …). Komorebi-only tokens (`--ring-offset`, see below) are
   still unprefixed. Consumers using both shadcn and Komorebi in the same
   app get free theme inheritance.
10. **Dark mode via `.dark` class.** `@variant dark (&:where(.dark, .dark *))`
    is configured in Tailwind. The current `dark:` variant in component
    code continues to compile but should compile *against the .dark class
    selector*, not `prefers-color-scheme`.
11. **Migration: big bang in one PR.** All components migrated together;
    `index.css` rewritten to define tokens; `focusRing` utility updated;
    Storybook dark mode toggle wired to `.dark` class. Pre-1.0, so consumer
    breakage is acceptable.
12. **Chart tokens ship and double as Meter ranges.** `--chart-1..5` are
    public tokens. Meter's `bg-green-600` / `bg-orange-500` / `bg-red-600`
    range bands map to `--chart-1` (good) / `--chart-3` (caution) /
    `--destructive` (danger).
13. **Muted vs accent = shadcn split.** `--muted` for inert / quiet surfaces
    (Button "quiet" variant hover, Tabs inactive bg). `--accent` for active
    / selected hover (Calendar selected day, ListBox selected option). Even
    if both happen to be the same color in the default theme, the semantic
    distinction is preserved.
14. **Input states: shadcn-minimal.** `--input` (border) + `--background`
    (fill) + `--ring` (focused). Invalid / disabled derived via `color-mix`
    on `--destructive` / `--muted-foreground` respectively. No
    `--input-invalid` token.
15. **Validation: Storybook smoke + manual review.** Plus one new
    `Theming` story that renders a representative subset of components in
    a grid so the implementer (and future themers) have one place to look
    for the visual diff.

---

## Token list

All tokens defined in `:root` and overridden in `.dark`. Default values use
shadcn's canonical theme; `--chart-3` is shifted slightly to read as
"warning" rather than mid-neutral, since Komorebi co-opts it for caution
status.

### Surface tokens

| Token                  | Role                                                  |
| ---------------------- | ----------------------------------------------------- |
| `--background`         | App / page surface (`bg-white` today)                 |
| `--foreground`         | Default text on `--background`                        |
| `--card`               | Slightly raised surface (Tooltip uses this inverted)  |
| `--card-foreground`    | Text on `--card`                                      |
| `--popover`            | Floating surfaces: Modal, Popover, Menu, ListBox      |
| `--popover-foreground` | Text on `--popover`                                   |

### Role tokens (interactive)

| Token                      | Role                                              |
| -------------------------- | ------------------------------------------------- |
| `--primary`                | Primary Button bg, primary actions                |
| `--primary-foreground`     | Text/icon on `--primary`                          |
| `--secondary`              | Secondary Button bg                               |
| `--secondary-foreground`   | Text on `--secondary`                             |
| `--muted`                  | Quiet surfaces: Tabs inactive, Slider track       |
| `--muted-foreground`       | Secondary text, captions, disabled labels         |
| `--accent`                 | Hover / selected highlight (ListBox, Tree, Table) |
| `--accent-foreground`      | Text on `--accent`                                |
| `--destructive`            | Destructive Button bg, error states, invalid     |
| `--destructive-foreground` | Text on `--destructive` (`white` in both modes)   |

> **Note:** shadcn's snippet omits `--destructive-foreground`. We add it
> explicitly because every destructive surface in Komorebi pairs with white
> text and we don't want consumers to lose that pairing when they re-tint
> `--destructive`.

### Structural tokens

| Token            | Role                                                       |
| ---------------- | ---------------------------------------------------------- |
| `--border`       | Default border (Table, Tree, GridList container)           |
| `--input`        | Form control border (TextField, Select, NumberField, …)    |
| `--ring`         | Focus ring (replaces the blue `focusRing` util)            |
| `--ring-offset`  | Background gap around focus ring (= `--background` default) |
| `--radius`       | Single radius scalar; Tailwind utilities derive from it    |

### Data viz / status tokens

| Token       | Role                                                           |
| ----------- | -------------------------------------------------------------- |
| `--chart-1` | "Good" status (Meter ≤40%); chart series 1                    |
| `--chart-2` | Chart series 2                                                 |
| `--chart-3` | "Caution" status (Meter 40–80%); chart series 3 (warning hue) |
| `--chart-4` | Chart series 4                                                 |
| `--chart-5` | Chart series 5                                                 |

> `--destructive` doubles as "danger" status (Meter ≥80%). No `--success`
> or `--warning` aliases; component code references `--chart-1` /
> `--chart-3` directly so future re-themes flow through cleanly.

### Sidebar (forward-compatible stubs)

`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`,
`--sidebar-primary-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.

All default to aliasing the corresponding main token in `:root` and
`.dark`. No component currently consumes them. Reserved so consumers can
override sidebar surfaces independently when a Sidebar lands later.

---

## Distribution & consumption

### What ships

- `src/index.css` becomes the canonical theme file. Contents (sketch):

  ```css
  @import "tailwindcss";
  @plugin "tailwindcss-react-aria-components";
  @plugin "tailwindcss-animate";

  @variant dark (&:where(.dark, .dark *));

  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    /* …full token list, shadcn defaults… */
    --radius: 0.625rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    /* …dark overrides… */
  }

  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    /* …one entry per token… */
    --radius-sm: calc(var(--radius) - 4px);
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);
  }

  body {
    background: var(--background);
    color: var(--foreground);
    color-scheme: dark light;
  }
  ```

- The `@theme inline` block exposes every token as a Tailwind utility so
  component code can write `bg-primary`, `text-muted-foreground`,
  `border-input`, etc., directly.

### How consumers use it

```ts
// app entry
import "@vrmn/komorebi/styles.css";
```

The CSS export is added to `package.json` via `"exports"`:

```json
"exports": {
  ".": { "import": "./dist/index.js", "types": "./dist/src/index.d.ts" },
  "./styles.css": "./dist/index.css"
}
```

(Spec deliberately stays out of `dist/` mechanics — see non-goal on build
pipeline. The implementer keeps whatever Vite output path the existing
build emits and wires `./styles.css` to that.)

### Override patterns

Consumers override by redeclaring after the import:

```css
@import "@vrmn/komorebi/styles.css";

:root {
  --primary: oklch(0.55 0.18 250);   /* brand blue */
  --ring: oklch(0.55 0.18 250);
  --radius: 0.5rem;
}
```

shadcn-using consumers get implicit theme inheritance: their existing
`:root { --primary: … }` rules apply to Komorebi components automatically.

---

## State composition (the `color-mix` patterns)

> ⚠️ **Superseded by `specs/luma-aesthetic.md`:** Component hover/pressed states
> now use opacity-fade (`hover:bg-{token}/80 pressed:bg-{token}/70`) instead of
> `color-mix(...)`. The `interactive()` helper below was never implemented.

To stay on one token per role while expressing hover / pressed / disabled /
invalid, components compose states inline. The canonical recipes:

| State            | Recipe (against arbitrary `--token`)                                            |
| ---------------- | ------------------------------------------------------------------------------- |
| Default          | `var(--token)`                                                                  |
| Hover            | `color-mix(in oklch, var(--token), var(--foreground) 8%)`                       |
| Pressed (active) | `color-mix(in oklch, var(--token), var(--foreground) 16%)`                      |
| Disabled bg      | `color-mix(in oklch, var(--muted), transparent 50%)`                            |
| Disabled fg      | `var(--muted-foreground)`                                                       |
| Invalid border   | `var(--destructive)`                                                            |
| Subtle border    | `color-mix(in oklch, var(--border), transparent 50%)` *(use for Field hovered)* |
| Selection bg     | `color-mix(in oklch, var(--accent), transparent 80%)` *(Table/Tree/GridList)*   |
| Selection cap    | `var(--primary)` with `--primary-foreground` text *(Calendar/RangeCalendar)*    |

Tailwind 4 supports arbitrary values, so component classes write:

```ts
"bg-primary hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)] " +
"pressed:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_16%)]"
```

To keep this readable, the spec defines a `state(token)` helper convention
in `src/utils.ts` that returns a `tailwind-variants` fragment:

```ts
// src/utils.ts (new export)
export function interactive(token: string) {
  return {
    base: `bg-${token} text-${token}-foreground`,
    hover: `hover:bg-[color-mix(in_oklch,var(--${token}),var(--foreground)_8%)]`,
    pressed: `pressed:bg-[color-mix(in_oklch,var(--${token}),var(--foreground)_16%)]`,
    disabled: `disabled:bg-muted disabled:text-muted-foreground`
  };
}
```

Implementer is free to inline the strings rather than build the helper if
it reads cleaner per-component — both are acceptable.

---

## Special cases

### Tooltip — inverted surface

Tooltip is intentionally an inverted neutral (`bg-neutral-700` in light,
`bg-neutral-600` in dark). Map to `--card` / `--card-foreground` with
swapped roles: Tooltip uses `bg-foreground text-background` directly. No
new token. (The shadcn pattern; works in both themes for free.)

### TagGroup — named color variants

`TagGroup`'s `gray` / `red` / `green` / `yellow` / `blue` variants currently
encode palette identities. Map them to chart slots and destructive:

| Current variant | Token         |
| --------------- | ------------- |
| `gray`          | `--muted`     |
| `red`           | `--destructive` |
| `green`         | `--chart-1`   |
| `yellow`        | `--chart-3`   |
| `blue`          | `--chart-5`   |

Rename the variant prop values from color names (`gray`, `red`, …) to
semantic names (`neutral`, `danger`, `chart1`, `chart3`, `chart5`) — or
keep the old names as a thin alias if API stability is preferred. **Spec
recommends renaming** since the package is pre-1.0 and color names will
mislead once a consumer re-themes.

### Toast — accent surface

Toast uses `bg-blue-600 text-white`. Map to `bg-primary text-primary-foreground`.
Focus ring on the close button maps to `--ring`. Multi-variant Toasts
(success / error) are deferred.

### Color picker family

`ColorArea`, `ColorSlider`, `ColorWheel`, `ColorThumb`, `ColorSwatch`,
`ColorSwatchPicker`, `ColorField`, `ColorPicker` — these manipulate user-
selected colors, so their *content* is intentionally not themable. Their
*chrome* (thumb border, disabled fallback, swatch outline, focus ring) is.

- Thumb border: `border-background` (replaces `border-white`)
- Disabled track fallback: `bg-muted` (replaces `bg-neutral-300`)
- Swatch outline (high-contrast border): keep `border-black/10` →
  `border-[color-mix(in_oklch,var(--foreground),transparent_90%)]` for theme
  responsiveness, OR keep as `border-foreground/10` using Tailwind's
  opacity-modifier shorthand. Spec prefers the shorthand for readability.

### Meter — status bands

`Meter.tsx` computes a class based on percentage. New mapping:

```ts
function getColor(percentage: number) {
  if (percentage < 40) return "bg-chart-1";
  if (percentage < 80) return "bg-chart-3";
  return "bg-destructive";
}
```

And the value-label color when ≥80%: `text-destructive` (replaces
`text-red-600 dark:text-red-500`).

### `forced-colors` system color references

Every `forced-colors:bg-[Highlight]`, `forced-colors:text-[GrayText]`,
`forced-colors:border-[ButtonBorder]`, etc., stays unchanged. These are
Windows High Contrast Mode system colors, not Tailwind palette colors —
they're already the "tokenized" form for forced-colors mode.

### Focus ring utility

`src/utils.ts`'s `focusRing`:

```ts
// before
export const focusRing = tv({
  base: "outline outline-offset-2 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: { false: "outline-0", true: "outline-2" }
  }
});

// after
export const focusRing = tv({
  base: "outline outline-offset-2 outline-ring forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: { false: "outline-0", true: "outline-2" }
  }
});
```

(`outline-offset-2` becomes `outline-offset-[var(--ring-offset-width,2px)]`
if we want offset themable; spec keeps the hardcoded `2` since none of the
shadcn family exposes ring offset width as a token.)

---

## Per-component mapping

Every `src/*.tsx` file. Columns:

- **From** — representative current class (light/dark pairs collapsed).
- **To** — token-driven replacement. `dark:` variants drop unless a token
  *behavior* (not value) needs to differ per mode, which it doesn't in any
  of the rows below.

### AlertDialog.tsx

| From                                       | To                  |
| ------------------------------------------ | ------------------- |
| `text-red-500` (destructive icon)          | `text-destructive`  |
| `text-blue-500` (info icon)                | `text-primary`      |
| `text-neutral-500 dark:text-neutral-400`   | `text-muted-foreground` |

### Breadcrumbs.tsx

| From                                       | To                      |
| ------------------------------------------ | ----------------------- |
| `text-neutral-600 dark:text-neutral-400`   | `text-muted-foreground` |

### Button.tsx

| Variant      | From                                                                          | To                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| (base)       | `border border-transparent … dark:border-white/10`                            | `border border-transparent dark:border-foreground/10` (or drop `dark:` since `foreground/10` already mode-flips correctly)                        |
| `primary`    | `bg-blue-600 text-white hover:bg-blue-700 pressed:bg-blue-800`                | `bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)] pressed:bg-[color-mix(...,16%)]`           |
| `secondary`  | `bg-neutral-50 text-neutral-800 hover:bg-neutral-100 …`                       | `bg-secondary text-secondary-foreground hover:bg-[color-mix(...,8%)] pressed:bg-[color-mix(...,16%)]` plus `border-input`                         |
| `destructive`| `bg-red-700 text-white hover:bg-red-800 pressed:bg-red-900`                   | `bg-destructive text-destructive-foreground hover:bg-[color-mix(...,8%)] pressed:bg-[color-mix(...,16%)]`                                         |
| `quiet`      | `bg-transparent text-neutral-800 hover:bg-neutral-200 pressed:bg-neutral-300` | `bg-transparent text-foreground hover:bg-muted pressed:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)]`                                |
| disabled     | `bg-neutral-100 text-neutral-300 …`                                           | `bg-muted text-muted-foreground forced-colors:text-[GrayText]`                                                                                    |
| pending spinner stroke fallback | `"light-dark(black, white)"` for secondary/quiet, `"white"` otherwise | `var(--foreground)` for secondary/quiet, `var(--primary-foreground)` otherwise — passed via inline style                                          |

### Calendar.tsx / RangeCalendar.tsx

| From                                                       | To                                          |
| ---------------------------------------------------------- | ------------------------------------------- |
| `bg-blue-600 text-white` (selected cap)                    | `bg-primary text-primary-foreground`        |
| `invalid:bg-red-600`                                       | `invalid:bg-destructive`                    |
| `hover:bg-neutral-200 dark:hover:bg-neutral-700` (cells)   | `hover:bg-muted`                            |
| `pressed:bg-neutral-300 dark:pressed:bg-neutral-600`       | `pressed:bg-[color-mix(...muted...,8%)]`    |
| `text-neutral-900 dark:text-neutral-200`                   | `text-foreground`                           |
| `text-neutral-300 dark:text-neutral-600` (disabled cell)   | `text-muted-foreground`                     |
| `text-red-600` (errorMessage)                              | `text-destructive`                          |
| `text-neutral-500` (header cell)                           | `text-muted-foreground`                     |
| Range selection bg `bg-blue-100 dark:bg-blue-700/30`       | `bg-accent` (default theme: muted-ish blue) |
| Range hover `hover:bg-blue-200 dark:hover:bg-blue-900`     | `hover:bg-[color-mix(...accent...,8%)]`     |
| Range pressed `pressed:bg-blue-300 dark:pressed:bg-blue-800` | `pressed:bg-[color-mix(...accent...,16%)]` |
| Invalid range `bg-red-200 dark:bg-red-900`                 | `bg-[color-mix(in_oklch,var(--destructive),transparent_80%)]` |

### Checkbox.tsx / CheckboxGroup.tsx

| From                                                                       | To                                                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `text-neutral-800 dark:text-neutral-200`                                   | `text-foreground`                                                                 |
| `text-neutral-300 dark:text-neutral-600` (disabled)                        | `text-muted-foreground`                                                           |
| `bg-white dark:bg-neutral-900` (box bg)                                    | `bg-background`                                                                   |
| Border color CSS var `--color: var(--color-neutral-400)`                   | `--color: var(--input)` (use `--input` for unchecked, `--primary` for checked)    |
| `text-white dark:text-neutral-900` (check icon)                            | `text-primary-foreground`                                                         |
| `group-disabled:text-neutral-400 dark:group-disabled:text-neutral-600`     | `group-disabled:text-muted-foreground`                                            |

### ColorArea.tsx / ColorSlider.tsx / ColorWheel.tsx / ColorThumb.tsx / ColorSwatch.tsx / ColorSwatchPicker.tsx / ColorPicker.tsx / ColorField.tsx

| From                                                                | To                                                              |
| ------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-neutral-300 dark:bg-neutral-800` (disabled track)               | `bg-muted`                                                      |
| `border-white` (thumb border)                                       | `border-background`                                             |
| `bg-neutral-700 dark:bg-neutral-300` (thumb fill)                   | `bg-foreground` (intentionally inverts to match thumb contrast) |
| `border-black/10` (swatch outline)                                  | `border-foreground/10`                                          |
| `border-black dark:border-white` (selected swatch ring outer)       | `border-foreground`                                             |
| `outline-white dark:outline-black` (selected swatch ring inner)     | `outline-background`                                            |
| `text-neutral-800 dark:text-neutral-200` (ColorPicker trigger text) | `text-foreground`                                               |
| `text-neutral-500 dark:text-neutral-400` (slider output)            | `text-muted-foreground`                                         |

### ComboBox.tsx

| From                                       | To                      |
| ------------------------------------------ | ----------------------- |
| `text-neutral-600 dark:text-neutral-300`   | `text-muted-foreground` |

### CommandPalette.tsx

Inherits Popover + ListBox tokens; no novel mappings.

### DateField.tsx / DatePicker.tsx / DateRangePicker.tsx / TimeField.tsx

| From                                                       | To                                       |
| ---------------------------------------------------------- | ---------------------------------------- |
| `text-neutral-800 dark:text-neutral-200`                   | `text-foreground`                        |
| `text-neutral-600 dark:text-neutral-400` (placeholder)     | `text-muted-foreground`                  |
| `text-neutral-200 dark:text-neutral-600` (disabled)        | `text-muted-foreground` (opacity-dimmed) |
| `bg-blue-600 text-white` (segment focus)                   | `bg-primary text-primary-foreground`     |
| `text-neutral-200 dark:text-neutral-600` (group-disabled)  | `text-muted-foreground`                  |

### Dialog.tsx

Inherits Modal tokens.

### Disclosure.tsx / DisclosureGroup.tsx

| From                                       | To                      |
| ------------------------------------------ | ----------------------- |
| `text-neutral-900 dark:text-neutral-200`   | `text-foreground`       |
| `text-neutral-500 dark:text-neutral-400`   | `text-muted-foreground` |
| `text-neutral-300 dark:text-neutral-600`   | `text-muted-foreground` |

### DropZone.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `border-neutral-300 dark:border-neutral-800`                                  | `border-input`                                                  |
| `bg-white dark:bg-neutral-900`                                                | `bg-background`                                                 |
| `outline-blue-600 dark:outline-blue-500` (focused / drop-target)              | `outline-ring`                                                  |
| `bg-blue-200 dark:bg-blue-800` (drop target active)                           | `bg-accent`                                                     |

### Field.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `text-neutral-600 dark:text-neutral-300` (label)                              | `text-foreground` (label is primary text in shadcn) — verify    |
| `text-sm text-neutral-600` (description)                                      | `text-muted-foreground`                                         |
| `text-red-600 forced-colors:text-[Mark]` (error)                              | `text-destructive forced-colors:text-[Mark]`                    |
| `border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 …`       | `border-input hover:border-[color-mix(...input...,8%)]`         |
| `border-neutral-600 dark:border-neutral-300` (focused)                        | `border-ring`                                                   |
| `border-red-600`                                                              | `border-destructive`                                            |
| `border-neutral-200 dark:border-neutral-700` (disabled)                       | `border-input opacity-50`                                       |
| `bg-white dark:bg-neutral-900` (field surface)                                | `bg-background`                                                 |
| `placeholder:text-neutral-600 dark:placeholder:text-neutral-400`              | `placeholder:text-muted-foreground`                             |
| `disabled:text-neutral-200 dark:disabled:text-neutral-600`                    | `disabled:text-muted-foreground`                                |

### FieldButton.tsx

| From                                                                  | To                                            |
| --------------------------------------------------------------------- | --------------------------------------------- |
| `bg-transparent text-neutral-600 dark:text-neutral-400`               | `bg-transparent text-muted-foreground`        |
| `hover:bg-black/[5%] dark:hover:bg-white/10`                          | `hover:bg-foreground/5`                       |
| `pressed:bg-black/10 dark:pressed:bg-white/20`                        | `pressed:bg-foreground/10`                    |
| `border-black/5 bg-neutral-100 text-neutral-300 …` (disabled)         | `bg-muted text-muted-foreground`              |

### Form.tsx

Layout-only. No mapping.

### GridList.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-white dark:bg-neutral-900` (container)                                    | `bg-background`                                                 |
| `border-neutral-300 dark:border-neutral-700`                                  | `border-border`                                                 |
| `text-neutral-900 dark:text-neutral-200` (row)                                | `text-foreground`                                               |
| `hover:bg-neutral-100 dark:hover:bg-neutral-700/60`                           | `hover:bg-muted`                                                |
| `pressed:bg-neutral-100 dark:pressed:bg-neutral-700/60`                       | `pressed:bg-[color-mix(...muted...,8%)]`                        |
| selected `bg-blue-100 dark:bg-blue-700/30 hover:bg-blue-200 …`                | `bg-accent hover:bg-[color-mix(...accent...,8%)] pressed:bg-[color-mix(...accent...,16%)]` |
| disabled `text-neutral-300 dark:text-neutral-600`                             | `text-muted-foreground`                                         |
| section header `bg-neutral-100/60 dark:bg-neutral-700/60 border-y-neutral-200 dark:border-y-neutral-700 text-neutral-500 dark:text-neutral-300` | `bg-muted/60 border-y-border text-muted-foreground` |

### Link.tsx

| Variant     | From                                                              | To                                              |
| ----------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| `primary`   | `text-blue-600 underline decoration-blue-600/60 …`                | `text-primary underline decoration-primary/60 hover:decoration-primary` |
| `secondary` | `text-neutral-700 underline decoration-neutral-700/50 …`          | `text-foreground underline decoration-foreground/50 hover:decoration-foreground` |

### ListBox.tsx

| From                                                                | To                                              |
| ------------------------------------------------------------------- | ----------------------------------------------- |
| `bg-white dark:bg-neutral-900` (container)                          | `bg-popover`                                    |
| `border-neutral-300 dark:border-neutral-700`                        | `border-border`                                 |
| `text-neutral-700 dark:text-neutral-300` (option default)           | `text-popover-foreground`                       |
| `hover:bg-neutral-100 dark:hover:bg-neutral-800`                    | `hover:bg-accent hover:text-accent-foreground`  |
| selected `bg-blue-600 text-white`                                   | `bg-primary text-primary-foreground`            |
| disabled `text-neutral-300 dark:text-neutral-600`                   | `text-muted-foreground`                         |
| dropdown item label disabled                                         | `text-muted-foreground`                         |
| `bg-neutral-100 dark:bg-neutral-800` (focus highlight)              | `bg-accent`                                     |
| `bg-white/20` (selection divider line)                              | `bg-primary-foreground/20`                      |
| header `bg-neutral-100/60 dark:bg-neutral-700/60 border-y-neutral-200 dark:border-y-neutral-700 text-neutral-500 dark:text-neutral-300` | `bg-muted/60 border-y-border text-muted-foreground` |

### Menu.tsx

| From                                                                | To                                              |
| ------------------------------------------------------------------- | ----------------------------------------------- |
| separator `border-neutral-300 dark:border-neutral-700`              | `border-border`                                 |
| section header (as ListBox above)                                   | `bg-muted/60 border-y-border text-muted-foreground` |

### Meter.tsx

| From                                                            | To                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| `text-red-600 dark:text-red-500` (≥80% value)                  | `text-destructive`                                       |
| `text-neutral-600 dark:text-neutral-400` (label)               | `text-muted-foreground`                                  |
| `bg-neutral-300 dark:bg-neutral-700` (track)                   | `bg-muted`                                               |
| `bg-green-600` (low)                                            | `bg-chart-1`                                             |
| `bg-orange-500` (mid)                                           | `bg-chart-3`                                             |
| `bg-red-600` (high)                                             | `bg-destructive`                                         |

### Modal.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-black/[50%]` (overlay)                                                    | `bg-foreground/50` (mode-flips automatically)                   |
| `bg-white dark:bg-neutral-800/70`                                             | `bg-popover dark:bg-popover/70` (keep the dark blur effect)     |
| `border-black/10 dark:border-white/10`                                        | `border-foreground/10`                                          |
| `text-neutral-700 dark:text-neutral-300`                                      | `text-popover-foreground`                                       |

### NumberField.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| step button `bg-transparent text-neutral-500 dark:text-neutral-400`           | `bg-transparent text-muted-foreground`                          |
| `pressed:bg-neutral-100 dark:pressed:bg-neutral-800`                          | `pressed:bg-muted`                                              |
| `group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600`        | `group-disabled:text-muted-foreground`                          |

### Popover.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `border-black/10 dark:border-white/10`                                        | `border-foreground/10`                                          |
| `bg-white dark:bg-neutral-900/70`                                             | `bg-popover dark:bg-popover/70`                                 |
| `text-neutral-700 dark:text-neutral-300`                                      | `text-popover-foreground`                                       |
| arrow `fill-white dark:fill-[#1f1f21] stroke-black/10 dark:stroke-neutral-700` | `fill-popover stroke-border` (drop hardcoded dark hex)        |

### ProgressBar.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `text-neutral-600 dark:text-neutral-400`                                      | `text-muted-foreground`                                         |
| `bg-neutral-300 dark:bg-neutral-700` (track)                                  | `bg-muted`                                                      |
| `bg-blue-500` (fill)                                                          | `bg-primary`                                                    |

### Provider.tsx

If Provider sets an `IconContext` only, no changes. If we later need it to
inject the theme, that's future work — out of scope.

### RadioGroup.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-white dark:bg-neutral-900` (radio bg)                                     | `bg-background`                                                 |
| `border-neutral-400 dark:border-neutral-400` (default)                        | `border-input`                                                  |
| `border-neutral-700 dark:border-neutral-300` (selected)                       | `border-primary`                                                |
| `border-red-700 dark:border-red-600` (invalid)                                | `border-destructive`                                            |
| disabled border `border-neutral-200 dark:border-neutral-700`                  | `border-input opacity-50`                                       |
| label `text-neutral-800 dark:text-neutral-200 disabled:text-neutral-300 …`    | `text-foreground disabled:text-muted-foreground`                |
| pressed darkening `group-pressed:border-neutral-500 …`                        | `group-pressed:border-[color-mix(...input...,8%)]`              |

### SearchField.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `text-neutral-500 dark:text-neutral-400` (icon)                               | `text-muted-foreground`                                         |
| `group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600`        | `group-disabled:text-muted-foreground`                          |

### Select.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `border-black/10 dark:border-white/10`                                        | `border-input`                                                  |
| `bg-neutral-50 dark:bg-neutral-700`                                           | `bg-secondary`                                                  |
| `text-neutral-800 dark:text-neutral-300`                                      | `text-secondary-foreground`                                     |
| `hover:bg-neutral-100 dark:hover:bg-neutral-600`                              | `hover:bg-[color-mix(...secondary...,8%)]`                      |
| `pressed:bg-neutral-200 dark:pressed:bg-neutral-500`                          | `pressed:bg-[color-mix(...secondary...,16%)]`                   |
| `group-invalid:outline-red-600`                                               | `group-invalid:outline-destructive`                             |
| disabled `bg-neutral-100 text-neutral-200 dark:bg-neutral-800 …`              | `bg-muted text-muted-foreground`                                |
| `text-neutral-600 dark:text-neutral-400` (caret icon)                         | `text-muted-foreground`                                         |

### Separator.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-neutral-300 dark:bg-neutral-600`                                          | `bg-border`                                                     |

### Slider.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| track `bg-neutral-300 dark:bg-neutral-700`                                    | `bg-muted`                                                      |
| disabled track `bg-neutral-200 dark:bg-neutral-800`                           | `bg-muted opacity-50`                                           |
| fill `bg-blue-500`                                                            | `bg-primary`                                                    |
| disabled fill `bg-neutral-300 dark:bg-neutral-600`                            | `bg-muted-foreground/40`                                        |
| thumb `border-neutral-700 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-900` | `border-primary bg-background`                            |
| thumb pressed `bg-neutral-700 dark:bg-neutral-300`                            | `bg-primary`                                                    |
| disabled thumb border `border-neutral-300 dark:border-neutral-700`            | `border-input`                                                  |
| output `text-neutral-500 dark:text-neutral-400`                               | `text-muted-foreground`                                         |

### Switch.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| track unselected `bg-neutral-100 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-400` | `bg-muted border-input`                          |
| track selected `bg-neutral-700 dark:bg-neutral-300`                           | `bg-primary`                                                    |
| pressed unselected darkening                                                  | `group-pressed:bg-[color-mix(...muted...,8%)]`                  |
| pressed selected darkening                                                    | `group-pressed:bg-[color-mix(...primary...,8%)]`                |
| disabled `bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-900` | `bg-muted border-input opacity-50`                   |
| thumb `bg-neutral-900 dark:bg-neutral-300` (off)                              | `bg-foreground`                                                 |
| thumb selected `bg-white dark:bg-neutral-900`                                 | `bg-primary-foreground`                                         |
| label `text-neutral-800 dark:text-neutral-200`                                | `text-foreground`                                               |

### Table.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `bg-white dark:bg-neutral-900`                                                | `bg-background`                                                 |
| `border-neutral-300 dark:border-neutral-700`                                  | `border-border`                                                 |
| column resizer `bg-neutral-400 dark:bg-neutral-500`                           | `bg-border`                                                     |
| resizing `resizing:bg-blue-600`                                               | `resizing:bg-primary`                                           |
| column header `text-neutral-700 dark:text-neutral-300`                        | `text-muted-foreground` (shadcn convention for table headers)   |
| sort icon `text-neutral-500 dark:text-neutral-400`                            | `text-muted-foreground`                                         |
| header bg `bg-neutral-100/60 dark:bg-neutral-700/60 border-b-neutral-200 dark:border-b-neutral-700` | `bg-muted/60 border-b-border`             |
| row `text-neutral-900 dark:text-neutral-200`                                  | `text-foreground`                                               |
| row hover `hover:bg-neutral-100 dark:hover:bg-neutral-800`                    | `hover:bg-muted`                                                |
| row pressed `pressed:bg-neutral-100 dark:pressed:bg-neutral-800`              | `pressed:bg-[color-mix(...muted...,8%)]`                        |
| row selected `bg-blue-100 dark:bg-blue-700/30 hover:bg-blue-200 …`            | `bg-accent hover:bg-[color-mix(...accent...,8%)] pressed:bg-[color-mix(...accent...,16%)]` |
| row disabled `text-neutral-300 dark:text-neutral-600`                         | `text-muted-foreground`                                         |

### Tabs.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| disabled selected `selected:text-white dark:selected:text-neutral-500 selected:bg-neutral-200 dark:selected:bg-neutral-600 text-neutral-200 dark:text-neutral-600` | `selected:bg-muted selected:text-muted-foreground text-muted-foreground` |
| selection indicator `bg-white` (mix-blend-difference)                         | `bg-background` (keep `mix-blend-difference`)                   |
| selection indicator disabled `bg-neutral-400 dark:bg-neutral-600`             | `bg-muted-foreground/40`                                        |
| panel `text-neutral-900 dark:text-neutral-100`                                | `text-foreground`                                               |

### TagGroup.tsx

Variants renamed; mapping above. Plus:

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| selected tag `bg-blue-600 text-white`                                         | `bg-primary text-primary-foreground`                            |
| disabled tag `bg-neutral-100 text-neutral-300 dark:bg-transparent dark:text-neutral-600` | `bg-muted text-muted-foreground`                     |
| remove button `hover:bg-black/10 dark:hover:bg-white/10 pressed:bg-black/20 dark:pressed:bg-white/20` | `hover:bg-foreground/10 pressed:bg-foreground/20` |
| errorMessage `text-red-600`                                                   | `text-destructive`                                              |

### TextField.tsx

Inherits Field tokens.

### TimeField.tsx

Inherits DateField tokens.

### Toast.tsx / Toast.css

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `focus-visible:outline-blue-600`                                              | `focus-visible:outline-ring`                                    |
| toast surface `bg-blue-600`                                                   | `bg-primary`                                                    |
| toast text `text-white`                                                       | `text-primary-foreground`                                       |
| close button `bg-transparent hover:bg-white/10 pressed:bg-white/15 text-white outline-white` | `bg-transparent hover:bg-primary-foreground/10 pressed:bg-primary-foreground/15 text-primary-foreground outline-primary-foreground` |

Audit `Toast.css` for any palette literals and migrate them the same way.

### ToggleButton.tsx / ToggleButtonGroup.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `border-black/10 dark:border-white/10`                                        | `border-input`                                                  |
| unselected `bg-neutral-50 text-neutral-800 hover:bg-neutral-100 …`            | `bg-secondary text-secondary-foreground hover:bg-[color-mix(...secondary...,8%)]` |
| selected `bg-neutral-700 text-white dark:bg-neutral-300 dark:text-black …`    | `bg-primary text-primary-foreground hover:bg-[color-mix(...primary...,8%)]` |
| disabled `bg-neutral-100 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-600` | `bg-muted text-muted-foreground`                         |

### Toolbar.tsx

Layout-only.

### Tooltip.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `border-neutral-800 bg-neutral-700 text-white dark:border-white/10 dark:bg-neutral-600` | `border-foreground/10 bg-foreground text-background` |
| arrow `fill-neutral-700 stroke-neutral-800 dark:fill-neutral-600 dark:stroke-white/10` | `fill-foreground stroke-foreground/10`                |

### Tree.tsx

| From                                                                          | To                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| container `bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700` | `bg-background border-border`                             |
| row `text-neutral-900 dark:text-neutral-200`                                  | `text-foreground`                                               |
| row hover `hover:bg-neutral-100 dark:hover:bg-neutral-800`                    | `hover:bg-muted`                                                |
| row selected `bg-blue-100 dark:bg-blue-700/30 border-y-blue-200 dark:border-y-blue-900 hover:bg-blue-200 dark:hover:bg-blue-700/40` | `bg-accent border-y-[color-mix(...accent...,...)] hover:bg-[color-mix(...accent...,8%)] pressed:bg-[color-mix(...accent...,16%)]` |
| disabled `text-neutral-300 dark:text-neutral-600`                             | `text-muted-foreground`                                         |
| caret icon `text-neutral-500 dark:text-neutral-400`                           | `text-muted-foreground`                                         |

---

## Migration plan (one PR)

Sequence inside the single PR (lets the implementer commit-by-commit if
they want, but the PR ships atomically):

1. **Theme file.** Replace `src/index.css` with the full `:root` + `.dark` +
   `@theme inline` + `@variant dark` block described above. Verify
   Storybook builds and renders an *unstyled-looking* but functional
   library (every component will look broken until step 3, that's expected).
2. **`focusRing` utility + `interactive` helper.** Update `src/utils.ts`:
   `focusRing` references `outline-ring`. Optionally export `interactive(token)`
   helper for state composition.
3. **Component sweep.** Apply the per-component mapping table above. Order
   recommended:
   a. Primitives & utilities: `Button`, `Link`, `Separator`, `focusRing`
      callers.
   b. Form controls: `Field`, `TextField`, `SearchField`, `NumberField`,
      `Checkbox`, `RadioGroup`, `Switch`, `Select`, `ComboBox`,
      `DateField`/`DatePicker`/`DateRangePicker`/`TimeField`.
   c. Display: `Table`, `Tree`, `GridList`, `ListBox`, `Menu`, `Tabs`,
      `Breadcrumbs`, `Disclosure`/`DisclosureGroup`, `TagGroup`,
      `ToggleButton`/`ToggleButtonGroup`.
   d. Overlays: `Modal`, `Dialog`, `AlertDialog`, `Popover`, `Tooltip`,
      `Toast`, `CommandPalette`, `DropZone`.
   e. Color family: `ColorArea`, `ColorSlider`, `ColorWheel`, `ColorThumb`,
      `ColorSwatch`, `ColorSwatchPicker`, `ColorPicker`, `ColorField`.
   f. Status: `Meter`, `ProgressBar`, `Calendar`, `RangeCalendar`.
4. **Storybook dark mode.** Confirm `@vueless/storybook-dark-mode` toggles
   the `.dark` class on the preview root. If it toggles a different
   attribute / class, add a small `.storybook/preview.{ts,tsx}` decorator
   that mirrors the addon's state onto `<html class="dark">`.
5. **New `Theming` story.** Under `stories/`, add a `Theming.stories.tsx`
   that:
   - Renders one of each: Button (all variants + disabled + pending),
     Field, Select, Calendar, Table (3 rows, one selected), Tooltip,
     Modal trigger, Meter at 30/60/90%, TagGroup with all variants.
   - Provides a knob (story arg or `decorators`) to switch the `.dark` class.
   - Provides three pre-baked themes (default-shadcn, "blue accent",
     "violet accent") as separate story variants, defined inline as
     `<style>:root { --primary: …; --ring: …; }</style>` decorators.
6. **TagGroup variant rename.** Rename `gray|red|green|yellow|blue` →
   `neutral|danger|chart1|chart3|chart5`. Update its story. Document the
   breaking change in the PR body.
7. **`package.json` exports.** Add `"./styles.css"` to the `exports` map
   pointing at whatever the Vite build emits the CSS as (`dist/index.css`
   or similar). Verify with a local `pnpm pack` + import smoke if feasible.

## Acceptance criteria

- [ ] `grep -rE "(bg|text|border|outline|ring|fill|stroke|from|to|via|divide|placeholder|caret|decoration)-(neutral|blue|red|green|yellow|orange|amber|gray|slate)-[0-9]+" src/` returns zero results.
- [ ] `grep -rE "dark:(bg|text|border|outline)-" src/` returns only entries where the `dark:` modifier wraps a token reference whose *behavior* (not value) needs to differ per mode — should be effectively empty after the migration. Any remaining `dark:` references are justified in code review.
- [ ] `pnpm storybook` builds; every story renders in both light and dark with no console errors.
- [ ] The new `Theming` story renders cleanly across its three pre-baked theme variants — proves the token override surface works.
- [ ] `import "@vrmn/komorebi/styles.css"` from a sibling consumer (or `pnpm pack` smoke) resolves and loads tokens.
- [ ] `forced-colors:` system color references unchanged across the diff.

## Open questions / explicit deferrals

- **`--ring-offset-color` / `--ring-offset-width`.** Spec uses literal
  `outline-offset-2`. If a consumer wants a themed offset, add tokens in a
  follow-up.
- **`--success` / `--warning` semantic aliases.** Punted; revisit once
  someone files a real need beyond Meter (whose chart-token mapping covers it).
- **Sidebar component.** Sidebar tokens shipped as stubs but no component
  uses them. Whenever Sidebar lands, the spec for it should validate that
  the stub tokens still feel right and adjust the defaults if needed.
- **Provider injecting theme.** `Provider.tsx` currently sets icon defaults
  only. Could later inject `<style>` for the default theme so consumers
  don't have to import the CSS file — explicit future work.
- **Toast variants (success / error).** Out of scope. Multi-variant Toast
  will need either chart-* mappings or a small status-token addition.
- **Visual snapshot tooling.** Manual eyeball only this round. If theming
  becomes load-bearing for downstream apps, add Chromatic / `storybook-
  test-runner` in a follow-up.
