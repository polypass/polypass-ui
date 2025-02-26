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
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold" }, label, "s"), /* @__PURE__ */ React.createElement(
      Chip,
      {
        size: "sm",
        className: "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
      },
      data.length
    )), /* @__PURE__ */ React.createElement(
      Button,
      {
        color: "primary",
        endContent: /* @__PURE__ */ React.createElement(PlusCircle, { weight: "fill", size: 18 }),
        onPress: onAdd
      },
      "Add ",
      label
    )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between gap-3" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        isClearable: true,
        placeholder: `Search by ${columns[0].name.toLowerCase()}...`,
        size: "sm",
        startContent: /* @__PURE__ */ React.createElement(MagnifyingGlass, { className: "text-default-300" }),
        value: searchQuery,
        onClear: () => setSearchQuery(""),
        onValueChange: (value) => {
          if (value) {
            setSearchQuery(value);
            setPage(1);
          } else setSearchQuery("");
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(Dropdown, null, /* @__PURE__ */ React.createElement(DropdownTrigger, null, /* @__PURE__ */ React.createElement(
      Button,
      {
        endContent: /* @__PURE__ */ React.createElement(CaretDown, { className: "text-small" }),
        size: "sm",
        variant: "flat"
      },
      "Columns"
    )), /* @__PURE__ */ React.createElement(
      DropdownMenu,
      {
        disallowEmptySelection: true,
        "aria-label": "Table Columns",
        closeOnSelect: false,
        selectedKeys: visibleColumns,
        selectionMode: "multiple",
        onSelectionChange: setVisibleColumns
      },
      columns.map((column) => /* @__PURE__ */ React.createElement(DropdownItem, { key: column.uid, className: "capitalize" }, column.name))
    )))), /* @__PURE__ */ React.createElement("label", { className: "flex items-center text-default-400 text-small" }, "Rows per page:", /* @__PURE__ */ React.createElement(
      "select",
      {
        className: "bg-transparent outline-none text-default-400 text-small",
        onChange: (e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(1);
        }
      },
      /* @__PURE__ */ React.createElement("option", { value: "5" }, "5"),
      /* @__PURE__ */ React.createElement("option", { value: "10" }, "10"),
      /* @__PURE__ */ React.createElement("option", { value: "15" }, "15")
    ))));
  }, [searchQuery, visibleColumns, data.length]);
  const bottomContent = React.useMemo(() => {
    return /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement(
      Pagination,
      {
        showControls: true,
        isCompact: true,
        isDisabled: !!searchQuery,
        page,
        total: pages,
        onChange: setPage
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "text-small text-default-400" }, selectedKeys === "all" ? "All items selected" : `${selectedKeys.size} of ${items.length} selected`));
  }, [selectedKeys, items.length, page, pages, searchQuery]);
  return /* @__PURE__ */ React.createElement(
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
      onSortChange: setSortDescriptor
    },
    /* @__PURE__ */ React.createElement(TableHeader, { columns: headerColumns }, (column) => /* @__PURE__ */ React.createElement(
      TableColumn,
      {
        key: column.uid,
        align: column.uid === "actions" ? "center" : "start",
        allowsSorting: column.sortable
      },
      column.name
    )),
    /* @__PURE__ */ React.createElement(
      TableBody,
      {
        emptyContent: emptyContent || "No data found.",
        items: sortedItems
      },
      (item) => /* @__PURE__ */ React.createElement(TableRow, { key: item.id }, (columnKey) => /* @__PURE__ */ React.createElement(TableCell, null, cellProcessor ? cellProcessor(item, columnKey) : item[columnKey]))
    )
  );
};
export {
  TableView
};
//# sourceMappingURL=table.js.map