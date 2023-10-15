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
function useMetricsHook(props) {
    const [editModalOpen, setEditModalOpen] = react_1.default.useState(false);
    const [metricToDeleteId, setMetricToDeleteId] = react_1.default.useState(undefined);
    const [metrics, setMetrics] = react_1.default.useState(undefined);
    const [deleteModalOpen, setDeleteModalOpen] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        window.api.database.metric.fetchAll().then((data) => {
            setMetrics(data);
        }, (error) => {
            console.error(error);
        });
    }, []);
    const deleteMetric = (0, react_1.useCallback)(() => {
        window.api.database.detectionStrategy.delete(metricToDeleteId);
        setMetrics(metrics.filter((metric) => metric.metric_id !== metricToDeleteId));
        setMetricToDeleteId(undefined);
        setDeleteModalOpen(false);
    }, [metricToDeleteId]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (0, jsx_runtime_1.jsx)("a", { children: text }, void 0),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Restrictions',
            key: 'restrictions',
            render: (_, record) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: record.min != null || record.max != null
                    ? `${record.min != null ? `${record.min} < ` : ''} ${record.name} ${record.max != null ? ` < ${record.max}` : ''}`
                    : undefined }, void 0)),
            filters: [
                {
                    text: 'Has Restrictions',
                    value: true,
                },
                {
                    text: 'No Restrictions',
                    value: false,
                },
            ],
            onFilter: (value, record) => (record.min != null || record.max != null) === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => ((0, jsx_runtime_1.jsxs)(antd_1.Space, Object.assign({ size: "middle" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: () => setEditModalOpen(!editModalOpen) }, { children: "Edit" }), void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: () => {
                            setMetricToDeleteId(record.metric_id);
                            setDeleteModalOpen(true);
                        } }, { children: "Delete" }), void 0)] }), void 0)),
        },
    ];
    return {
        columns,
        metrics,
        editModalOpen,
        deleteModalOpen,
        setEditModalOpen,
        setDeleteModalOpen,
        deleteMetric,
    };
}
exports.default = useMetricsHook;
//# sourceMappingURL=metrics.hook.js.map