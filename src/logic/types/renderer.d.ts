import { BadSmell, DetectionStrategy, Metric } from '.';

export interface IAPI {
  database: {
    metric: {
      fetchAll: () => Promise<Metric[]>;
      new: (name: string, type: string, min?: number, max?: number, description?: string) => Promise<Metric>;
      edit: (
        metricId: number,
        name: string,
        type: string,
        min?: number,
        max?: number,
        description?: string,
      ) => Promise<Metric>;
      delete: (metricId: number) => Promise<boolean>;
    };
    detectionStrategy: {
      fetchAll: () => Promise<DetectionStrategy[]>;
      new: (name: string, formula: string, description?: string) => Promise<DetectionStrategy>;
      edit: (
        detectionStrategyId: number,
        name: string,
        formula: string,
        description?: string,
      ) => Promise<DetectionStrategy>;
      delete: (detectionStrategyId: number) => Promise<boolean>;
    };
    badSmell: {
      fetchAll: () => Promise<BadSmell[]>;
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
}

declare global {
  interface Window {
    api: IAPI;
  }
}
