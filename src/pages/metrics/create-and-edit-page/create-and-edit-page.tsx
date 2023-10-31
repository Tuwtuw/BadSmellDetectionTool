import React, { memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useCreateAndEditPageHook from './create-and-edit-page.hook';
import * as styled from './create-and-edit-page.styles';
import { Form, Input, Space, Button, FormInstance, Select, Tooltip } from 'antd';
import { Metric } from '../../../logic/types';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
  type: string;
  metric_input_id: string;
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
  const editTarget: Metric = location.state?.editTarget;

  const [form] = Form.useForm<FormTypes>();

  const { createMetric, editMetric } = useCreateAndEditPageHook();

  return (
    <styled.CreateAndEditPage className={`${className ?? ''}`.trim()} style={style}>
      <Form
        form={form}
        initialValues={
          mode === 'create'
            ? {}
            : {
                name: editTarget.name,
                type: editTarget.type,
                metric_input_id: editTarget.metric_input_id,
                description: editTarget.description ?? '',
              }
        }
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={(data) => {
          mode === 'create' ? createMetric(data) : editMetric(editTarget.metric_id, data);
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="integer">Integer</Select.Option>
            <Select.Option value="float">Float</Select.Option>
            <Select.Option value="boolean">Boolean</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="metric_input_id"
          label={
            <span>
              Metric ID{' '}
              <Tooltip
                title='ID which will be used to match the input file columns to the respective metrics. 
              *UNIQUE* Eg: the column "loc" on the input file will be associated to the metric with metric ID "loc".'
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} mode={mode} />
            <Link to="/metrics">
              <Button>Cancel</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </styled.CreateAndEditPage>
  );
}

export default memo(CreateAndEditPage) as unknown as typeof CreateAndEditPage;
