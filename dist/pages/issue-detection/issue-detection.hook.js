"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function useIssueDetectionHook(props) {
    const [count, setCount] = react_1.default.useState(0);
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        setCount(count - 1);
    };
    return {
        count,
        increment,
        decrement,
    };
}
exports.default = useIssueDetectionHook;
//# sourceMappingURL=issue-detection.hook.js.map