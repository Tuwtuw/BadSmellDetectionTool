"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const app_1 = require("./components/app");
const pages_1 = require("./pages");
const detection_strategies_1 = require("./pages/detection-strategies");
exports.routes = [
    {
        path: '/',
        element: (0, jsx_runtime_1.jsx)(app_1.App, {}, void 0),
        errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
        children: [
            {
                path: '/',
                element: (0, jsx_runtime_1.jsx)(pages_1.MainMenu, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/metrics',
                element: (0, jsx_runtime_1.jsx)(pages_1.Metrics, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/strategies',
                element: (0, jsx_runtime_1.jsx)(pages_1.DetectionStrategies, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/strategies/new',
                element: (0, jsx_runtime_1.jsx)(detection_strategies_1.CreateAndEditPage, { mode: "create" }, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/strategies/edit',
                element: (0, jsx_runtime_1.jsx)(detection_strategies_1.CreateAndEditPage, { mode: "edit" }, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/badsmells',
                element: (0, jsx_runtime_1.jsx)(pages_1.BadSmells, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/badsmells/new',
                element: (0, jsx_runtime_1.jsx)(pages_1.BadSmellsCreatePage, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/badsmells/edit',
                element: (0, jsx_runtime_1.jsx)(pages_1.BadSmellsCreatePage, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
            {
                path: '/detect',
                element: (0, jsx_runtime_1.jsx)(pages_1.IssueDetection, {}, void 0),
                errorElement: (0, jsx_runtime_1.jsx)(pages_1.ErrorPage, {}, void 0),
            },
        ],
    },
];
//# sourceMappingURL=routes.js.map