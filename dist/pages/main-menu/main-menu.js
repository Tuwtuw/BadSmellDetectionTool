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
const icons_1 = require("@ant-design/icons");
const main_menu_hook_1 = __importDefault(require("./main-menu.hook"));
const styled = __importStar(require("./main-menu.styles"));
const react_router_dom_1 = require("react-router-dom");
function MainMenu(props) {
    const { className, style } = props;
    const { Title } = antd_1.Typography;
    const { dataSourceMock, columnsMock } = (0, main_menu_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsxs)(styled.MainMenu, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "content-centered" }, { children: (0, jsx_runtime_1.jsx)(Title, { children: "Latest Issue Detections" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: dataSourceMock, columns: columnsMock }, void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "content-centered" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detect" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, Object.assign({ icon: (0, jsx_runtime_1.jsx)(icons_1.CodeOutlined, {}, void 0), className: 'button' }, { children: "Run Issue Detection" }), void 0) }), void 0) }), void 0)] }), void 0));
}
exports.default = (0, react_1.memo)(MainMenu);
//# sourceMappingURL=main-menu.js.map