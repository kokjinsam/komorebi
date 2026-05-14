# Luma Touch-ups

Five focused fixes to bring Komorebi components into closer alignment
with the Luma reference (`tmp/luma/` — reference only; do not import).
Issues are visible regressions / drift surfaced after the original
[`luma-aesthetic.md`](./luma-aesthetic.md) migration landed.

| #   | Symptom                                                                         | Touch point                  |
| --- | ------------------------------------------------------------------------------- | ---------------------------- |
| 1   | DateRangePicker calendar trigger is a square (rounded-sm); should be round.     | `FieldButton.tsx`            |
| 2   | DateRangePicker Popover renders with no visible surface — only the calendar.    | `Calendar.tsx`, `RangeCalendar.tsx` |
| 3   | CommandPalette padding doesn't follow Luma's nested padding scheme.             | `CommandPalette.tsx`         |
| 4   | Switch dims / proportions diverge from Luma reference.                          | `Switch.tsx`                 |
| 5   | Slider thumb is a bordered circle; Luma uses an oval pill with hover halo.     | `Slider.tsx`                 |

Ship as a single PR sequenced as: (1) FieldButton + Calendar width →
(2) Switch + Slider redims → (3) CommandPalette padding + positioning →
(4) Aesthetic showcase visual QA.

---

## Supersedes

This spec overrides parts of [`luma-aesthetic.md`](./luma-aesthetic.md):

| `luma-aesthetic.md` section              | New behavior                                                |
| ---------------------------------------- | ----------------------------------------------------------- |
| Decision #19 — Switch dims (`h-5 w-9`, `size-4` thumb, `translate-x-4`)         | Luma-exact: `h-5 w-11 border-2`, `h-4 w-6` oval thumb, `translate-x-[calc(100%-8px)]`. |
| Decision #19 — Slider thumb (`size-4 border-2 border-input bg-background`)      | Luma-exact: `h-4 w-6` oval pill, `bg-white` (literal, both modes), `ring-1 ring-black/10 shadow-md`, hover+focus halo `ring-4 ring-ring/30`. |
| Decision #6 — universal `aria-invalid` styling (applied to Switch)              | Switch drops invalid styling entirely. Validation UI is not meaningful on a binary toggle. |
| `Slider.tsx` table — track `bg-muted`                                           | Track `bg-input/90` (visible on `bg-muted` canvas; Luma fidelity). |
| Implicit FieldButton shape (square `rounded-sm` from `src/FieldButton.tsx`)     | `rounded-full p-1.5` — affects every consumer (DatePicker, DateRangePicker, ComboBox trigger button, etc.). |

Add a one-line callout at decision #19 of `luma-aesthetic.md` pointing
to this file as the current source of truth for Switch and Slider dims.

---

## 1. FieldButton — round shape (DateRangePicker calendar trigger)

**File:** `src/FieldButton.tsx`

**Why:** the calendar / chevron / clear buttons embedded inside an input
read as a discrete affordance separate from the input fill. A round
hit-target is the established Luma idiom for icon buttons living inside
larger rounded containers. The current `rounded-sm` reads as a small
square notch and visually conflicts with the input's `rounded-3xl`
shell.

**Scope:** change `FieldButton` itself, not the individual callers.
DatePicker, DateRangePicker, and any future consumer inherit the new
shape (single source of truth).

### Before

```tsx
let button = tv({
  base: "pressed:bg-foreground/10 flex cursor-default items-center justify-center rounded-sm border-0 bg-transparent p-1 text-muted-foreground transition-colors outline-none [-webkit-tap-highlight-color:transparent] hover:bg-foreground/5 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-ring/30"
})
```

### After

```tsx
let button = tv({
  base: "pressed:bg-foreground/10 flex cursor-default items-center justify-center rounded-full border-0 bg-transparent p-1.5 text-muted-foreground transition-colors outline-none [-webkit-tap-highlight-color:transparent] hover:bg-foreground/5 disabled:bg-transparent focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:border-ring"
})
```

Changes:

- `rounded-sm` → `rounded-full`
- `p-1` → `p-1.5` (gives a touch more breathing room around the size-4 icon — total ~28px hit target without locking a fixed `size-7`, so callers passing a `size-5` icon scale naturally)
- `focus-visible:ring-2` → `focus-visible:ring-3 focus-visible:border-ring` (aligns with the inset focus ring idiom from `focusRing`)

### Caller adjustments

`src/DateRangePicker.tsx` line 43: the `<FieldButton className="mr-1">`
stays — but if the trailing margin still looks tight against the input's
`rounded-3xl` curve, bump to `mr-1.5`. Verify visually; do not change
preemptively.

`src/DatePicker.tsx`, `src/ComboBox.tsx`, any other consumer: no
override needed. Confirm in storybook that no caller passes a square
override className.

---

## 2. Calendar / RangeCalendar — fixed width (Popover collapse fix)

**Files:** `src/Calendar.tsx`, `src/RangeCalendar.tsx`

**Why:** the DateRangePicker Popover appears "totally collapsed" — the
calendar grid renders, but the rounded popover surface has no visible
background. The root cause is layout, not tokens: `Popover` defaults to
`width: max-content`, and the inner `<CalendarGrid>` uses an HTML
`<table>` with cells laid out as `size-(--cell-size)`. The table's
intrinsic width is computed lazily, so the popover surface collapses to
the width of its padding alone and the table overflows outside the
surface.

**Fix:** give the calendar root a deterministic width so the popover
sizes around it.

The width formula uses `--spacing` (Tailwind's spacing unit, default
`0.25rem`): each column is 9 spacing units wide (a `--cell-size` of 8
units plus a 1-unit gap allowance), times 7 columns.

### `src/RangeCalendar.tsx`

Update the root `className` to add `w-[calc(9*var(--spacing)*7)]`:

```tsx
<AriaRangeCalendar
  {...props}
  data-slot="range-calendar"
  className={composeTailwindRenderProps(
    props.className,
    "group/range-calendar [--cell-radius:var(--radius-4xl)] [--cell-size:--spacing(8)] w-[calc(9*var(--spacing)*7)] @container"
  )}
>
```

Default rendered width: `0.25rem × 9 × 7 = 15.75rem` (252px).

### `src/Calendar.tsx`

Apply the same width to plain `Calendar` so standalone usage (no
popover) gets the identical sizing — otherwise switching from
RangeCalendar to Calendar mid-design produces inconsistent widths.

The exact addition: append `w-[calc(9*var(--spacing)*7)]` to the
calendar root's class list, next to the existing `[--cell-radius:…]`
and `[--cell-size:…]` declarations.

### Why fixed `w-` instead of `min-w-`

A fixed width prevents reflow on month transition (some month names are
longer than others; "September" vs. "May"). The calendar grid is
inherently fixed-column anyway, so fixed width is the honest
declaration. If a future caller overrides `--cell-size`, the width
expression scales with it because `--spacing` is independent — they
must also override the width by passing a custom `className`.

### Don't touch Popover

Generic `Popover.tsx` remains `width: max-content`. This fix is local to
calendar components; other popovers (ComboBox, Select, Menu) keep their
content-driven sizing.

---

## 3. CommandPalette — Luma outer padding + top-1/3 + list cap

**File:** `src/CommandPalette.tsx`

Three coordinated changes. None of them restructure the inner Menu
component — Menu retains its Luma item styling from the original
migration.

### 3a. Outer padding

**Why:** Luma's CommandDialog passes `p-0` to the Dialog (so the
palette content takes the full rounded surface) and the inner Command
wraps everything in `p-1`. The current Komorebi version has a tight
`m-2` on the SearchField inside an otherwise-default-padded Modal,
which produces inconsistent gaps between (i) modal edge ↔ search field
and (ii) search field ↔ first menu item.

**Change:** drop the `m-2` on SearchField, wrap the palette content in
a `p-1` container, and override the Modal's default `p-6` padding via
`className`.

### 3b. Top-1/3 positioning

**Why:** spotlight-style command palettes conventionally render in the
upper third of the viewport, not vertically centered. Centered feels
heavier and slower; top-1/3 puts the input where the eye lands.

Komorebi's `Modal` (`src/Modal.tsx`) renders its content via a flex
container with `items-center justify-center`. To position the palette
at top-1/3 *without* changing the Modal component itself (other modal
consumers still want centered), the CommandPalette wraps its content
with explicit positioning that overrides the inherited center alignment
— easiest via `mt-[33vh] self-start` on the Modal child or via a
`position` className passed through.

If `Modal` props don't allow a positioning override, add an opt-in
`position?: 'center' | 'top'` prop to `Modal` and default to `center`.
CommandPalette passes `position="top"`. Implementation detail —
acceptance is that the palette renders ~1/3 from the top, regardless of
the mechanism.

### 3c. List cap

**Why:** without a max-height the menu grows unbounded with results
(20+ commands is plausible); the palette becomes the full viewport
height and feels unwieldy.

**Change:** the inner `<Menu>` gets `max-h-72` (18rem / 288px) and
keeps its existing scroll behavior.

### After

```tsx
return (
  <Modal isDismissable isOpen={isOpen} onOpenChange={onOpenChange} position="top">
    <Dialog data-slot="command-palette" className="flex max-h-[inherit] flex-col p-1">
      <AriaAutocomplete filter={contains} {...props}>
        <SearchField
          autoFocus
          aria-label="Search commands"
          placeholder="Search commands"
        />
        <Menu
          {...props}
          className="min-h-0 max-h-72 flex-1"
          renderEmptyState={() => "No results found."}
        />
      </AriaAutocomplete>
    </Dialog>
  </Modal>
)
```

The Modal must also accept a className override to neutralize its
default `p-6` (so the inner `p-1` is the only padding). Concretely:
pass `className="p-1"` to the inner Modal layer, or remove the `p-6`
from Modal's base when `position="top"`. Pick whichever produces a
smaller diff and document the choice in the PR.

### What stays as-is

- `Cmd/Ctrl+J` keyboard shortcut.
- `Escape` to close.
- The Modal's `rounded-4xl` shell, shadow-xl, ring-1.
- The inner Menu's item styling (`rounded-2xl px-2.5 py-1.5` from the
  Luma migration).

---

## 4. Switch — Luma-exact dims

**File:** `src/Switch.tsx`

**Why:** the current switch (`h-5 w-9` track, `size-4` circular thumb,
`translate-x-4`) reads cramped — there's barely 1px of track visible on
either side of the thumb at rest. Luma's reference uses a wider track
and an oval thumb, producing a more deliberate "the thumb has room to
travel" rhythm and a thumb shape that visually emphasizes the travel
axis.

### Specs

| Property                 | Value                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Track size               | `h-5 w-11` (was `h-5 w-9`)                                                                        |
| Track radius             | `rounded-full`                                                                                    |
| Track border             | `border-2` with state-driven color (was `border border-transparent`)                              |
| Track unchecked          | `border-transparent bg-input/90` (was `bg-input`)                                                 |
| Track checked            | `border-primary bg-primary`                                                                       |
| Track disabled           | `disabled:opacity-50 disabled:pointer-events-none` (no change)                                    |
| Track focus              | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30`                       |
| Thumb size               | `h-4 w-6` oval pill (was `size-4` circle)                                                         |
| Thumb radius             | `rounded-full`                                                                                    |
| Thumb shadow             | `shadow-sm` (no change)                                                                           |
| Thumb fill (light, unchecked) | `bg-foreground`                                                                              |
| Thumb fill (light, checked)   | `bg-background` (or `bg-primary-foreground` — same value)                                    |
| Thumb fill (dark, unchecked)  | `dark:bg-foreground`                                                                         |
| Thumb fill (dark, checked)    | `dark:bg-primary-foreground`                                                                 |
| Thumb travel             | `translate-x-[calc(100%-8px)]` when checked, `translate-x-0` when unchecked                        |
| Thumb bg-clip             | `not-dark:bg-clip-padding` (keeps the border crisp in light mode where the thumb contrasts the track) |

### Removed

- `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`
  — validation UI is not meaningful for a binary toggle (a switch
  isn't "invalid", it's "off"). This is an explicit deviation from
  decision #6 of `luma-aesthetic.md`.

### Not added

- Luma's `after:absolute after:-inset-x-3 after:-inset-y-2` hit-target
  expansion. The RAC `Switch` already includes children as a sibling
  label that acts as the hit target. Adding the pseudo-element would
  double up; skip.

### Implementation sketch

```tsx
export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      data-slot="switch"
      className={composeTailwindRenderProps(
        props.className,
        "group/switch relative flex gap-2 items-center text-foreground text-sm transition disabled:pointer-events-none disabled:opacity-50 forced-colors:disabled:text-[GrayText] [-webkit-tap-highlight-color:transparent]"
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={[
              "peer flex h-5 w-11 shrink-0 cursor-default items-center rounded-full border-2 bg-clip-padding transition-colors",
              renderProps.isSelected
                ? "border-primary bg-primary forced-colors:bg-[Highlight]!"
                : "border-transparent bg-input/90 forced-colors:bg-[ButtonBorder]",
              renderProps.isFocusVisible
                ? "border-ring ring-3 ring-ring/30"
                : ""
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none block h-4 w-6 rounded-full shadow-sm transition-transform not-dark:bg-clip-padding",
                renderProps.isSelected
                  ? "translate-x-[calc(100%-8px)] bg-background dark:bg-primary-foreground forced-colors:bg-[HighlightText]"
                  : "translate-x-0 bg-foreground dark:bg-foreground forced-colors:bg-[ButtonText]"
              ].join(" ")}
            />
          </span>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
```

Note: when checked the focus ring's `border-ring` must override the
`border-primary` from the checked state — verify by tabbing onto an
already-on switch. If the border-color doesn't switch back to `ring` on
focus, swap the order so the focus class wins (or use Tailwind's
`focus-visible:` variant inline so specificity is unambiguous).

---

## 5. Slider — Luma-exact oval thumb + halo

**File:** `src/Slider.tsx`

**Why:** the current thumb (`size-4 border-2 border-input
bg-background`) reads as a small circle that gets visually lost on the
track. Luma's thumb is a horizontally-oriented pill (`h-4 w-6`) in
literal white with a subtle ring and shadow, plus a hover/focus halo
(`ring-4 ring-ring/30`) that telegraphs interactivity. The oval shape
also implicitly communicates the travel axis.

### Specs

| Element              | Value                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Track height/radius  | `h-1.5 rounded-full` (no change)                                                                                                     |
| Track fill           | `bg-input/90` (was `bg-muted`)                                                                                                       |
| Track disabled       | `disabled:opacity-50` — no need to override fill; the /90 already softens                                                            |
| Range (selected) fill | `bg-primary` (no change)                                                                                                            |
| Thumb size           | `h-4 w-6` oval (was `size-4`)                                                                                                        |
| Thumb radius         | `rounded-full`                                                                                                                       |
| Thumb fill           | `bg-white` literal — same in light and dark mode (Luma fidelity). Combined with `not-dark:bg-clip-padding`.                          |
| Thumb shadow         | `shadow-md` (was `shadow-sm`)                                                                                                        |
| Thumb baseline ring  | `ring-1 ring-black/10`                                                                                                               |
| Thumb halo (hover)   | `hover:ring-4 hover:ring-ring/30`                                                                                                    |
| Thumb halo (focus)   | `focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden`                                                       |
| Thumb transition     | `transition-[color,box-shadow,background-color]`                                                                                     |
| Vertical orientation | Rotate dims: `data-vertical:h-6 data-vertical:w-4` (Luma flips the oval to match the axis)                                           |

### Why literal `bg-white` in both modes

Decided over theme-aware `bg-background`: the high-contrast white pill
on a dark track is the Luma signature, and a theme-aware thumb in dark
mode (which would be near-black on a near-black track) loses
discoverability. The slight inconsistency with our other tokens is
accepted for fidelity.

### Implementation sketch

```tsx
<SliderTrack
  data-slot="slider-track"
  className="group orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 col-span-2 flex items-center"
>
  {({ state, ...renderProps }) => (
    <>
      <div
        className={[
          "h-1.5 rounded-full bg-input/90",
          renderProps.orientation === "horizontal" ? "w-full" : "h-full w-1.5 translate-x-0",
          renderProps.isDisabled ? "opacity-50 forced-colors:bg-[ButtonBorder]" : "forced-colors:bg-[ButtonBorder]"
        ].join(" ")}
      />
      {/* range fill: bg-primary (unchanged) */}
      …
      {state.values.map((_, i) => (
        <SliderThumb
          key={i}
          index={i}
          aria-label={thumbLabels?.[i]}
          data-slot="slider-thumb"
          className="group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 h-4 w-6 rounded-full bg-white shadow-md ring-1 ring-black/10 transition-[color,box-shadow,background-color] outline-none not-dark:bg-clip-padding hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-4"
        />
      ))}
    </>
  )}
</SliderTrack>
```

Note: the range-fill `div` keeps `bg-primary` and the absolute
positioning logic — no change.

---

## Acceptance criteria

- [ ] DateRangePicker calendar trigger is a round circle. Hover shows
      a soft `bg-foreground/5` fill; press shows `bg-foreground/10`.
      Focus shows a 3px ring + border-ring inset. Visible at the
      Aesthetic showcase + DateRangePicker story.
- [ ] Opening the DateRangePicker popover reveals a rounded surface
      (`rounded-3xl bg-popover shadow-md ring-1 ring-foreground/5`)
      that fully wraps the calendar. No calendar cells bleed outside.
      Verify in both light and dark mode.
- [ ] Standalone `Calendar` story renders at the same width as the
      RangeCalendar inside DateRangePicker.
- [ ] Switch track is visibly wider than before (h-5 w-11). Thumb is
      an oval pill (h-4 w-6), not a circle. When toggled on, the thumb
      slides flush to the right with `translate-x-[calc(100%-8px)]`.
- [ ] Switch in dark mode: unchecked thumb is `bg-foreground` (white),
      checked thumb is `bg-primary-foreground`. Track in dark unchecked
      is `bg-input/90` (very faint), checked is `bg-primary`.
- [ ] Switch has no `aria-invalid` styling. Setting `aria-invalid` on
      a Switch should not add a destructive ring or border.
- [ ] Slider track is `bg-input/90` (visible against `bg-muted`
      canvas). Range fill is `bg-primary`.
- [ ] Slider thumb is `h-4 w-6` literal-white oval with `ring-1
      ring-black/10 shadow-md`. Hovering the thumb produces a soft
      `ring-4 ring-ring/30` halo; focus-visible produces the same.
- [ ] Slider thumb stays white in dark mode (literal `bg-white`).
- [ ] CommandPalette renders at ~1/3 from the top of the viewport, not
      vertically centered. Opening with `Cmd/Ctrl+J` still works.
- [ ] CommandPalette padding: `p-1` outer container, no `m-2` on
      SearchField. Visual rhythm between modal edge ↔ search field ↔
      first item is consistent (each gap ~4px).
- [ ] CommandPalette result list caps at `max-h-72`; long result sets
      scroll within the palette.
- [ ] `grep -rE "rounded-sm\b" src/FieldButton.tsx` returns no results.
- [ ] `grep "bg-muted" src/Slider.tsx` returns no results for the
      track fill (was `bg-muted`, now `bg-input/90`).
- [ ] `grep -E "h-5 w-9|size-4 rounded-full" src/Switch.tsx` returns no
      results that refer to the track or thumb (old dims gone).
- [ ] `specs/luma-aesthetic.md` decision #19 has a one-line callout:
      "Superseded by `specs/luma-touchups.md` §4 (Switch) and §5
      (Slider)."

---

## Open questions / explicit deferrals

- **Modal `position` prop.** §3b assumes Modal gains a `position?:
  'center' | 'top'` prop. If the implementer finds a smaller mechanism
  (passing a className through to the inner flex container, for
  example) take it. The acceptance criterion is "palette renders at
  top-1/3", not "Modal gets a new prop".
- **Switch hit-target.** Deliberately did not add Luma's
  `after:-inset-x-3` pseudo. If touch-device feedback shows the switch
  is hard to tap when used without a label, revisit.
- **Slider tick marks / step indicators.** Out of scope. Current Slider
  has no ticks. If consumers ask, add in a follow-up.
- **AlertDialog positioning.** §3b only repositions CommandPalette,
  not AlertDialog. AlertDialog stays centered. If a future spec wants
  AlertDialog at top-1/3 as well, that's an additive change once
  `Modal` exposes the position prop.
- **FieldButton `shape` variant.** Not added — `rounded-full` becomes
  the single shape. If a NumberField stepper button needs a different
  shape later, introduce the variant then.
