"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function useMainMenuHook(props) {
    // Later change to use Sqlite database to store data.
    // Change to useMemo when retrieving from database.
    const dataSourceMock = [
        {
            key: '1',
            date: new Date().toString(),
            issues: 'God Class, Shotgun Surgery',
        },
        {
            key: '2',
            date: new Date().toString(),
            issues: 'Refused Bequest, Shotgun Surgery, Duplicated Code',
        },
    ];
    const columnsMock = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Issues Analyzed',
            dataIndex: 'issues',
            key: 'issues',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (0, jsx_runtime_1.jsx)("a", { children: "Details" }, void 0),
        },
    ];
    return {
        dataSourceMock,
        columnsMock,
    };
}
exports.default = useMainMenuHook;
//# sourceMappingURL=main-menu.hook.js.map