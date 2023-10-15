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
const detection_execution_hook_1 = __importDefault(require("./detection-execution.hook"));
const styled = __importStar(require("./detection-execution.styles"));
function DetectionExecution(props) {
    const { children, className, style } = props;
    const { count, increment, decrement } = (0, detection_execution_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsxs)(styled.DetectionExecution, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Hello from Scaffolding!" }, void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: increment }, { children: "Increment" }), void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: decrement }, { children: "Decrement" }), void 0), children] }), void 0));
}
exports.default = (0, react_1.memo)(DetectionExecution);
//# sourceMappingURL=detection-execution.js.map