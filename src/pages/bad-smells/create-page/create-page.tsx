import React, { memo, ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Col,
} from 'antd';

import useCreatePageHook from './create-page.hook';
import * as styled from './create-page.styles';

export interface CreatePageProps {
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
}

function CreatePage(props: CreatePageProps) {
  const { className, style } = props;

  const { TextArea } = Input;

  const { count } = useCreatePageHook(props);

  return (
    <styled.CreatePage className={`${className ?? ''}`.trim()} style={style}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Detection Strategy">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Scope">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </styled.CreatePage>
  );
}

export default memo(CreatePage) as unknown as typeof CreatePage;
