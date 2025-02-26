// src/components/alert.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Alert = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-sm mx-auto sm:mt-6 transition-all duration-500", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: props.title }),
    props.children
  ] });
};
export {
  Alert
};
//# sourceMappingURL=alert.js.map