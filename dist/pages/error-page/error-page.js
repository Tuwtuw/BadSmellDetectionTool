"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function ErrorPage() {
    var _a;
    const error = (0, react_router_dom_1.useRouteError)();
    let errorMessage;
    if ((0, react_router_dom_1.isRouteErrorResponse)(error)) {
        // error is type `ErrorResponse`
        errorMessage = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || error.statusText;
    }
    else if (error instanceof Error) {
        errorMessage = error.message;
    }
    else if (typeof error === 'string') {
        errorMessage = error;
    }
    else {
        console.error(error);
        errorMessage = 'Unknown error';
    }
    console.error(errorMessage);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "error-page" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Oops!" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "Sorry, an unexpected error has occurred." }, void 0), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("i", { children: errorMessage }, void 0) }, void 0)] }), void 0));
}
exports.default = (0, react_1.memo)(ErrorPage);
//# sourceMappingURL=error-page.js.map