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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
function useDetectionStrategiesHook() {
    const [editModalOpen, setEditModalOpen] = react_1.default.useState(false);
    const [detectionStrategyToDeleteId, setDetectionStrategyToDeleteId] = react_1.default.useState(undefined);
    const [detectionStrategies, setDetectionStrategies] = react_1.default.useState(undefined);
    const [deleteModalOpen, setDeleteModalOpen] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        window.api.database.detectionStrategy.fetchAll().then((data) => {
            setDetectionStrategies(data);
        }, (error) => {
            console.error(error);
        });
    }, []);
    const deleteDetectionStrategy = (0, react_1.useCallback)(() => {
        window.api.database.detectionStrategy.delete(detectionStrategyToDeleteId);
        setDetectionStrategies(detectionStrategies.filter((strategy) => strategy.detectionStrategy_id !== detectionStrategyToDeleteId));
        setDetectionStrategyToDeleteId(undefined);
        setDeleteModalOpen(false);
    }, [detectionStrategyToDeleteId]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (0, jsx_runtime_1.jsx)("a", { children: text }, void 0),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => ((0, jsx_runtime_1.jsxs)(antd_1.Space, Object.assign({ size: "middle" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/strategies/edit", state: { editTarget: record } }, { children: "Edit" }), void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: () => {
                            setDetectionStrategyToDeleteId(record.detectionStrategy_id);
                            setDeleteModalOpen(true);
                        } }, { children: "Delete" }), void 0)] }), void 0)),
        },
    ];
    return {
        columns,
        detectionStrategies,
        deleteDetectionStrategy,
        editModalOpen,
        setEditModalOpen,
        deleteModalOpen,
        setDeleteModalOpen,
    };
}
exports.default = useDetectionStrategiesHook;
//# sourceMappingURL=detection-strategies.hook.js.map