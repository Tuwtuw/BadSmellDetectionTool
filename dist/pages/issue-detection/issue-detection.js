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
const antd_1 = require("antd");
const issue_detection_hook_1 = __importDefault(require("./issue-detection.hook"));
const styled = __importStar(require("./issue-detection.styles"));
function IssueDetection(props) {
    const { Option } = antd_1.Select;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const prefixSelector = ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ name: "prefix", noStyle: true }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Select, Object.assign({ style: { width: 70 } }, { children: [(0, jsx_runtime_1.jsx)(Option, Object.assign({ value: "86" }, { children: "+86" }), void 0), (0, jsx_runtime_1.jsx)(Option, Object.assign({ value: "87" }, { children: "+87" }), void 0)] }), void 0) }), void 0));
    const suffixSelector = ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, Object.assign({ name: "suffix", noStyle: true }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Select, Object.assign({ style: { width: 70 } }, { children: [(0, jsx_runtime_1.jsx)(Option, Object.assign({ value: "USD" }, { children: "$" }), void 0), (0, jsx_runtime_1.jsx)(Option, Object.assign({ value: "CNY" }, { children: "\u00A5" }), void 0)] }), void 0) }), void 0));
    const [autoCompleteResult, setAutoCompleteResult] = (0, react_1.useState)([]);
    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        }
        else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    const [form] = antd_1.Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const { children, className, style } = props;
    const { count, increment, decrement } = (0, issue_detection_hook_1.default)(props);
    return ((0, jsx_runtime_1.jsx)(styled.IssueDetection, Object.assign({ className: `${className !== null && className !== void 0 ? className : ''}`.trim(), style: style }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, Object.assign({}, formItemLayout, { form: form, name: "register", onFinish: onFinish, initialValues: { residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }, style: { maxWidth: 600 }, scrollToFirstError: true }), void 0) }), void 0));
}
exports.default = (0, react_1.memo)(IssueDetection);
//# sourceMappingURL=issue-detection.js.map