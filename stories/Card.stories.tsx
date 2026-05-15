import React from "react"
import { Badge } from "../src"
import { Button } from "../src"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../src"

export default {
  parameters: { layout: "centered" },
  title: "Card"
}

export const Default = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Project Alpha</CardTitle>
      <CardDescription>
        A brief description of this project and its goals.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        Main content area for the card.
      </p>
    </CardContent>
    <CardFooter className="gap-2">
      <Button size="sm" variant="default">
        Save
      </Button>
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
    </CardFooter>
  </Card>
)

export const WithAction = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Team Members</CardTitle>
      <CardDescription>
        Manage who has access to this workspace.
      </CardDescription>
      <CardAction>
        <Button size="xs" variant="outline">
          Invite
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        3 members · 1 pending invite
      </p>
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
      <p className="text-muted-foreground text-sm">
        Last deployed 2 hours ago to production.
      </p>
    </CardContent>
  </Card>
)

export const Small = () => (
  <Card className="w-72" size="sm">
    <CardHeader>
      <CardTitle>Quick Note</CardTitle>
      <CardDescription>Compact card variant.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        Reduced padding for dense layouts.
      </p>
    </CardContent>
    <CardFooter>
      <Button size="xs" variant="ghost">
        Dismiss
      </Button>
    </CardFooter>
  </Card>
)
