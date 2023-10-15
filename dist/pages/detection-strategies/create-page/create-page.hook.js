"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function useCreatePageHook(props) {
    const createDetectionStrategy = react_1.default.useCallback((formData) => {
        window.api.database.detectionStrategy.new(formData.name, formData.formula, formData.description);
    }, []);
    return {
        createDetectionStrategy,
    };
}
exports.default = useCreatePageHook;
//# sourceMappingURL=create-page.hook.js.map