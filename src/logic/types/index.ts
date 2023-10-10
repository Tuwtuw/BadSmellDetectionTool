export interface Metric {
  metric_id: number;
  name: string;
  type: string;
  description?: string;
  min?: number;
  max?: number;
}

export interface DetectionStrategy {
  detectionStrategy_id: number;
  name: string;
  formula: string;
  description?: string;
}

export interface BadSmell {
  badSmell_id: number;
  name: string;
  detectionStrategy: DetectionStrategy;
  scope: string;
  description?: string;
}
