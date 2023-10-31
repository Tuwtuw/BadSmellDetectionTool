import React, { memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useCreateAndEditPageHook from './create-and-edit-page.hook';
import * as styled from './create-and-edit-page.styles';
import { Form, Input, Space, Button, FormInstance, Select } from 'antd';
import { BadSmell, DetectionStrategy } from '../../../logic/types';

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
  scope: string;
  detectionStrategy: number;
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
  const [detectionStrategies, setDetectionStrategies] = React.useState<undefined | DetectionStrategy[]>(undefined);
  const location = useLocation();
  const editTarget: BadSmell = location.state?.editTarget;

  React.useEffect(() => {
    window.api.database.detectionStrategy.fetchAll().then(
      (data) => {
        setDetectionStrategies(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const [form] = Form.useForm<FormTypes>();

  const { createBadSmell, editBadSmell } = useCreateAndEditPageHook();

  return (
    <styled.CreateAndEditPage className={`${className ?? ''}`.trim()} style={style}>
      <Form
        form={form}
        initialValues={
          mode === 'create'
            ? {}
            : {
                name: editTarget.name,
                scope: editTarget.scope,
                detectionStrategy: editTarget.detectionStrategy.detectionStrategy_id,
                description: editTarget.description ?? '',
              }
        }
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={(data) => {
          mode === 'create' ? createBadSmell(data) : editBadSmell(editTarget.badSmell_id, data);
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="scope" label="Scope" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="method">Method</Select.Option>
            <Select.Option value="class">Class</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="detectionStrategy" label="Detection Strategy" rules={[{ required: true }]}>
          <Select>
            {detectionStrategies?.map((detectionStrategy) => (
              <Select.Option value={detectionStrategy.detectionStrategy_id}>{detectionStrategy.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} mode={mode} />
            <Link to="/badsmells">
              <Button>Cancel</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </styled.CreateAndEditPage>
  );
}

export default memo(CreateAndEditPage) as unknown as typeof CreateAndEditPage;
