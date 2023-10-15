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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const create_and_edit_page_hook_1 = __importDefault(require("./create-and-edit-page.hook"));
const styled = __importStar(require("./create-and-edit-page.styles"));
const antd_1 = require("antd");
const { TextArea } = antd_1.Input;
const SubmitButton = ({ form, mode }) => {
    const [submittable, setSubmittable] = react_1.default.useState(false);
    // Watch all values
    const values = antd_1.Form.useWatch([], form);
    react_1.default.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(() => {
            setSubmittable(true);
        }, () => {
            setSubmittable(false);
        });
    }, [values]);
    return mode === 'create' ? ((0, jsx_runtime_1.jsx)(antd_1.Button, Object.assign({ type: "primary", htmlType: "submit", disabled: !submittable }, { children: "Submit" }), void 0)) : ((0, jsx_runtime_1.jsx)(antd_1.Button, Object.assign({ type: "primary", htmlType: "submit", disabled: !submittable }, { children: "Edit" }), void 0));
};
function CreateAndEditPage(props) {
    var _a, _b;
    const { mode, className, style } = props;
    const location = (0, react_router_dom_1.useLocation)();
    const editTarget = (_a = location.state) === null || _a === void 0 ? void 0 : _a.editTarget;
    // const { editTarget }: { editTarget: DetectionStrategy } = location.state;
    console.log(editTarget);
    const [form] = antd_1.Form.useForm();
    const { createDetectionStrategy, editDetectionStrategy } = (0, create_and_edit_page_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsx)(styled.CreateAndEditPage, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, Object.assign({ form: form, initialValues: mode === 'create'
                ? {}
                : {
                    name: editTarget.name,
                    formula: editTarget.formula,
                    description: (_b = editTarget.description) !== null && _b !== void 0 ? _b : '',
                }, labelCol: { span: 4 }, wrapperCol: { span: 14 }, layout: "horizontal", style: { maxWidth: 600 }, onFinish: (data) => {
                mode === 'create'
                    ? createDetectionStrategy(data)
                    : editDetectionStrategy(editTarget.detectionStrategy_id, data);
            } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ name: "name", label: "Name", rules: [{ required: true }] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ name: "formula", label: "Formula", rules: [{ required: true }] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ name: "description", label: "Description" }, { children: (0, jsx_runtime_1.jsx)(TextArea, { rows: 4 }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(SubmitButton, { form: form, mode: mode }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/strategies" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { children: "Cancel" }, void 0) }), void 0)] }, void 0) }, void 0)] }), void 0) }), void 0));
}
exports.default = (0, react_1.memo)(CreateAndEditPage);
//# sourceMappingURL=create-and-edit-page.js.map