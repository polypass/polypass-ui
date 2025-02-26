// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.
"use client";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, } from "@heroui/react";
import { CaretDown, MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import React from "react";
export const TableView = ({ data, columns, emptyContent, label, onAdd, cellProcessor, }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(columns.map((col) => col.uid)));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: columns[0].uid,
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(data.length / rowsPerPage);
    const headerColumns = React.useMemo(() => {
        return visibleColumns === "all"
            ? columns
            : columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
    }, [visibleColumns]);
    const items = React.useMemo(() => {
        const pageStartIdx = (page - 1) * rowsPerPage;
        return data
            .filter((item) => !searchQuery ||
            item[columns[0].uid].toLowerCase().includes(searchQuery.toLowerCase())) // filter by search query
            .slice(pageStartIdx, pageStartIdx + rowsPerPage); // filter by page
    }, [page, searchQuery, rowsPerPage]);
    const sortedItems = React.useMemo(() => [...items].sort((a, b) => {
        const [first, second] = [
            a[sortDescriptor.column],
            b[sortDescriptor.column],
        ];
        return ((first < second ? -1 : first > second ? 1 : 0) *
            (sortDescriptor.direction === "descending" ? -1 : 1));
    }), [sortDescriptor, items]);
    const topContent = React.useMemo(() => {
        return (<div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">{label}s</h1>
            <Chip size="sm" className="bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {data.length}
            </Chip>
          </div>
          <Button color="primary" endContent={<PlusCircle weight="fill" size={18}/>} onPress={onAdd}>
            Add {label}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between gap-3">
            <Input isClearable placeholder={`Search by ${columns[0].name.toLowerCase()}...`} size="sm" startContent={<MagnifyingGlass className="text-default-300"/>} value={searchQuery} onClear={() => setSearchQuery("")} onValueChange={(value) => {
                if (value) {
                    setSearchQuery(value);
                    setPage(1);
                }
                else
                    setSearchQuery("");
            }}/>
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger>
                  <Button endContent={<CaretDown className="text-small"/>} size="sm" variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu disallowEmptySelection aria-label="Table Columns" closeOnSelect={false} selectedKeys={visibleColumns} selectionMode="multiple" onSelectionChange={setVisibleColumns}>
                  {columns.map((column) => (<DropdownItem key={column.uid} className="capitalize">
                      {column.name}
                    </DropdownItem>))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
            }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>);
    }, [searchQuery, visibleColumns, data.length]);
    const bottomContent = React.useMemo(() => {
        return (<div className="flex justify-between items-center">
        <Pagination showControls isCompact isDisabled={!!searchQuery} page={page} total={pages} onChange={setPage}/>
        <span className="text-small text-default-400">
          {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>);
    }, [selectedKeys, items.length, page, pages, searchQuery]);
    return (<Table isCompact isStriped bottomContent={bottomContent} bottomContentPlacement="outside" selectedKeys={selectedKeys} selectionMode="multiple" sortDescriptor={sortDescriptor} topContent={topContent} topContentPlacement="outside" onSelectionChange={setSelectedKeys} onSortChange={setSortDescriptor}>
      <TableHeader columns={headerColumns}>
        {(column) => (<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>)}
      </TableHeader>
      <TableBody emptyContent={emptyContent || "No data found."} items={sortedItems}>
        {(item) => (<TableRow key={item.id}>
            {(columnKey) => (<TableCell>
                {cellProcessor
                    ? cellProcessor(item, columnKey)
                    : item[columnKey]}
              </TableCell>)}
          </TableRow>)}
      </TableBody>
    </Table>);
};
