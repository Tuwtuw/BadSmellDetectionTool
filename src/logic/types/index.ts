export interface Metric {
  key: string;
  name: string;
  type: string;
  description?: string;
  min?: number;
  max?: number;
}

export interface DetectionStrategy {
  key: string;
  name: string;
  formula: string;
  description?: string;
}

export interface BadSmell {
  key: string;
  name: string;
  detectionStrategy: DetectionStrategy;
  scope: string;
  description?: string;
}
