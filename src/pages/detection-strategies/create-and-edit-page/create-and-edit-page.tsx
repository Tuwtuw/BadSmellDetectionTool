import React, { memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useCreateAndEditPageHook from './create-and-edit-page.hook';
import * as styled from './create-and-edit-page.styles';
import { Form, Input, Space, Button, Cascader, FormInstance, Select, InputNumber } from 'antd';
import { DetectionStrategy } from '../../../logic/types';
import FormulaBuilder from '../../../components/formula-builder';

const { TextArea } = Input;

export interface CreateAndEditPageProps {
  /*
   * Defines component's children
   */
  children?: ReactNode;
  /*
   * Defines custom className
   */
  className?: string;
  /*
   * Defines component's custom style
   */
  style?: React.CSSProperties;
  /*
   * Defines page mode
   */
  mode: 'create' | 'edit';
}

export interface FormTypes {
  name: string;
  formula: string;
  description?: string;
}

const SubmitButton = ({ form, mode }: { form: FormInstance; mode: 'create' | 'edit' }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return mode === 'create' ? (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  ) : (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Edit
    </Button>
  );
};

function CreateAndEditPage(props: CreateAndEditPageProps) {
  const { mode, className, style } = props;
  const location = useLocation();
  const editTarget: DetectionStrategy = location.state?.editTarget;

  const [form] = Form.useForm<FormTypes>();

  const { createDetectionStrategy, editDetectionStrategy, metricsList } = useCreateAndEditPageHook();

  return (
    <styled.CreateAndEditPage className={`${className ?? ''}`.trim()} style={style}>
      <Form
        form={form}
        initialValues={
          mode === 'create'
            ? {}
            : {
                name: editTarget.name,
                formula: editTarget.formula,
                description: editTarget.description ?? '',
              }
        }
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 900 }}
        onFinish={(data) => {
          // mode === 'create'
          //   ? createDetectionStrategy(data)
          //   : editDetectionStrategy(editTarget.detectionStrategy_id, data);
          console.log(data);
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="formula" label="Formula" rules={[{ required: true }]}>
          {/* <Input /> */}
          <FormulaBuilder metricsList={metricsList} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} mode={mode} />
            <Link to="/strategies">
              <Button>Cancel</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </styled.CreateAndEditPage>
  );
}

export default memo(CreateAndEditPage) as unknown as typeof CreateAndEditPage;
