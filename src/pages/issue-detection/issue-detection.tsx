import React, { memo, ReactNode } from 'react';
import { Button, Form, Select, Spin, Steps, Typography, Table } from 'antd';

import useIssueDetectionHook from './issue-detection.hook';
import * as styled from './issue-detection.styles';
import { CodeOutlined, LoadingOutlined } from '@ant-design/icons';
import FileAnalysisDetail from './file-analysis-detail';

export interface IssueDetectionProps {
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

function IssueDetection(props: IssueDetectionProps) {
  const { className, style } = props;

  const [form] = Form.useForm();

  const { Title } = Typography;

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

  const {
    detailsOpen,
    setDetailsOpen,
    fileInAnalysis,
    issuesToAnalyseId,
    columns,
    tableData,
    issuesList,
    currentStep,
    setCurrentStep,
    newClassFile,
    newMethodsFile,
    onSelectChange,
    runIssueAnalysis,
    setAnalysisResult,
    exportAnalysisData,
  } = useIssueDetectionHook(props);

  return !detailsOpen ? (
    <styled.IssueDetection className={`${className ?? ''}`.trim()} style={style}>
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Data Entry',
          },
          {
            title: 'In Progress',
          },
          {
            title: 'Finished',
          },
        ]}
        style={{ marginBottom: '24px' }}
      />
      {currentStep === 0 && (
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 900 }}
          onFinish={(data) => {
            console.log(data);
          }}
        >
          <Form.Item name="ckmetricsclass" label="Ck Class Metrics File" rules={[{ required: true }]}>
            <input
              type="file"
              onChange={(event) => {
                newClassFile(event.target.files[0].path);
              }}
            />
          </Form.Item>
          <Form.Item name="ckmetricsmethod" label="Ck Methods Metrics File" rules={[{ required: true }]}>
            <input
              type="file"
              onChange={(event) => {
                newMethodsFile(event.target.files[0].path);
              }}
            />
          </Form.Item>
          <Form.Item name="issues" label="Issues to analyse" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              showSearch
              optionFilterProp="label"
              options={issuesList}
              onChange={(value) => onSelectChange(value)}
            />
          </Form.Item>
          <Form.Item className="centered">
            <Button
              icon={<CodeOutlined />}
              onClick={() => {
                setCurrentStep(1);
                runIssueAnalysis().then((processingResult) => {
                  setAnalysisResult(processingResult);
                  setCurrentStep(2);
                });
              }}
              disabled={!submittable}
            >
              Run Issue Detection
            </Button>
          </Form.Item>
        </Form>
      )}
      {currentStep === 1 && (
        <div className="centered-loading">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: '72px' }} />}
            tip="Processing"
            size="large"
            className="centered-loading"
          />
        </div>
      )}
      {currentStep >= 2 && (
        <div>
          <div className="header">
            <Title>Analysis Result</Title>
            <Button onClick={exportAnalysisData}>Export Data</Button>
          </div>
          <Table
            dataSource={tableData}
            columns={columns}
            rowKey={(record) => String(record.fileName)}
            bordered
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      )}
    </styled.IssueDetection>
  ) : (
    <FileAnalysisDetail
      fileInAnalysis={fileInAnalysis}
      idOfIssuesInAnalysis={issuesToAnalyseId}
      onReturnClick={() => setDetailsOpen(false)}
    />
  );
}

export default memo(IssueDetection) as unknown as typeof IssueDetection;
