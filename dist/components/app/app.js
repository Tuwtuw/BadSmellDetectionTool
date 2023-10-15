"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const app_hook_1 = __importDefault(require("./app.hook"));
const styled = __importStar(require("./app.styles"));
function App(props) {
    const { className, style } = props;
    const { Header, Content, Sider } = antd_1.Layout;
    const { items } = (0, app_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsxs)(styled.App, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: [(0, jsx_runtime_1.jsx)(Header, { children: "Header" }, void 0), (0, jsx_runtime_1.jsxs)(antd_1.Layout, Object.assign({ hasSider: true }, { children: [(0, jsx_runtime_1.jsx)(Sider, Object.assign({ collapsible: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Menu, { items: items }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(Content, Object.assign({ className: `content` }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}, void 0) }), void 0)] }), void 0)] }), void 0));
}
exports.default = (0, react_1.memo)(App);
//# sourceMappingURL=app.js.map