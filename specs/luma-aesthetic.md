# Luma Aesthetic Migration

Restyle every Komorebi component to adopt the *Luma* aesthetic (ultra-soft
pill radii, opaque shadow+ring elevation, opacity-fade hover, inset focus
rings, tactile press feedback). Add `Card` and `Badge` primitives that
Komorebi currently lacks. Refresh tokens, motion idioms, Storybook canvas.

The look is anchored on a `bg-muted` canvas with floating `bg-card` /
`bg-popover` surfaces — the library makes that assumption explicit.

---

## Reference

The reference implementation lives at `tmp/luma/` (shadcn + radix-ui +
phosphor, neutral grayscale, Inter sans, `rounded-4xl`/`rounded-3xl` pill
radii). Treat its `components/ui/*.tsx`, `app/globals.css`, and
`components/demo.tsx` as the visual ground truth when in doubt.

> `tmp/luma/` is reference-only. It will be removed in the same PR as the
> migration lands. Do NOT import from it.

---

## Supersedes

Sections of `specs/design-tokens.md` no longer apply where they conflict
with this spec. Specifically superseded:

| design-tokens.md section                       | New behavior                                              |
| ---------------------------------------------- | --------------------------------------------------------- |
| "Radius" (Tailwind `sm/md/lg/xl` from –6/–4/–2/+4) | Multiplier scale `sm 0.6× / md 0.8× / lg 1× / xl 1.4× / 2xl 1.8× / 3xl 2.2× / 4xl 2.6×` (Luma's) |
| "State composition" `color-mix` hover/pressed  | Opacity-fade: `hover:bg-{token}/80 pressed:bg-{token}/70` |
| "Focus ring utility" (`outline outline-offset-2 outline-ring`) | Inset ring + colored border: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30` |
| Per-component "From → To" rows: hover/pressed via color-mix | Opacity-fade per the new state recipes below              |
| Invalid styling (`border-destructive` only)    | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20` |
| Modal/Popover translucent dark fill (`bg-popover/70 backdrop-blur-sm`) | Opaque `bg-popover` + `shadow-{xl|md} ring-1 ring-foreground/5` (and `dark:ring-foreground/10`) |
| Chart token defaults (colorful greens/oranges/violets/reds) | Monochrome grayscale ramp                                  |
| TagGroup variant rename (`neutral/danger/chart1/chart3/chart5`) | Luma badge variants: `default/secondary/outline/destructive/ghost` |
| Disabled style per variant (`bg-muted text-muted-foreground`)  | Universal `disabled:pointer-events-none disabled:opacity-50` |

What remains valid from `design-tokens.md`:

- The semantic token list (`--background`, `--foreground`, `--primary`,
  `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`,
  `--input`, `--ring`, `--popover`, `--card`, sidebar stubs).
- shadcn-unprefixed naming, `.dark` mode via class selector.
- The CSS export shape (`@vrmn/komorebi/styles.css`).
- The `forced-colors:` system color references.
- Tooltip's inverted-surface decision (`bg-foreground text-background`).

---

## Goals

1. Every Komorebi component carries Luma's visual signature: ultra-soft
   pill radii, opaque shadow+ring elevation, opacity-fade hover, inset
   focus rings, `pressed:translate-y-px` tactile feedback.
2. `Card` and `Badge` are first-class exports with the same aesthetic.
3. Tokens add `--font-sans` / `--font-heading` slots; `--chart-1..5` shift
   to monochrome defaults.
4. Storybook canvas defaults to `bg-muted` so every existing story renders
   on the intended backdrop without per-story edits.
5. A new `Aesthetic.stories.tsx` showcase renders the whole library on
   one page (modeled after Luma's `demo.tsx`) as the validation surface.
6. Component code stays `tailwind-variants`-based (no migration to `cva`).
   React Aria's `data-pressed` / `data-focused` / etc. remain the canonical
   state hooks; we *add* `data-slot` + `group/<name>` on top.

## Non-goals

- **Not a typeface ship.** `--font-sans` defaults to `inherit`; consumers
  bring Inter (or whatever). The library has no opinion on which sans.
- **Not migrating off `tailwind-variants`.** Luma uses `cva`; we keep
  `tv()` because of its tight `composeRenderProps` integration with RAC.
- **No `Item` primitive.** Settings-row composition can be done with
  `Card size="sm"` + flex (demoed in the Aesthetic showcase). Item lands
  when a real consumer needs it.
- **No size prop on form controls.** Only `Button` gains `xs / sm / default / lg`
  + icon variants. Inputs, Selects, DateField, etc. stay at `h-9`.
- **No success / warning semantic tokens.** Destructive remains the only
  non-neutral semantic. Status differentiation in `Meter` is purely
  positional (low/mid/high → muted-foreground-derived ramp), with
  `destructive` only at high.
- **No visual snapshot tooling.** Storybook smoke + manual eyeball is
  the gate. Chromatic / test-runner is follow-up work.
- **No motion library beyond `tailwindcss-animate`.** Modal/Popover/Tooltip
  use Radix-style `data-open` / `data-closed` + `tw-animate-css` classes
  via the existing plugin.
- **`tmp/luma/` does not ship.** It exists as a reference and is deleted
  in this PR.

---

## Decisions (recorded from interview)

These shaped the spec; kept here for the "why".

1. **Radius scale: Luma's multipliers verbatim.** `--radius: 0.625rem`,
   `--radius-sm: calc(var(--radius) * 0.6)` through `--radius-4xl:
   calc(var(--radius) * 2.6)`. Buttons `rounded-4xl`, inputs `rounded-3xl`,
   cards `rounded-4xl`, popovers `rounded-3xl`, modals `rounded-4xl`,
   calendar cells use `[--cell-radius:var(--radius-4xl)]` (which on a
   `size-8` cell means selected days render as perfect discs).

2. **Inset focus ring.** Komorebi's `focusRing` util in `src/utils.ts` is
   rewritten to emit `focus-visible:border-ring focus-visible:ring-3
   focus-visible:ring-ring/30` (plus `forced-colors:outline-[Highlight]`).
   The outline-offset approach is dropped. Layout-stable; matches Luma.

3. **`bg-muted` canvas assumption.** Inputs use `bg-input/50` (a
   half-opaque border-grey fill that reads as soft on `bg-muted`).
   Library docs say "render Komorebi compositions inside a `bg-muted`
   container, or set `body { background: var(--muted) }`". Storybook
   global canvas switches to `bg-muted` (light) / `bg-muted` dark, both
   resolved via `var(--muted)` so the theme drives it.

4. **Button variants: Luma's six.** `default` (filled `--primary`),
   `secondary` (`--secondary`), `outline` (border-input bg-bg), `ghost`
   (transparent, hover:bg-muted), `destructive` (soft: `bg-destructive/10
   text-destructive`), `link` (text-primary, underline on hover). The
   current `quiet` is renamed `ghost`; current `primary` becomes
   `default`. Pre-1.0 breaking rename.

5. **Press feedback via `pressed:translate-y-px`.** React Aria's
   `pressed:` modifier fires for pointer + keyboard. The `not-aria-[haspopup]`
   exclusion from Luma is unnecessary because RAC doesn't toggle
   `data-pressed` for popup-opening triggers in the same way CSS `:active`
   does. Combined with `pressed:bg-{token}/70` darkening.

6. **Invalid: border + ring combo.** Every form control:
   `aria-invalid:border-destructive aria-invalid:ring-3
   aria-invalid:ring-destructive/20` (and `dark:ring-destructive/40`).
   Stronger error visibility, layout-stable. Applied to Inputs, Textarea,
   Select, ComboBox, DateField/DatePicker/DateRangePicker/TimeField,
   NumberField, Checkbox, RadioGroup, Switch.

7. **Hover model: opacity-fade.** `hover:bg-{token}/80
   pressed:bg-{token}/70`. The result depends on the backdrop, which is
   acceptable because we've committed to `bg-muted` canvas. No more
   `color-mix(...)` constructions in component classes.

8. **Chart palette: monochrome, kept on the public surface.**
   `--chart-1..5` retained for forward-compat (future chart consumer,
   `echarts` peer dep) but default values are 5-step gray ramp. Meter
   bands derive from `--muted-foreground` / `--foreground` via opacity
   rather than chart tokens, so the Meter no longer references chart-*
   directly.

9. **Card: full Luma parity.** New component with `Card`, `CardHeader`,
   `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`,
   `CardAction` subparts; `size` prop (`default | sm`). `data-slot` on
   each, `group/card` and `group/card-header` for nested targeting.
   `rounded-4xl bg-card shadow-md ring-1 ring-foreground/5`.

10. **Badge: new primitive distinct from TagGroup.** Static chip
    (`<Badge>`) with Luma's 5 variants. TagGroup remains the interactive
    multi-select chip collection but its variant names are renamed to
    match Badge's.

11. **Button sizes only.** `xs / sm / default / lg` + `icon-xs / icon-sm /
    icon / icon-lg`. Inputs and Selects do not gain a size prop in this PR.

12. **`data-slot` + `group/<name>` everywhere.** Every primitive emits
    `data-slot="<component-name>"` and a `group/<name>` class on the root.
    Variants/sizes expose `data-variant` / `data-size`. Enables consumers
    to theme via CSS selectors like
    `[data-slot=button][data-variant=destructive] { ... }` and lets nested
    components target their parent state via Tailwind's `group-data-`
    + container query naming.

13. **Font tokens.** `--font-sans` (defaults to `inherit`), `--font-heading`
    (defaults to `var(--font-sans)`), `--font-mono`, `--font-serif`. Exposed
    via `@theme inline` so `font-sans` / `font-heading` Tailwind utilities
    work. Title-bearing components apply `font-heading` so consumers can
    swap to a display face without re-doing body text.

14. **Surfaces: opaque + shadow + ring.** Modal `bg-popover shadow-xl
    ring-1 ring-foreground/5`. Popover/DropdownMenu/Tooltip arrow surfaces
    use `bg-popover shadow-md ring-1 ring-foreground/5`. No translucent
    `popover/70` + backdrop-blur on the surface itself. The modal **overlay**
    gets `bg-foreground/30 supports-backdrop-filter:backdrop-blur-sm` so
    the page behind blurs but the surface stays crisp.

15. **Disabled: universal `opacity-50` + `pointer-events-none`.** Drops
    per-variant disabled fills. Disabled controls keep their variant
    color, just dimmed. Applied to every interactive primitive.

16. **Pending: keep `isPending`, swap spinner to Phosphor.** Button's
    `isPending` API is preserved; the inline SVG circle becomes
    `<SpinnerIcon className="animate-spin" />`. Label is hidden via
    `text-transparent`; RAC auto-disables.

17. **Motion idioms.** Buttons `transition-all`. Form controls
    `transition-[color,box-shadow,background-color]` (avoids transitioning
    geometry). Overlays use `tailwindcss-animate`:
    `duration-100 data-open:animate-in data-open:fade-in-0
    data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0
    data-closed:zoom-out-95`.

18. **Calendar: pill cells.** `[--cell-radius:var(--radius-4xl)]
    [--cell-size:--spacing(8)]` → selected days render as fully round
    discs. Date range: `rounded-l-(--cell-radius)` cap, square middle
    via `bg-accent`, `rounded-r-(--cell-radius)` cap. Today indicator =
    outlined ring, no fill.

19. **Switch + Slider dims: Luma exact.** Switch `h-5 w-9 rounded-full`
    track, `size-4` thumb, `translate-x-4` when on. Slider `h-1.5
    rounded-full bg-muted` track, `bg-primary` range fill, `size-4
    border-2 border-input bg-background shadow-sm rounded-full` thumb.
    > **Superseded by [`specs/luma-touchups.md`](./luma-touchups.md) §4 (Switch) and §5 (Slider).**

20. **`bg-clip-padding` on all filled controls.** Buttons (filled
    variants), Switch track, filled Badge, Toast surface. Prevents bg
    bleed into the transparent border, keeps focus-state border-ring
    crisp.

21. **Storybook canvas + Aesthetic showcase.** `.storybook/preview.tsx`
    sets `parameters.backgrounds.default = 'muted'` and wires its values
    to `var(--muted)` / `var(--background)`. A new
    `stories/Aesthetic.stories.tsx` renders the whole library on a single
    page (the Komorebi equivalent of `tmp/luma/components/demo.tsx`).

22. **Atomic single PR.** Tokens + 35-component sweep + new Card + new
    Badge + Aesthetic story + Storybook canvas + `tmp/luma` removal all
    in one PR. Commits inside can be sequenced by phase for readability.

---

## Tokens

### Theme file (`src/index.css`)

```css
@import "tailwindcss";
@plugin "tailwindcss-react-aria-components";
@plugin "tailwindcss-animate";

@variant dark (&:where(.dark, .dark *));

:root {
  /* Surfaces */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Roles */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  /* Structural */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --ring-offset: var(--background);
  --radius: 0.625rem;

  /* Data viz (monochrome ramp, kept for forward-compat) */
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);

  /* Sidebar (forward-compat stubs) */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: var(--foreground);
  --sidebar-primary: var(--primary);
  --sidebar-primary-foreground: var(--primary-foreground);
  --sidebar-accent: var(--accent);
  --sidebar-accent-foreground: var(--accent-foreground);
  --sidebar-border: var(--border);
  --sidebar-ring: var(--ring);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);

  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);

  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);

  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);

  --sidebar: oklch(0.205 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
  /* others inherit via var() chain from :root remappings */
}

@theme inline {
  /* Font slots — defaults to inherit so consumers control typeface */
  --font-sans: var(--font-sans, inherit);
  --font-heading: var(--font-heading, var(--font-sans));
  --font-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  --font-serif: var(--font-serif, ui-serif, Georgia, serif);

  /* Color → Tailwind utility bridge */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Radius — Luma multiplier scale */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

body {
  background: var(--background);
  color: var(--foreground);
  color-scheme: dark light;
}
```

### Token surface (delta vs `design-tokens.md`)

Added:

- `--font-sans`, `--font-heading`, `--font-mono`, `--font-serif`
- `--radius-2xl`, `--radius-3xl`, `--radius-4xl` (multipliers, not +N px)

Recoloured:

- `--chart-1..5`: monochrome grayscale ramp (was: greens / oranges / violets / reds)

Unchanged from `design-tokens.md`: every other token name and role.

---

## Aesthetic primitives (new components)

### `src/Card.tsx`

Non-RAC, layout-only. `data-slot` on every subpart.

```tsx
import * as React from "react"
import { tv } from "tailwind-variants"
import { cn } from "./utils"

const card = tv({
  base: "group/card flex flex-col gap-6 overflow-hidden rounded-4xl bg-card py-6 text-sm text-card-foreground shadow-md ring-1 ring-foreground/5 has-[>img:first-child]:pt-0 dark:ring-foreground/10 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
  variants: {
    size: {
      default: "",
      sm: "gap-4 py-4",
    },
  },
  defaultVariants: { size: "default" },
})

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
}

export function Card({ className, size = "default", ...props }: CardProps) {
  return <div data-slot="card" data-size={size} className={cn(card({ size }), className)} {...props} />
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-4xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base font-medium", className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 group-data-[size=sm]/card:px-4", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}
```

### `src/Badge.tsx`

Non-RAC; renders `<span>`. Five variants, matches Luma's badge primitive.

```tsx
import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "./utils"

const badge = tv({
  base: "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl border border-transparent bg-clip-padding px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border-border text-foreground hover:bg-muted",
      destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
      ghost: "text-foreground hover:bg-muted dark:hover:bg-muted/50",
    },
  },
  defaultVariants: { variant: "default" },
})

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badge> {}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span data-slot="badge" data-variant={variant} className={cn(badge({ variant }), className)} {...props} />
}
```

---

## Foundational rewrites

### `src/utils.ts` — `focusRing` rewrite

```ts
// before
export const focusRing = tv({
  base: "outline outline-offset-2 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: { false: "outline-0", true: "outline-2" },
  },
})

// after
export const focusRing = tv({
  base: "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: { false: "", true: "" },
  },
})
```

`isFocusVisible` becomes a no-op variant in the API (RAC components still
pass it via `composeRenderProps`) — `focus-visible:` CSS does the work
directly. Keep the variant signature so callers don't have to change.

> **Caveat:** for components that need an *outer* ring (Toast close
> button on a primary background, where an inset ring is invisible), the
> spec allows `focus-visible:ring-3 focus-visible:ring-{contrast-color}/40`
> on its own without the `border-ring` part. Callers override base when
> needed.

### `cn` helper — unchanged. `composeRenderProps` — unchanged.

---

## Per-component aesthetic spec

Every component goes through the same 6 dimensions:

1. **Radius** — `rounded-{N}` per the new scale.
2. **Surface** — `bg-{token}` (and `/50` for translucent inputs).
3. **Border** — `border border-transparent` for filled, `border-input` for outlined; `bg-clip-padding` when filled with transparent border.
4. **Focus** — inset ring via `focusRing` util.
5. **State** — `hover:bg-{token}/80`, `pressed:bg-{token}/70 pressed:translate-y-px`, `disabled:opacity-50 disabled:pointer-events-none`, `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`.
6. **Slot attrs** — `data-slot="<kebab-name>"`, `data-variant`/`data-size` where applicable, `group/<name>` on root.

The tables below give the deltas; the design-tokens.md per-component
mapping remains the source for color-role mapping (e.g. "this used to be
`text-red-600`, it should now be `text-destructive`"). What this spec
overwrites is the *visual treatment* — radii, shadows, hover/pressed,
focus.

### `Button.tsx`

Complete rewrite. Six variants, eight sizes, opacity-fade hover,
`pressed:translate-y-px`, inset focus ring, `bg-clip-padding`, soft
destructive, Phosphor spinner. Acts as the prototype for the other
components' look.

```tsx
"use client"

import React from "react"
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { SpinnerIcon } from "@phosphor-icons/react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "./utils"

const button = tv({
  base: "group/button relative inline-flex shrink-0 cursor-default items-center justify-center gap-1.5 overflow-hidden rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 pressed:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80 pressed:bg-primary/70",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 pressed:bg-secondary/70",
      outline:
        "border-input bg-background hover:bg-muted hover:text-foreground pressed:bg-muted/80 dark:bg-input/30",
      ghost: "text-foreground hover:bg-muted pressed:bg-muted/80 dark:hover:bg-muted/50",
      destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 pressed:bg-destructive/30 dark:bg-destructive/20 dark:hover:bg-destructive/30",
      link: "text-primary underline-offset-4 hover:underline pressed:translate-y-0",
    },
    size: {
      default: "h-9 px-3",
      xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1 px-3",
      lg: "h-10 px-4",
      icon: "size-9",
      "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
    isPending: { true: "text-transparent" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

export interface ButtonProps
  extends RACButtonProps,
    Omit<VariantProps<typeof button>, "isPending"> {}

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      data-slot="button"
      data-variant={props.variant ?? "default"}
      data-size={props.size ?? "default"}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          className,
        })
      )}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span aria-hidden className="absolute inset-0 flex items-center justify-center text-current">
              <SpinnerIcon className="size-4 animate-spin" />
            </span>
          )}
        </>
      ))}
    </RACButton>
  )
}
```

API change summary (breaking pre-1.0):

- Variants: `primary | secondary | destructive | quiet` → `default | secondary | outline | ghost | destructive | link`. `primary` callers migrate to `default`; `quiet` callers migrate to `ghost`. `destructive` is now SOFT (text-destructive on tinted bg) — callers wanting filled red provide their own className.
- New: `size` prop. Existing icon-only auto-sizing (`[&:has(>svg:only-child)]`) is removed; consumers explicitly pass `size="icon"` / `size="icon-sm"` etc. This avoids surprise width changes on conditional content.
- `isPending` API unchanged but spinner is now `<SpinnerIcon />`.

### `Link.tsx`

| Variant     | Class                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `primary`   | `text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/30 rounded-md` |
| `secondary` | `text-foreground underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/30 rounded-md` |

`data-slot="link"`, `group/link`. Radius `rounded-md` (small inline element).

### `Separator.tsx`

`bg-border h-px w-full` (horizontal) / `w-px h-full` (vertical). `data-slot="separator"`.

### Inputs / form controls — common base

Apply this pattern to `TextField` (input), `SearchField`, `NumberField`,
`Select` trigger, `ComboBox` trigger, `DateField`/`DatePicker`/`DateRangePicker`/`TimeField`
segment containers:

```
h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-sm
transition-[color,box-shadow,background-color] outline-none
placeholder:text-muted-foreground
focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30
disabled:pointer-events-none disabled:opacity-50
aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20
dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40
```

Notable:

- `rounded-3xl` (was `rounded-lg` / `rounded-md`).
- `bg-input/50` (translucent; relies on `bg-muted` canvas).
- Border is `transparent` until invalid/focus — no resting visible border. The fill alone communicates "input".
- Trailing/leading icons sit at `text-muted-foreground` size-4.

`data-slot="input"` (or "field-input", "search-field", etc.).

### `Field.tsx`

| Element      | Class                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Field root   | `group/field flex flex-col gap-1.5` (`data-slot="field"`)                      |
| Label        | `text-sm font-medium text-foreground` (`data-slot="field-label"`)              |
| Description  | `text-sm text-muted-foreground` (`data-slot="field-description"`)              |
| Error        | `text-sm text-destructive forced-colors:text-[Mark]` (`data-slot="field-error"`) |

Field-level wrapper passes invalid state down via aria-invalid; child input picks it up via the common base above.

### `Checkbox.tsx`

| Element              | Class                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Box (unchecked)      | `size-4 rounded-md border border-input bg-background transition-[color,box-shadow,background-color]`                       |
| Box (checked)        | `bg-primary border-transparent`                                                                                          |
| Box focus            | `focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:border-ring`                                              |
| Check icon           | `<CheckIcon className="size-3 text-primary-foreground" />`                                                               |
| Invalid              | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`                                   |
| Disabled             | `disabled:opacity-50 disabled:pointer-events-none`                                                                       |
| Label                | `text-sm text-foreground`                                                                                                |

`data-slot="checkbox"`.

### `RadioGroup.tsx`

Same pattern as Checkbox but `rounded-full` box and a centered `<span className="size-2 rounded-full bg-primary-foreground" />` dot when selected.

### `Switch.tsx`

Luma's exact dims:

| Element        | Class                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Track          | `peer h-5 w-9 shrink-0 cursor-default rounded-full border border-transparent bg-clip-padding bg-input transition-colors`           |
| Track selected | `bg-primary`                                                                                                                       |
| Track invalid  | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`                                             |
| Thumb          | `pointer-events-none block size-4 rounded-full bg-foreground shadow-sm transition-transform translate-x-0`                         |
| Thumb selected | `bg-primary-foreground translate-x-4`                                                                                              |
| Disabled       | `disabled:opacity-50 disabled:pointer-events-none`                                                                                 |

`data-slot="switch"`. `group/switch` so consumers can target nested state.

### `Slider.tsx`

| Element        | Class                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------- |
| Root           | `group/slider relative flex w-full touch-none select-none items-center` (`data-slot="slider"`) |
| Track          | `h-1.5 w-full grow overflow-hidden rounded-full bg-muted`                                   |
| Range fill     | `absolute h-full bg-primary`                                                                |
| Thumb          | `size-4 rounded-full border-2 border-input bg-background shadow-sm transition-[color,box-shadow] focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:border-ring disabled:opacity-50` |
| Output / label | `text-xs text-muted-foreground`                                                             |

### `Tabs.tsx`

Default variant — segmented pill list:

| Element     | Class                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| List        | `inline-flex h-9 items-center justify-center rounded-3xl bg-muted p-1 text-muted-foreground` (`data-slot="tabs-list"`)                  |
| Tab         | `inline-flex h-7 items-center justify-center gap-1.5 rounded-2xl px-3 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-3 focus-visible:ring-ring/30` |
| Tab selected | `bg-background text-foreground shadow-sm`                                                                                              |
| Panel       | `mt-2 text-foreground`                                                                                                                  |

> Tabs deliberately uses `rounded-2xl` on the selected pill within the
> `rounded-3xl` list — visually nested. Don't make them the same radius.

`data-slot="tabs"` / `tabs-list` / `tabs-tab` / `tabs-panel`.

### `Tooltip.tsx`

Inverted surface (kept from design-tokens.md):

```
bg-foreground text-background rounded-md px-2.5 py-1 text-xs
shadow-md ring-1 ring-foreground/10
data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95
data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100
```

Tooltip arrow: `fill-foreground` (no stroke needed since the surface is the foreground color).

`data-slot="tooltip"`.

### Overlays — `Modal.tsx`, `Dialog.tsx`, `AlertDialog.tsx`, `Popover.tsx`, `CommandPalette.tsx`

Modal/Dialog/AlertDialog content:

```
rounded-4xl bg-popover p-6 text-popover-foreground shadow-xl ring-1 ring-foreground/5 dark:ring-foreground/10
data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95
data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100
```

Modal overlay (the dim behind):

```
fixed inset-0 z-50 bg-foreground/30 supports-backdrop-filter:backdrop-blur-sm
data-open:animate-in data-open:fade-in-0
data-closed:animate-out data-closed:fade-out-0 duration-100
```

> Use `bg-foreground/30` (not `bg-black/30`) so the overlay tints toward
> *light* in dark mode (lighter veil behind the dialog), matching the
> aesthetic instead of always-black.

Popover / DropdownMenu / ListBox containers:

```
rounded-3xl bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10
data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95
data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100
```

Popover arrow: `fill-popover stroke-foreground/5` (matches container ring).

Menu / ListBox option:

```
relative flex cursor-default items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm outline-none
hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground
disabled:opacity-50 disabled:pointer-events-none
[&_svg:not([class*='size-'])]:size-4 [&_svg]:text-muted-foreground
```

`data-slot="menu-item"` / `"listbox-option"`.

### `Toast.tsx` / `Toast.css`

```
rounded-3xl bg-primary text-primary-foreground bg-clip-padding shadow-lg ring-1 ring-foreground/10 px-4 py-3
```

Close button on toast = `<Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/10" />`. Focus ring on close = `focus-visible:ring-primary-foreground/30 focus-visible:border-primary-foreground`.

Audit `Toast.css` for any palette literals and migrate.

### `TagGroup.tsx`

Variants renamed: `default | secondary | outline | destructive | ghost` (Luma badge parity).
Style per variant matches `Badge.tsx` exactly. Tags additionally support
selection state via RAC; selected tag = filled variant regardless of
prop variant, OR — preferred — selection applies an inset ring:

```
data-selected:bg-primary data-selected:text-primary-foreground
data-selected:ring-2 data-selected:ring-primary-foreground/20
```

Remove button: `<Button variant="ghost" size="icon-xs" />`.

`data-slot="tag-group"` on root, `"tag"` on each chip.

### `Calendar.tsx` / `RangeCalendar.tsx`

Cell sizing + radius via CSS custom props:

```
group/calendar bg-background p-3
[--cell-radius:var(--radius-4xl)] [--cell-size:--spacing(8)]
```

| Element                   | Class                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Day cell                  | `size-(--cell-size) rounded-(--cell-radius) text-sm text-foreground transition-colors`                                  |
| Day hover                 | `hover:bg-muted`                                                                                                         |
| Day selected (single)     | `bg-primary text-primary-foreground` — radius makes it a disc                                                            |
| Day today                 | `ring-1 ring-input` (subtle outline, no fill)                                                                            |
| Day outside month         | `text-muted-foreground/60`                                                                                               |
| Day disabled              | `opacity-50 pointer-events-none`                                                                                         |
| Range middle              | `bg-accent text-accent-foreground rounded-none`                                                                          |
| Range start cap           | `rounded-l-(--cell-radius) rounded-r-none bg-accent`                                                                     |
| Range end cap             | `rounded-r-(--cell-radius) rounded-l-none bg-accent`                                                                     |
| Range single-day selected | `bg-primary text-primary-foreground rounded-(--cell-radius)` (overrides range styling)                                   |
| Invalid range             | `bg-destructive/10 text-destructive`                                                                                     |
| Header cell (weekday)     | `text-xs text-muted-foreground font-medium`                                                                              |
| Nav buttons               | `<Button variant="ghost" size="icon-sm" />`                                                                              |

### `Table.tsx` / `Tree.tsx` / `GridList.tsx` / `ListBox.tsx`

| Element             | Class                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Container           | `rounded-3xl border border-border bg-background shadow-sm overflow-hidden`                            |
| Header (Table)      | `bg-muted/60 text-xs font-medium text-muted-foreground border-b border-border`                       |
| Row                 | `text-sm text-foreground border-b border-border last:border-b-0`                                     |
| Row hover           | `hover:bg-muted`                                                                                     |
| Row pressed         | `pressed:bg-muted/80 pressed:translate-y-px`                                                         |
| Row selected        | `data-selected:bg-accent data-selected:text-accent-foreground`                                       |
| Row disabled        | `disabled:opacity-50 disabled:pointer-events-none`                                                   |
| Section header      | `bg-muted/60 border-y border-border text-xs font-medium text-muted-foreground px-3 py-1.5`           |
| Caret icon          | `text-muted-foreground size-4`                                                                       |

`data-slot="table"` / `"table-header"` / `"table-row"` / `"table-cell"` / `"tree"` / `"tree-item"` / etc.

### `Meter.tsx`

Monochrome by design:

```ts
function getFillClass(percentage: number) {
  if (percentage < 40) return "bg-muted-foreground/40"
  if (percentage < 80) return "bg-muted-foreground/70"
  return "bg-destructive"
}
```

Track: `h-1.5 rounded-full bg-muted overflow-hidden`. Value label color
when ≥80%: `text-destructive`.

### `ProgressBar.tsx`

Track `h-1.5 rounded-full bg-muted`. Fill `bg-primary rounded-full`.

### `Disclosure.tsx` / `DisclosureGroup.tsx`

| Element        | Class                                                                                  |
| -------------- | -------------------------------------------------------------------------------------- |
| Trigger        | `flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30` |
| Panel          | `px-3 py-2 text-sm text-foreground data-open:animate-in data-closed:animate-out`       |

### `Breadcrumbs.tsx`

`text-sm text-muted-foreground` items, `text-foreground` for current page, separator slot `<CaretRightIcon className="size-3 text-muted-foreground" />`.

### `DropZone.tsx`

```
rounded-3xl border-2 border-dashed border-input bg-background p-6
data-drop-target:border-ring data-drop-target:bg-accent
data-drop-target:ring-3 data-drop-target:ring-ring/30
transition-colors
```

### Color picker family

Chrome retains Luma neutrality:

- Thumb border: `border-background` (replaces `border-white`)
- Thumb fill: `bg-foreground` (the selected color is inside the thumb chrome; chrome inverts vs theme)
- Disabled track: `bg-muted opacity-50`
- Swatch outline: `border-foreground/10`
- Swatch selected ring: outer `border-foreground` + inner `outline-background outline-2`

Otherwise functionality unchanged.

### Toolbar / Form / Provider

Layout-only. Add `data-slot` + `group/<name>` on the root. No visual change.

---

## Storybook integration

### `.storybook/preview.tsx`

Configure the canvas globally:

```tsx
import "../src/index.css"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "muted",
      values: [
        { name: "muted", value: "var(--muted)" },
        { name: "background", value: "var(--background)" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans text-foreground antialiased">
        <Story />
      </div>
    ),
  ],
}

export default preview
```

The `@vueless/storybook-dark-mode` addon continues to toggle `.dark` on
the preview root; the canvas color resolves via the CSS variable so dark
mode swaps the backdrop automatically.

### `stories/Aesthetic.stories.tsx` (new)

A single page modeled after `tmp/luma/components/demo.tsx`. Renders on
`bg-muted` and showcases the full library composition:

```
<div className="flex min-h-screen w-full flex-col items-center bg-muted p-4 sm:p-6 lg:p-12 dark:bg-background">
  <div className="grid max-w-4xl gap-4 sm:grid-cols-2">
    {/* Left column */}
    <Card>
      <CardHeader>
        <CardTitle>Style Overview</CardTitle>
        <CardDescription>Token palette + Phosphor glyph row.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Token swatches: --background, --foreground, --primary, --secondary, --muted, --accent, --border, --chart-1..5 */}
        {/* Phosphor icon row: Copy, WarningCircle, Trash, Share, Bag, DotsThree, Spinner, Plus, Minus, ArrowLeft, ArrowRight, Check, CaretDown, CaretRight, MagnifyingGlass, Gear */}
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        {/* Button row: default, secondary, outline, ghost, destructive, link */}
        {/* Card size=sm composition pattern: settings row with Title + Description + Action */}
        {/* Slider */}
        {/* FieldGroup with TextField + Textarea */}
        {/* Badge row: default, secondary, outline, destructive, ghost */}
        {/* RadioGroup + Checkbox + Switch */}
        {/* AlertDialog trigger + DropdownMenu trigger */}
      </CardContent>
    </Card>

    {/* Wide row: Calendar + Tabs + Table snippet (3 rows, one selected) */}
    {/* Meter at 30 / 60 / 90% */}
    {/* TagGroup all variants */}
  </div>
</div>
```

Two stories under the same file:

- `Default` — neutral theme (shadcn-default tokens), as above.
- `BlueAccent` — same composition wrapped in a `<style>` decorator overriding `--primary` / `--ring` to a brand blue. Proves token override surface.

### Existing per-component stories

Untouched in terms of structure. They inherit the `bg-muted` canvas via
the global parameter. If a story has its own `bg-` decorator, leave it.

---

## Migration plan (single PR, commits sequenced)

1. **Tokens & theme.** Replace `src/index.css` with the block above
   (multiplier radii, font slots, monochrome chart defaults). Verify
   Storybook builds; expect every component to look wrong until step 4.
2. **Foundational utils.** Rewrite `focusRing` in `src/utils.ts` per
   above. Spot-check that callers still type-check.
3. **New primitives.** Add `src/Card.tsx`, `src/Badge.tsx`. Add their
   stories under `stories/Card.stories.tsx`, `stories/Badge.stories.tsx`.
4. **Component sweep.** Apply the per-component aesthetic spec in this
   order:
   a. `Button`, `Link`, `Separator`.
   b. Form base: `Field`, `TextField`, `SearchField`, `NumberField`,
      `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch`, `Select`,
      `ComboBox`, `DateField` / `DatePicker` / `DateRangePicker` /
      `TimeField`.
   c. Display: `Table`, `Tree`, `GridList`, `ListBox`, `Menu`, `Tabs`,
      `Breadcrumbs`, `Disclosure` / `DisclosureGroup`, `TagGroup`,
      `ToggleButton` / `ToggleButtonGroup`.
   d. Overlays: `Modal`, `Dialog`, `AlertDialog`, `Popover`, `Tooltip`,
      `Toast` / `Toast.css`, `CommandPalette`, `DropZone`.
   e. Color family: `ColorArea`, `ColorSlider`, `ColorWheel`,
      `ColorThumb`, `ColorSwatch`, `ColorSwatchPicker`, `ColorPicker`,
      `ColorField`.
   f. Status: `Meter`, `ProgressBar`, `Calendar`, `RangeCalendar`.
   g. Layout: `Toolbar`, `Form`, `Provider`.
5. **Storybook.** Wire `.storybook/preview.tsx` per above. Add
   `stories/Aesthetic.stories.tsx` (Default + BlueAccent variants).
6. **Cleanup.**
   - Remove `tmp/luma/`.
   - Delete the existing inline SVG spinner from `Button.tsx`.
   - Audit every component file for residual `rounded-lg` / `rounded-md`
     / `outline-blue-*` / `color-mix(in_oklch,...)` and replace per the
     aesthetic spec.
7. **Spec hygiene.** Update `specs/design-tokens.md` with a short
   "Superseded by `specs/luma-aesthetic.md`" callout at the top of the
   affected sections (Radius, State composition, Focus ring, TagGroup
   variant rename, Modal/Popover translucent treatment, Chart defaults,
   Disabled style). Don't delete the file — the per-component
   color-role mapping is still authoritative.

---

## Acceptance criteria

- [ ] `grep -rE "rounded-(lg|md|sm)\b" src/` returns only intentional
  small-radius usages (e.g. inline Link rounded-md). No `rounded-lg` on
  Buttons, Inputs, Cards, Modals, Popovers.
- [ ] `grep -rE "outline-(blue|ring)" src/` returns zero results
  (outline-based focus ring is gone; inset ring everywhere).
- [ ] `grep -rE "color-mix\(" src/` returns zero results in component
  files (hover/pressed are now opacity-fade).
- [ ] `grep -rE "bg-(blue|red|green|yellow|orange|amber|gray|slate|neutral)-[0-9]+" src/`
  returns zero results (already covered by design-tokens.md, reasserted).
- [ ] Every primitive file emits `data-slot="..."` on its root element.
- [ ] `Card.tsx` and `Badge.tsx` exist and have stories.
- [ ] `pnpm storybook` builds clean. Light and dark mode both render the
  Aesthetic showcase without console errors.
- [ ] In the Aesthetic showcase: buttons visibly nudge down 1px on
  press; modals fade+zoom in over a blurred backdrop; inputs read as
  soft translucent fills on the muted canvas; cards float with a 1px
  inset ring and md shadow; tags / badges are pill-shaped.
- [ ] `Aesthetic.stories.tsx`'s `BlueAccent` variant proves the override
  surface works — re-tinting `--primary` flows through Button, Switch,
  Slider, Calendar selected day, Tabs selection, etc., without manual
  per-component overrides.
- [ ] `tmp/luma/` is deleted from the repo.
- [ ] `specs/design-tokens.md` has the supersession callout at the top
  of each affected section.

---

## Open questions / explicit deferrals

- **Item primitive.** Punted. Add when a real settings-row use case
  shows up that `Card size="sm"` + flex doesn't serve. The Aesthetic
  showcase demonstrates the manual composition.
- **Form-control sizes.** Only Button gets `xs/sm/default/lg`. If
  dashboard consumers ask for `<Input size="sm">`, add in a follow-up;
  the variant infrastructure (data-size attribute, tv variant) is in
  place.
- **Success / warning semantic tokens.** Still no. Status colors stay
  derived from `--muted-foreground` / `--destructive` in `Meter`.
  Multi-variant Toast (`<Toast variant="success">`) is also still
  deferred for the same reason.
- **Heading typeface.** `--font-heading` slot exists but defaults to
  `var(--font-sans)`. The library makes no opinionated default. Ship a
  recipe in docs ("set `--font-heading` to a display face for branded
  titles") but no bundled font.
- **Chromatic / `storybook-test-runner`.** Visual snapshot tooling is
  still out of scope. Manual eyeball + the Aesthetic showcase is the
  gate. Revisit if a downstream consumer wants visual regression as a
  CI gate.
- **Provider injecting theme.** Could later inject `<style>` for the
  default theme so consumers don't have to import `styles.css`. Out of
  scope; current `import "@vrmn/komorebi/styles.css"` flow stands.
- **Echarts theming.** `echarts` is in `peerDependencies` but has no
  consumer in `src/` yet. The monochrome `--chart-1..5` are reserved for
  when a chart component lands; current values are placeholders, not load-
  bearing.
- **Sidebar component.** Tokens (`--sidebar-*`) ship as stubs but no
  component consumes them. Whenever Sidebar lands, validate the stub
  defaults still feel right.
- **`@vueless/storybook-dark-mode` reliability.** If the addon stops
  toggling `.dark` cleanly in a future Storybook release, fall back to a
  custom decorator that mirrors the addon's state onto `<html
  class="dark">`. Not an issue today.
