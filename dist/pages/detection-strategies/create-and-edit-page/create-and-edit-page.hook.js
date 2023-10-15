"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function useCreateAndEditPageHook(props) {
    const createDetectionStrategy = react_1.default.useCallback((formData) => {
        window.api.database.detectionStrategy.new(formData.name, formData.formula, formData.description);
    }, []);
    const editDetectionStrategy = react_1.default.useCallback((targetId, formData) => {
        window.api.database.detectionStrategy.edit(formData.name, formData.formula, formData.description);
    }, []);
    return {
        createDetectionStrategy,
        editDetectionStrategy,
    };
}
exports.default = useCreateAndEditPageHook;
//# sourceMappingURL=create-and-edit-page.hook.js.map