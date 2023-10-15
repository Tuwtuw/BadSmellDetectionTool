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
const detection_strategies_hook_1 = __importDefault(require("./detection-strategies.hook"));
const styled = __importStar(require("./detection-strategies.styles"));
const react_router_dom_1 = require("react-router-dom");
function DetectionStrategies(props) {
    const { className, style } = props;
    const { Title, Text } = antd_1.Typography;
    const { columns, detectionStrategies, deleteDetectionStrategy, deleteModalOpen, setDeleteModalOpen } = (0, detection_strategies_hook_1.default)();
    return ((0, jsx_runtime_1.jsxs)(styled.DetectionStrategies, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "header" }, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "Detection Strategies" }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/strategies/new" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { children: "New Detection Strategy" }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Table, { dataSource: detectionStrategies, columns: columns, rowKey: (record) => String(record.detectionStrategy_id), bordered: true, expandable: {
                    expandedRowRender: (record) => {
                        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Text, Object.assign({ strong: true }, { children: "Description" }), void 0), (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { margin: 0 } }, { children: record.description }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Divider, {}, void 0), (0, jsx_runtime_1.jsx)(Text, Object.assign({ strong: true }, { children: "Formula" }), void 0), (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { margin: 0 } }, { children: record.formula }), void 0)] }, void 0));
                    },
                    rowExpandable: (record) => !!record.description || !!record.formula,
                }, pagination: { position: ['bottomCenter'] } }, void 0), (0, jsx_runtime_1.jsx)(antd_1.Modal, Object.assign({ title: "Are you sure?", open: deleteModalOpen, onCancel: () => setDeleteModalOpen(false), onOk: () => deleteDetectionStrategy() }, { children: (0, jsx_runtime_1.jsx)("p", { children: "This action is irreversible." }, void 0) }), void 0)] }), void 0));
}
exports.default = (0, react_1.memo)(DetectionStrategies);
//# sourceMappingURL=detection-strategies.js.map