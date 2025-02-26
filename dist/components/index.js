// src/components/alert.tsx
function Alert(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6 max-w-sm mx-auto sm:mt-6 transition-all duration-500" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-semibold" }, props.title), props.children);
}

// src/components/sidebar.tsx
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
var SidebarItem = ({
  name,
  icon,
  href
}) => {
  const pathname = usePathname();
  const getDynamicColor = (path) => pathname === path ? "primary" : "default";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      startContent: icon,
      className: "justify-start hidden lg:flex",
      as: Link,
      href,
      color: getDynamicColor(href)
    },
    name
  ), /* @__PURE__ */ React.createElement(Tooltip, { content: name, placement: "right" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      isIconOnly: true,
      className: "lg:hidden",
      as: Link,
      href,
      color: getDynamicColor(href)
    },
    icon
  )));
};
var Sidebar = ({ children }) => {
  return /* @__PURE__ */ React.createElement("div", { className: "p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all" }, children);
};

// src/components/table.tsx
import {
  Button as Button2,
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
import React2 from "react";
var TableView = ({
  data,
  columns,
  emptyContent,
  label,
  onAdd,
  cellProcessor
}) => {
  const [searchQuery, setSearchQuery] = React2.useState("");
  const [selectedKeys, setSelectedKeys] = React2.useState(
    /* @__PURE__ */ new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React2.useState(
    new Set(columns.map((col) => col.uid))
  );
  const [rowsPerPage, setRowsPerPage] = React2.useState(5);
  const [sortDescriptor, setSortDescriptor] = React2.useState({
    column: columns[0].uid,
    direction: "ascending"
  });
  const [page, setPage] = React2.useState(1);
  const pages = Math.ceil(data.length / rowsPerPage);
  const headerColumns = React2.useMemo(() => {
    return visibleColumns === "all" ? columns : columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns]);
  const items = React2.useMemo(() => {
    const pageStartIdx = (page - 1) * rowsPerPage;
    return data.filter(
      (item) => !searchQuery || item[columns[0].uid].toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(pageStartIdx, pageStartIdx + rowsPerPage);
  }, [page, searchQuery, rowsPerPage]);
  const sortedItems = React2.useMemo(
    () => [...items].sort((a, b) => {
      const [first, second] = [
        a[sortDescriptor.column],
        b[sortDescriptor.column]
      ];
      return (first < second ? -1 : first > second ? 1 : 0) * (sortDescriptor.direction === "descending" ? -1 : 1);
    }),
    [sortDescriptor, items]
  );
  const topContent = React2.useMemo(() => {
    return /* @__PURE__ */ React2.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React2.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React2.createElement("h1", { className: "text-2xl font-bold" }, label, "s"), /* @__PURE__ */ React2.createElement(
      Chip,
      {
        size: "sm",
        className: "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
      },
      data.length
    )), /* @__PURE__ */ React2.createElement(
      Button2,
      {
        color: "primary",
        endContent: /* @__PURE__ */ React2.createElement(PlusCircle, { weight: "fill", size: 18 }),
        onPress: onAdd
      },
      "Add ",
      label
    )), /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between gap-3" }, /* @__PURE__ */ React2.createElement(
      Input,
      {
        isClearable: true,
        placeholder: `Search by ${columns[0].name.toLowerCase()}...`,
        size: "sm",
        startContent: /* @__PURE__ */ React2.createElement(MagnifyingGlass, { className: "text-default-300" }),
        value: searchQuery,
        onClear: () => setSearchQuery(""),
        onValueChange: (value) => {
          if (value) {
            setSearchQuery(value);
            setPage(1);
          } else setSearchQuery("");
        }
      }
    ), /* @__PURE__ */ React2.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React2.createElement(Dropdown, null, /* @__PURE__ */ React2.createElement(DropdownTrigger, null, /* @__PURE__ */ React2.createElement(
      Button2,
      {
        endContent: /* @__PURE__ */ React2.createElement(CaretDown, { className: "text-small" }),
        size: "sm",
        variant: "flat"
      },
      "Columns"
    )), /* @__PURE__ */ React2.createElement(
      DropdownMenu,
      {
        disallowEmptySelection: true,
        "aria-label": "Table Columns",
        closeOnSelect: false,
        selectedKeys: visibleColumns,
        selectionMode: "multiple",
        onSelectionChange: setVisibleColumns
      },
      columns.map((column) => /* @__PURE__ */ React2.createElement(DropdownItem, { key: column.uid, className: "capitalize" }, column.name))
    )))), /* @__PURE__ */ React2.createElement("label", { className: "flex items-center text-default-400 text-small" }, "Rows per page:", /* @__PURE__ */ React2.createElement(
      "select",
      {
        className: "bg-transparent outline-none text-default-400 text-small",
        onChange: (e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(1);
        }
      },
      /* @__PURE__ */ React2.createElement("option", { value: "5" }, "5"),
      /* @__PURE__ */ React2.createElement("option", { value: "10" }, "10"),
      /* @__PURE__ */ React2.createElement("option", { value: "15" }, "15")
    ))));
  }, [searchQuery, visibleColumns, data.length]);
  const bottomContent = React2.useMemo(() => {
    return /* @__PURE__ */ React2.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React2.createElement(
      Pagination,
      {
        showControls: true,
        isCompact: true,
        isDisabled: !!searchQuery,
        page,
        total: pages,
        onChange: setPage
      }
    ), /* @__PURE__ */ React2.createElement("span", { className: "text-small text-default-400" }, selectedKeys === "all" ? "All items selected" : `${selectedKeys.size} of ${items.length} selected`));
  }, [selectedKeys, items.length, page, pages, searchQuery]);
  return /* @__PURE__ */ React2.createElement(
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
    /* @__PURE__ */ React2.createElement(TableHeader, { columns: headerColumns }, (column) => /* @__PURE__ */ React2.createElement(
      TableColumn,
      {
        key: column.uid,
        align: column.uid === "actions" ? "center" : "start",
        allowsSorting: column.sortable
      },
      column.name
    )),
    /* @__PURE__ */ React2.createElement(
      TableBody,
      {
        emptyContent: emptyContent || "No data found.",
        items: sortedItems
      },
      (item) => /* @__PURE__ */ React2.createElement(TableRow, { key: item.id }, (columnKey) => /* @__PURE__ */ React2.createElement(TableCell, null, cellProcessor ? cellProcessor(item, columnKey) : item[columnKey]))
    )
  );
};

// src/components/theme-switch.tsx
import { useSwitch } from "@heroui/react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

// node_modules/@react-aria/ssr/dist/SSRProvider.mjs
import $670gB$react, { useContext as $670gB$useContext, useState as $670gB$useState, useMemo as $670gB$useMemo, useLayoutEffect as $670gB$useLayoutEffect, useRef as $670gB$useRef } from "react";
var $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0
};
var $b5e257d569688ac6$var$SSRContext = /* @__PURE__ */ (0, $670gB$react).createContext($b5e257d569688ac6$var$defaultContext);
var $b5e257d569688ac6$var$IsSSRContext = /* @__PURE__ */ (0, $670gB$react).createContext(false);
var $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
  let ctx = (0, $670gB$useContext)($b5e257d569688ac6$var$SSRContext);
  let ref = (0, $670gB$useRef)(null);
  if (ref.current === null && !isDisabled) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, $670gB$react).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    ref.current = ++ctx.current;
  }
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = (0, $670gB$useContext)($b5e257d569688ac6$var$SSRContext);
  if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM) console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix = ctx === $b5e257d569688ac6$var$defaultContext && process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  let id = (0, $670gB$react).useId();
  let [didSSR] = (0, $670gB$useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
  let prefix = didSSR || process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
var $b5e257d569688ac6$export$619500959fc48b26 = typeof (0, $670gB$react)["useId"] === "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  return () => {
  };
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  if (typeof (0, $670gB$react)["useSyncExternalStore"] === "function") return (0, $670gB$react)["useSyncExternalStore"]($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
  return (0, $670gB$useContext)($b5e257d569688ac6$var$IsSSRContext);
}

// node_modules/@react-aria/utils/dist/useLayoutEffect.mjs
import $HgANd$react from "react";
var $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document !== "undefined" ? (0, $HgANd$react).useLayoutEffect : () => {
};

// node_modules/@react-aria/utils/dist/useEffectEvent.mjs
import { useRef as $lmaYr$useRef, useCallback as $lmaYr$useCallback } from "react";
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = (0, $lmaYr$useRef)(null);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    ref.current = fn;
  }, [
    fn
  ]);
  return (0, $lmaYr$useCallback)((...args) => {
    const f = ref.current;
    return f === null || f === void 0 ? void 0 : f(...args);
  }, []);
}

// node_modules/@react-aria/utils/dist/useId.mjs
import { useState as $eKkEp$useState, useRef as $eKkEp$useRef, useCallback as $eKkEp$useCallback, useEffect as $eKkEp$useEffect } from "react";
var $bdb11010cef70236$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $bdb11010cef70236$var$idsUpdaterMap = /* @__PURE__ */ new Map();
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB) return idA;
  let setIdsA = $bdb11010cef70236$var$idsUpdaterMap.get(idA);
  if (setIdsA) {
    setIdsA.forEach((fn) => fn(idB));
    return idB;
  }
  let setIdsB = $bdb11010cef70236$var$idsUpdaterMap.get(idB);
  if (setIdsB) {
    setIdsB.forEach((fn) => fn(idA));
    return idA;
  }
  return idB;
}

// node_modules/@react-aria/utils/dist/chain.mjs
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) if (typeof callback === "function") callback(...args);
  };
}

// node_modules/@react-aria/utils/dist/mergeProps.mjs
import $7jXr9$clsx from "clsx";
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  let result = {
    ...args[0]
  };
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    for (let key in props) {
      let a = result[key];
      let b = props[key];
      if (typeof a === "function" && typeof b === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90) result[key] = (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(a, b);
      else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") result[key] = (0, $7jXr9$clsx)(a, b);
      else if (key === "id" && a && b) result.id = (0, $bdb11010cef70236$export$cd8c9cb68f842629)(a, b);
      else result[key] = b !== void 0 ? b : a;
    }
  }
  return result;
}

// node_modules/@react-aria/visually-hidden/dist/VisuallyHidden.mjs
import $7JYt2$react, { useState as $7JYt2$useState, useMemo as $7JYt2$useMemo } from "react";

// node_modules/@react-aria/interactions/dist/utils.mjs
import { useRef as $6dfIe$useRef, useCallback as $6dfIe$useCallback } from "react";
var $8a9cb279dc87e130$export$905e7fc544a71f36 = class {
  isDefaultPrevented() {
    return this.nativeEvent.defaultPrevented;
  }
  preventDefault() {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }
  stopPropagation() {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }
  isPropagationStopped() {
    return false;
  }
  persist() {
  }
  constructor(type, nativeEvent) {
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target;
    this.currentTarget = nativeEvent.currentTarget;
    this.relatedTarget = nativeEvent.relatedTarget;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
  }
};
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = (0, $6dfIe$useRef)({
    isFocused: false,
    observer: null
  });
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  let dispatchBlur = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e) => {
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  });
  return (0, $6dfIe$useCallback)((e) => {
    if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
      stateRef.current.isFocused = true;
      let target = e.target;
      let onBlurHandler = (e2) => {
        stateRef.current.isFocused = false;
        if (target.disabled)
          dispatchBlur(new $8a9cb279dc87e130$export$905e7fc544a71f36("blur", e2));
        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect();
          stateRef.current.observer = null;
        }
      };
      target.addEventListener("focusout", onBlurHandler, {
        once: true
      });
      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          var _stateRef_current_observer;
          (_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 ? void 0 : _stateRef_current_observer.disconnect();
          let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
          target.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: relatedTargetEl
          }));
          target.dispatchEvent(new FocusEvent("focusout", {
            bubbles: true,
            relatedTarget: relatedTargetEl
          }));
        }
      });
      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    dispatchBlur
  ]);
}

// node_modules/@react-aria/interactions/dist/useFocusWithin.mjs
import { useRef as $3b9Q0$useRef, useCallback as $3b9Q0$useCallback } from "react";
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
  let state = (0, $3b9Q0$useRef)({
    isFocusWithin: false
  });
  let onBlur = (0, $3b9Q0$useCallback)((e) => {
    if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
      state.current.isFocusWithin = false;
      if (onBlurWithin) onBlurWithin(e);
      if (onFocusWithinChange) onFocusWithinChange(false);
    }
  }, [
    onBlurWithin,
    onFocusWithinChange,
    state
  ]);
  let onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  let onFocus = (0, $3b9Q0$useCallback)((e) => {
    if (!state.current.isFocusWithin && document.activeElement === e.target) {
      if (onFocusWithin) onFocusWithin(e);
      if (onFocusWithinChange) onFocusWithinChange(true);
      state.current.isFocusWithin = true;
      onSyntheticFocus(e);
    }
  }, [
    onFocusWithin,
    onFocusWithinChange,
    onSyntheticFocus
  ]);
  if (isDisabled) return {
    focusWithinProps: {
      // These should not have been null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  };
  return {
    focusWithinProps: {
      onFocus,
      onBlur
    }
  };
}

// node_modules/@react-aria/visually-hidden/dist/VisuallyHidden.mjs
var $5c3e21d68f1c4674$var$styles = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap"
};
function $5c3e21d68f1c4674$export$a966af930f325cab(props = {}) {
  let { style, isFocusable } = props;
  let [isFocused, setFocused] = (0, $7JYt2$useState)(false);
  let { focusWithinProps } = (0, $9ab94262bd0047c7$export$420e68273165f4ec)({
    isDisabled: !isFocusable,
    onFocusWithinChange: (val) => setFocused(val)
  });
  let combinedStyles = (0, $7JYt2$useMemo)(() => {
    if (isFocused) return style;
    else if (style) return {
      ...$5c3e21d68f1c4674$var$styles,
      ...style
    };
    else return $5c3e21d68f1c4674$var$styles;
  }, [
    isFocused
  ]);
  return {
    visuallyHiddenProps: {
      ...focusWithinProps,
      style: combinedStyles
    }
  };
}
function $5c3e21d68f1c4674$export$439d29a4e110a164(props) {
  let { children, elementType: Element = "div", isFocusable, style, ...otherProps } = props;
  let { visuallyHiddenProps } = $5c3e21d68f1c4674$export$a966af930f325cab(props);
  return /* @__PURE__ */ (0, $7JYt2$react).createElement(Element, (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(otherProps, visuallyHiddenProps), children);
}

// src/components/theme-switch.tsx
import clsx from "clsx";
import { useTheme } from "next-themes";
var ThemeSwitch = ({
  className,
  classNames
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  const onChange = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange
  });
  return /* @__PURE__ */ React.createElement(
    Component,
    {
      ...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        )
      })
    },
    /* @__PURE__ */ React.createElement($5c3e21d68f1c4674$export$439d29a4e110a164, null, /* @__PURE__ */ React.createElement("input", { ...getInputProps() })),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        ...getWrapperProps(),
        className: slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0"
            ],
            classNames?.wrapper
          )
        })
      },
      !isSelected || isSSR ? /* @__PURE__ */ React.createElement(Sun, { size: 22 }) : /* @__PURE__ */ React.createElement(Moon, { size: 22 })
    )
  );
};
export {
  Alert,
  Sidebar,
  SidebarItem,
  TableView,
  ThemeSwitch
};
//# sourceMappingURL=index.js.map