"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const icons_1 = require("@ant-design/icons");
function useAppHook(props) {
    const getItem = (label, key, icon, children) => {
        return {
            key,
            icon,
            children,
            label,
        };
    };
    const items = react_1.default.useMemo(() => [
        getItem((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: "Home" }), void 0), 'home', (0, jsx_runtime_1.jsx)(icons_1.HomeOutlined, {}, void 0)),
        getItem((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/metrics" }, { children: "Metrics" }), void 0), 'metrics', (0, jsx_runtime_1.jsx)(icons_1.LineChartOutlined, {}, void 0)),
        getItem((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/strategies" }, { children: "Detection Strategies" }), void 0), 'strategies', (0, jsx_runtime_1.jsx)(icons_1.AimOutlined, {}, void 0)),
        getItem((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/badsmells" }, { children: "Bad Smells" }), void 0), 'badsmells', (0, jsx_runtime_1.jsx)(icons_1.BugOutlined, {}, void 0)),
        getItem((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detect" }, { children: "Run Issue Detection" }), void 0), 'issuedetection', (0, jsx_runtime_1.jsx)(icons_1.CodeOutlined, {}, void 0)),
    ], [getItem]);
    return {
        items,
    };
}
exports.default = useAppHook;
//# sourceMappingURL=app.hook.js.map