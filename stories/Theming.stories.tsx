import React from "react"
import { DialogTrigger } from "react-aria-components/Dialog"
import { TableBody } from "react-aria-components/Table"
import { TooltipTrigger } from "react-aria-components/Tooltip"
import { AlertDialog } from "../src/AlertDialog"
import { Button } from "../src/Button"
import { Meter } from "../src/Meter"
import { Modal } from "../src/Modal"
import { Select, SelectItem } from "../src/Select"
import { Cell, Column, Row, Table, TableHeader } from "../src/Table"
import { Tag, TagGroup } from "../src/TagGroup"
import { TextField } from "../src/TextField"
import { Tooltip } from "../src/Tooltip"

function ThemeGrid({ title, style }: { title: string; style?: string }) {
  return (
    <>
      {style && <style>{style}</style>}
      <div className="bg-background text-foreground flex min-h-screen flex-col gap-8 p-8">
        <h2 className="font-sans text-xl font-semibold">{title}</h2>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Buttons
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="default" isDisabled>
              Disabled
            </Button>
            <Button variant="default" isPending>
              Pending
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Fields
          </h3>
          <div className="flex flex-wrap gap-4">
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <Select label="Role">
              <SelectItem>Admin</SelectItem>
              <SelectItem>Member</SelectItem>
              <SelectItem>Viewer</SelectItem>
            </Select>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Meter
          </h3>
          <div className="flex w-56 flex-col gap-2">
            <Meter label="Storage (30%)" value={30} maxValue={100} />
            <Meter label="Storage (60%)" value={60} maxValue={100} />
            <Meter label="Storage (90%)" value={90} maxValue={100} />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Tags
          </h3>
          <div className="flex flex-col gap-2">
            <TagGroup label="Default" variant="default">
              <Tag>Alpha</Tag>
              <Tag>Beta</Tag>
            </TagGroup>
            <TagGroup label="Secondary" variant="secondary">
              <Tag>Gamma</Tag>
              <Tag>Delta</Tag>
            </TagGroup>
            <TagGroup label="Outline" variant="outline">
              <Tag>Passing</Tag>
              <Tag>Healthy</Tag>
            </TagGroup>
            <TagGroup label="Destructive" variant="destructive">
              <Tag>Error</Tag>
              <Tag>Critical</Tag>
            </TagGroup>
            <TagGroup label="Ghost" variant="ghost">
              <Tag>Info</Tag>
              <Tag>Pending</Tag>
            </TagGroup>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Tooltip
          </h3>
          <TooltipTrigger>
            <Button variant="secondary">Hover me</Button>
            <Tooltip>This is a tooltip</Tooltip>
          </TooltipTrigger>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Modal
          </h3>
          <DialogTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
              <AlertDialog title="Confirm action" actionLabel="Confirm">
                Are you sure you want to proceed?
              </AlertDialog>
            </Modal>
          </DialogTrigger>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-muted-foreground font-sans text-sm font-medium">
            Table
          </h3>
          <Table
            aria-label="Files"
            selectionMode="multiple"
            defaultSelectedKeys={new Set(["2"])}
            className="w-80"
          >
            <TableHeader>
              <Column id="name" isRowHeader>
                Name
              </Column>
              <Column id="type">Type</Column>
            </TableHeader>
            <TableBody>
              <Row id="1">
                <Cell>Games</Cell>
                <Cell>Folder</Cell>
              </Row>
              <Row id="2">
                <Cell>Documents</Cell>
                <Cell>Folder</Cell>
              </Row>
              <Row id="3">
                <Cell>Budget.xls</Cell>
                <Cell>Excel</Cell>
              </Row>
            </TableBody>
          </Table>
        </section>
      </div>
    </>
  )
}

export default {
  title: "Theming",
  parameters: { layout: "fullscreen" }
}

export const DefaultShadcn = () => (
  <ThemeGrid title="Default — shadcn neutral" />
)

export const BlueAccent = () => (
  <ThemeGrid
    title="Blue accent"
    style=":root { --primary: oklch(0.546 0.245 262.881); --primary-foreground: oklch(0.98 0.013 248); --ring: oklch(0.546 0.245 262.881); }"
  />
)

export const VioletAccent = () => (
  <ThemeGrid
    title="Violet accent"
    style=":root { --primary: oklch(0.591 0.239 292.717); --primary-foreground: oklch(0.985 0.002 247.858); --ring: oklch(0.591 0.239 292.717); }"
  />
)
