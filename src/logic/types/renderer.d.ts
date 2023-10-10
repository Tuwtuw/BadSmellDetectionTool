import { BadSmell, DetectionStrategy, Metric } from '.';

export interface IAPI {
  database: {
    metric: {
      new: (metric: Metric) => Promise<Metric>;
      edit: (metricId: number, metric: Metric) => Promise<Metric>;
      delete: (metricId: number) => Promise<boolean>;
    };
    detectionStrategy: {
      fetchAll: () => Promise<DetectionStrategy[]>;
      new: (detectionStrategy: DetectionStrategy) => Promise<DetectionStrategy>;
      edit: (detectionStrategyId: number, detectionStrategy: DetectionStrategy) => Promise<DetectionStrategy>;
      delete: (detectionStrategyId: number) => Promise<boolean>;
    };
    badSmell: {
      new: (badSmell: BadSmell) => Promise<BadSmell>;
      edit: (badSmell: BadSmell) => Promise<BadSmell>;
      delete: (badSmell: BadSmell) => Promise<boolean>;
    };
  };
}

declare global {
  interface Window {
    api: IAPI;
  }
}
