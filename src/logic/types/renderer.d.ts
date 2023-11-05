import { expression, operator } from '../../components/formula-builder';
import { BadSmell, DetectionStrategy, Metric, MetricsFile } from '.';

export interface IAPI {
  database: {
    metric: {
      fetchAll: () => Promise<Metric[]>;
      new: (name: string, type: string, metric_input_id: string, description?: string) => Promise<Metric>;
      edit: (
        metricId: number,
        name: string,
        type: string,
        metric_input_id: string,
        description?: string,
      ) => Promise<Metric>;
      delete: (metricId: number) => Promise<boolean>;
    };
    detectionStrategy: {
      fetchAll: () => Promise<DetectionStrategy[]>;
      new: (name: string, formula: (expression | operator)[], description?: string) => Promise<DetectionStrategy>;
      edit: (
        detectionStrategyId: number,
        name: string,
        formula: (expression | operator)[],
        description?: string,
      ) => Promise<DetectionStrategy>;
      delete: (detectionStrategyId: number) => Promise<boolean>;
    };
    badSmell: {
      fetchAll: () => Promise<BadSmell[]>;
      fetchFromId: (badSmellIds: number[]) => Promise<BadSmell[]>;
      new: (name: string, scope: string, detectionStrategyId: number, description?: string) => Promise<BadSmell>;
      edit: (
        badSmellId: number,
        name: string,
        scope: string,
        detectionStrategyId: number,
        description?: string,
      ) => Promise<BadSmell>;
      delete: (badSmellId: number) => Promise<boolean>;
    };
  };
  analyser: {
    runAnalysis: (
      classMetricsFilePath: string,
      methodMetricsFilePath: string,
      issuesToAnalyseIds: number[],
    ) => Promise<Map<string, MetricsFile>>;
  };
}

declare global {
  interface Window {
    api: IAPI;
  }
}
