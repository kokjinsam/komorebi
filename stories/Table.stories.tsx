import { type Meta, type StoryFn } from "@storybook/react"
import React, { useMemo, useState } from "react"
import { TableBody } from "react-aria-components/Table"
import { Cell, Column, Row, Table, TableHeader } from "../src"

const meta: Meta<typeof Table> = {
  component: Table,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

const rows = [
  { date: "6/7/2020", id: 1, name: "Games", type: "File folder" },
  { date: "4/7/2021", id: 2, name: "Program Files", type: "File folder" },
  { date: "11/20/2010", id: 3, name: "bootmgr", type: "System file" },
  { date: "1/18/2016", id: 4, name: "log.txt", type: "Text Document" },
  { date: "6/18/2022", id: 5, name: "Proposal.ppt", type: "PowerPoint file" },
  { date: "12/6/2023", id: 6, name: "Taxes.pdf", type: "PDF Document" },
  { date: "8/2/2021", id: 7, name: "Photos", type: "File folder" },
  { date: "3/18/2023", id: 8, name: "Documents", type: "File folder" },
  { date: "1/6/2024", id: 9, name: "Budget.xls", type: "Excel file" }
]

export const Example: StoryFn<typeof Table> = (args) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending"
  })

  const items = useMemo(() => {
    // @ts-ignore
    const items = rows
      .slice()
      .sort((a, b) =>
        a[sortDescriptor.column].localeCompare(b[sortDescriptor.column])
      )
    if (sortDescriptor.direction === "descending") {
      items.reverse()
    }
    return items
  }, [sortDescriptor])

  return (
    <Table
      aria-label="Files"
      {...args}
      className="w-100 max-w-full"
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
    >
      <TableHeader>
        <Column allowsSorting id="name" isRowHeader>
          Name
        </Column>
        <Column allowsSorting id="type">
          Type
        </Column>
        <Column allowsSorting id="date">
          Date Modified
        </Column>
      </TableHeader>
      <TableBody items={items}>
        {(row) => (
          <Row>
            <Cell>{row.name}</Cell>
            <Cell>{row.type}</Cell>
            <Cell>{row.date}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  )
}

Example.args = {
  onCellAction: null,
  onRowAction: null,
  selectionMode: "multiple"
}
