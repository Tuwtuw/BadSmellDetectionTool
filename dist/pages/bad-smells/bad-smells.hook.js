"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
function useBadSmellsHook(props) {
    const [editModalOpen, setEditModalOpen] = react_1.default.useState(false);
    const [badSmellToDeleteId, setBadSmellToDeleteId] = react_1.default.useState(undefined);
    const [badSmells, setBadSmells] = react_1.default.useState(undefined);
    const [deleteModalOpen, setDeleteModalOpen] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        window.api.database.badSmell.fetchAll().then((data) => {
            setBadSmells(data);
        }, (error) => {
            console.error(error);
        });
    }, []);
    const deleteBadSmell = react_1.default.useCallback(() => {
        window.api.database.badSmell.delete(badSmellToDeleteId);
        setBadSmells(badSmells.filter((badSmell) => badSmell.badSmell_id !== badSmellToDeleteId));
        setBadSmellToDeleteId(undefined);
        setDeleteModalOpen(false);
    }, [badSmellToDeleteId]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (0, jsx_runtime_1.jsx)("a", { children: text }, void 0),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Current Detection Strategy',
            key: 'detectStrat',
            render: (_, record) => { var _a; return (_a = record.detectionStrategy) === null || _a === void 0 ? void 0 : _a.name; },
        },
        {
            title: 'Scope',
            key: 'scope',
            dataIndex: 'scope',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => ((0, jsx_runtime_1.jsxs)(antd_1.Space, Object.assign({ size: "middle" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: () => setEditModalOpen(!editModalOpen) }, { children: "Edit" }), void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: () => {
                            setBadSmellToDeleteId(record.badSmell_id);
                            setDeleteModalOpen(!deleteModalOpen);
                        } }, { children: "Delete" }), void 0)] }), void 0)),
        },
    ];
    return {
        columns,
        editModalOpen,
        deleteModalOpen,
        setEditModalOpen,
        setDeleteModalOpen,
        deleteBadSmell,
    };
}
exports.default = useBadSmellsHook;
//# sourceMappingURL=bad-smells.hook.js.map