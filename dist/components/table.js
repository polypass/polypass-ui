"use client";

// src/components/table.tsx
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { CaretDown, MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var TableView = ({
  data,
  columns,
  emptyContent,
  label,
  onAdd,
  cellProcessor
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(
    /* @__PURE__ */ new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(columns.map((col) => col.uid))
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: columns[0].uid,
    direction: "ascending"
  });
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(data.length / rowsPerPage);
  const headerColumns = React.useMemo(() => {
    return visibleColumns === "all" ? columns : columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns]);
  const items = React.useMemo(() => {
    const pageStartIdx = (page - 1) * rowsPerPage;
    return data.filter(
      (item) => !searchQuery || item[columns[0].uid].toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(pageStartIdx, pageStartIdx + rowsPerPage);
  }, [page, searchQuery, rowsPerPage]);
  const sortedItems = React.useMemo(
    () => [...items].sort((a, b) => {
      const [first, second] = [
        a[sortDescriptor.column],
        b[sortDescriptor.column]
      ];
      return (first < second ? -1 : first > second ? 1 : 0) * (sortDescriptor.direction === "descending" ? -1 : 1);
    }),
    [sortDescriptor, items]
  );
  const topContent = React.useMemo(() => {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            label,
            "s"
          ] }),
          /* @__PURE__ */ jsx(
            Chip,
            {
              size: "sm",
              className: "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
              children: data.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            color: "primary",
            endContent: /* @__PURE__ */ jsx(PlusCircle, { weight: "fill", size: 18 }),
            onPress: onAdd,
            children: [
              "Add ",
              label
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-3", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              isClearable: true,
              placeholder: `Search by ${columns[0].name.toLowerCase()}...`,
              size: "sm",
              startContent: /* @__PURE__ */ jsx(MagnifyingGlass, { className: "text-default-300" }),
              value: searchQuery,
              onClear: () => setSearchQuery(""),
              onValueChange: (value) => {
                if (value) {
                  setSearchQuery(value);
                  setPage(1);
                } else setSearchQuery("");
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
            /* @__PURE__ */ jsx(DropdownTrigger, { children: /* @__PURE__ */ jsx(
              Button,
              {
                endContent: /* @__PURE__ */ jsx(CaretDown, { className: "text-small" }),
                size: "sm",
                variant: "flat",
                children: "Columns"
              }
            ) }),
            /* @__PURE__ */ jsx(
              DropdownMenu,
              {
                disallowEmptySelection: true,
                "aria-label": "Table Columns",
                closeOnSelect: false,
                selectedKeys: visibleColumns,
                selectionMode: "multiple",
                onSelectionChange: setVisibleColumns,
                children: columns.map((column) => /* @__PURE__ */ jsx(DropdownItem, { className: "capitalize", children: column.name }, column.uid))
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center text-default-400 text-small", children: [
          "Rows per page:",
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "bg-transparent outline-none text-default-400 text-small",
              onChange: (e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsx("option", { value: "5", children: "5" }),
                /* @__PURE__ */ jsx("option", { value: "10", children: "10" }),
                /* @__PURE__ */ jsx("option", { value: "15", children: "15" })
              ]
            }
          )
        ] })
      ] })
    ] });
  }, [searchQuery, visibleColumns, data.length]);
  const bottomContent = React.useMemo(() => {
    return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(
        Pagination,
        {
          showControls: true,
          isCompact: true,
          isDisabled: !!searchQuery,
          page,
          total: pages,
          onChange: setPage
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-small text-default-400", children: selectedKeys === "all" ? "All items selected" : `${selectedKeys.size} of ${items.length} selected` })
    ] });
  }, [selectedKeys, items.length, page, pages, searchQuery]);
  return /* @__PURE__ */ jsxs(
    Table,
    {
      isCompact: true,
      isStriped: true,
      bottomContent,
      bottomContentPlacement: "outside",
      selectedKeys,
      selectionMode: "multiple",
      sortDescriptor,
      topContent,
      topContentPlacement: "outside",
      onSelectionChange: setSelectedKeys,
      onSortChange: setSortDescriptor,
      children: [
        /* @__PURE__ */ jsx(TableHeader, { columns: headerColumns, children: (column) => /* @__PURE__ */ jsx(
          TableColumn,
          {
            align: column.uid === "actions" ? "center" : "start",
            allowsSorting: column.sortable,
            children: column.name
          },
          column.uid
        ) }),
        /* @__PURE__ */ jsx(
          TableBody,
          {
            emptyContent: emptyContent || "No data found.",
            items: sortedItems,
            children: (item) => /* @__PURE__ */ jsx(TableRow, { children: (columnKey) => /* @__PURE__ */ jsx(TableCell, { children: cellProcessor ? cellProcessor(item, columnKey) : item[columnKey] }) }, item.id)
          }
        )
      ]
    }
  );
};
export {
  TableView
};
//# sourceMappingURL=table.js.map