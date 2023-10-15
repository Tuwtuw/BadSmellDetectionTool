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
const create_page_hook_1 = __importDefault(require("./create-page.hook"));
const styled = __importStar(require("./create-page.styles"));
function CreatePage(props) {
    const { className, style } = props;
    const { TextArea } = antd_1.Input;
    const { count } = (0, create_page_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsx)(styled.CreatePage, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, Object.assign({ labelCol: { span: 6 }, wrapperCol: { span: 14 }, layout: "horizontal", style: { maxWidth: 600 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ label: "Name" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ label: "Detection Strategy" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { children: (0, jsx_runtime_1.jsx)(antd_1.Select.Option, Object.assign({ value: "demo" }, { children: "Demo" }), void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ label: "Scope" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { children: (0, jsx_runtime_1.jsx)(antd_1.Select.Option, Object.assign({ value: "demo" }, { children: "Demo" }), void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ label: "Description" }, { children: (0, jsx_runtime_1.jsx)(TextArea, { rows: 4 }, void 0) }), void 0)] }), void 0) }), void 0));
}
exports.default = (0, react_1.memo)(CreatePage);
//# sourceMappingURL=create-page.js.map