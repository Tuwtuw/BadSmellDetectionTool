"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const routes_1 = require("./routes");
const react_router_dom_1 = require("react-router-dom");
const router = (0, react_router_dom_1.createHashRouter)(routes_1.routes);
const container = document.getElementById('root');
const root = (0, client_1.createRoot)(container);
function render() {
    root.render((0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: router }, void 0));
}
render();
//# sourceMappingURL=app.js.map