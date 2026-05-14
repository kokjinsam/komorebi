import React from "react"
import { Button } from "../src/Button"
import { Badge } from "../src/Badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../src/Card"

export default {
  title: "Card",
  parameters: { layout: "centered" }
}

export const Default = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Project Alpha</CardTitle>
      <CardDescription>A brief description of this project and its goals.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Main content area for the card.</p>
    </CardContent>
    <CardFooter className="gap-2">
      <Button size="sm" variant="default">Save</Button>
      <Button size="sm" variant="ghost">Cancel</Button>
    </CardFooter>
  </Card>
)

export const WithAction = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Team Members</CardTitle>
      <CardDescription>Manage who has access to this workspace.</CardDescription>
      <CardAction>
        <Button size="xs" variant="outline">Invite</Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">3 members · 1 pending invite</p>
    </CardContent>
  </Card>
)

export const WithBadge = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Deployment Status</CardTitle>
      <CardAction>
        <Badge variant="secondary">Stable</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Last deployed 2 hours ago to production.</p>
    </CardContent>
  </Card>
)

export const Small = () => (
  <Card size="sm" className="w-72">
    <CardHeader>
      <CardTitle>Quick Note</CardTitle>
      <CardDescription>Compact card variant.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Reduced padding for dense layouts.</p>
    </CardContent>
    <CardFooter>
      <Button size="xs" variant="ghost">Dismiss</Button>
    </CardFooter>
  </Card>
)
