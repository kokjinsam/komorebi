import React from "react"
import { TableBody } from "react-aria-components/Table"
import { DialogTrigger } from "react-aria-components/Dialog"
import { TooltipTrigger } from "react-aria-components/Tooltip"
import { Badge } from "../src/Badge"
import { Button } from "../src/Button"
import { Calendar } from "../src/Calendar"
import { Checkbox } from "../src/Checkbox"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../src/Card"
import { Modal } from "../src/Modal"
import { AlertDialog } from "../src/AlertDialog"
import { Meter } from "../src/Meter"
import { NumberField } from "../src/NumberField"
import { Popover } from "../src/Popover"
import { ProgressBar } from "../src/ProgressBar"
import { RadioGroup, Radio } from "../src/RadioGroup"
import { SearchField } from "../src/SearchField"
import { Select, SelectItem } from "../src/Select"
import { Slider } from "../src/Slider"
import { Switch } from "../src/Switch"
import { Tag, TagGroup } from "../src/TagGroup"
import { Cell, Column, Row, Table, TableHeader } from "../src/Table"
import { Tabs, Tab, TabList, TabPanel } from "../src/Tabs"
import { TextField } from "../src/TextField"
import { ToggleButton } from "../src/ToggleButton"
import { Tooltip } from "../src/Tooltip"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </section>
  )
}

function AestheticShowcase({ style }: { style?: string }) {
  return (
    <>
      {style && <style>{style}</style>}
      <div className="min-h-screen bg-muted p-8 text-foreground">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-semibold">Komorebi</h1>
              <p className="text-sm text-muted-foreground">Luma aesthetic showcase</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">v0.1</Badge>
              <Badge variant="outline">Luma</Badge>
            </div>
          </header>

          {/* Buttons */}
          <Section title="Buttons">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="default" isDisabled>Disabled</Button>
                  <Button variant="default" isPending>Saving…</Button>
                </div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">XSmall</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Badges */}
          <Section title="Badges">
            <Card>
              <CardContent className="flex flex-wrap gap-2 pt-6">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </CardContent>
            </Card>
          </Section>

          {/* Cards */}
          <Section title="Cards">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Alpha</CardTitle>
                  <CardDescription>A brief description of the project and its goals.</CardDescription>
                  <CardAction>
                    <Button size="xs" variant="outline">Edit</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Content area with contextual information and actions.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="default">Save</Button>
                  <Button size="sm" variant="ghost">Cancel</Button>
                </CardFooter>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <CardTitle>Team Settings</CardTitle>
                  <CardAction><Badge variant="secondary">Stable</Badge></CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Compact variant for dense layouts.</p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Form controls */}
          <Section title="Form controls">
            <Card>
              <CardContent className="flex flex-wrap gap-4 pt-6">
                <TextField label="Email" type="email" placeholder="you@example.com" className="w-56" />
                <TextField label="Password" type="password" placeholder="••••••••" className="w-56" />
                <NumberField label="Quantity" defaultValue={1} minValue={0} />
                <SearchField label="Search" placeholder="Search…" className="w-56" />
                <Select label="Role" className="w-44">
                  <SelectItem>Admin</SelectItem>
                  <SelectItem>Member</SelectItem>
                  <SelectItem>Viewer</SelectItem>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-wrap gap-6 pt-6">
                <RadioGroup label="Notifications" defaultValue="all">
                  <Radio value="all">All</Radio>
                  <Radio value="mentions">Mentions only</Radio>
                  <Radio value="none">None</Radio>
                </RadioGroup>
                <div className="flex flex-col gap-3">
                  <Checkbox>Email notifications</Checkbox>
                  <Checkbox defaultSelected>Push notifications</Checkbox>
                  <Switch>Dark mode</Switch>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Sliders & Meters */}
          <Section title="Sliders & Meters">
            <Card>
              <CardContent className="flex flex-col gap-6 pt-6">
                <Slider label="Volume" defaultValue={60} className="w-64" />
                <div className="flex flex-col gap-2 w-64">
                  <Meter label="Storage (30%)" value={30} maxValue={100} />
                  <Meter label="Storage (60%)" value={60} maxValue={100} />
                  <Meter label="Storage (90%)" value={90} maxValue={100} />
                </div>
                <ProgressBar label="Uploading…" value={45} className="w-64" />
              </CardContent>
            </Card>
          </Section>

          {/* Tabs & Toggle */}
          <Section title="Tabs & Toggle">
            <Card>
              <CardContent className="pt-6 flex flex-col gap-4">
                <Tabs>
                  <TabList aria-label="Sections">
                    <Tab id="overview">Overview</Tab>
                    <Tab id="activity">Activity</Tab>
                    <Tab id="settings">Settings</Tab>
                  </TabList>
                  <TabPanel id="overview"><p className="text-sm text-muted-foreground pt-2">Overview content.</p></TabPanel>
                  <TabPanel id="activity"><p className="text-sm text-muted-foreground pt-2">Activity content.</p></TabPanel>
                  <TabPanel id="settings"><p className="text-sm text-muted-foreground pt-2">Settings content.</p></TabPanel>
                </Tabs>
                <div className="flex gap-1">
                  <ToggleButton>Bold</ToggleButton>
                  <ToggleButton>Italic</ToggleButton>
                  <ToggleButton defaultSelected>Underline</ToggleButton>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Tags */}
          <Section title="Tags">
            <Card>
              <CardContent className="flex flex-wrap gap-4 pt-6">
                <TagGroup label="Default" variant="default" selectionMode="multiple">
                  <Tag>Alpha</Tag>
                  <Tag>Beta</Tag>
                  <Tag>Gamma</Tag>
                </TagGroup>
                <TagGroup label="Secondary" variant="secondary" selectionMode="multiple">
                  <Tag>Design</Tag>
                  <Tag>Engineering</Tag>
                </TagGroup>
                <TagGroup label="Destructive" variant="destructive" selectionMode="multiple">
                  <Tag>Error</Tag>
                  <Tag>Critical</Tag>
                </TagGroup>
                <TagGroup label="Outline" variant="outline" selectionMode="multiple">
                  <Tag>In progress</Tag>
                  <Tag>Review</Tag>
                </TagGroup>
              </CardContent>
            </Card>
          </Section>

          {/* Calendar */}
          <Section title="Calendar">
            <Card className="w-fit">
              <CardContent className="pt-6">
                <Calendar aria-label="Select date" />
              </CardContent>
            </Card>
          </Section>

          {/* Table */}
          <Section title="Table">
            <Card>
              <CardContent className="pt-6">
                <Table aria-label="Files" selectionMode="multiple" defaultSelectedKeys={new Set(["2"])}>
                  <TableHeader>
                    <Column id="name" isRowHeader>Name</Column>
                    <Column id="type">Type</Column>
                    <Column id="size">Size</Column>
                  </TableHeader>
                  <TableBody>
                    <Row id="1"><Cell>Games</Cell><Cell>Folder</Cell><Cell>—</Cell></Row>
                    <Row id="2"><Cell>Documents</Cell><Cell>Folder</Cell><Cell>—</Cell></Row>
                    <Row id="3"><Cell>Budget.xls</Cell><Cell>Excel</Cell><Cell>48 KB</Cell></Row>
                    <Row id="4"><Cell>Notes.md</Cell><Cell>Markdown</Cell><Cell>12 KB</Cell></Row>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Section>

          {/* Overlays */}
          <Section title="Overlays">
            <Card>
              <CardContent className="flex flex-wrap gap-3 pt-6">
                <TooltipTrigger>
                  <Button variant="secondary">Hover for tooltip</Button>
                  <Tooltip>Tooltip with opaque surface + shadow</Tooltip>
                </TooltipTrigger>
                <DialogTrigger>
                  <Button variant="outline">Open modal</Button>
                  <Modal>
                    <AlertDialog title="Confirm action" actionLabel="Confirm">
                      Are you sure you want to proceed? This action cannot be undone.
                    </AlertDialog>
                  </Modal>
                </DialogTrigger>
              </CardContent>
            </Card>
          </Section>
        </div>
      </div>
    </>
  )
}

export default {
  title: "Aesthetic",
  parameters: { layout: "fullscreen" }
}

export const Default = () => <AestheticShowcase />

export const BlueAccent = () => (
  <AestheticShowcase style=":root { --primary: oklch(0.546 0.245 262.881); --primary-foreground: oklch(0.98 0.013 248); --ring: oklch(0.546 0.245 262.881); }" />
)
