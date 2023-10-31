import { expression, operator } from '../../components/formula-builder';

export interface Metric {
  metric_id: number;
  name: string;
  type: string;
  metric_input_id: string;
  description?: string;
}

export interface DetectionStrategy {
  detectionStrategy_id: number;
  name: string;
  formula: (expression | operator)[];
  description?: string;
}
export interface DetectionStrategyDB {
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

export interface BadSmellDB extends Omit<BadSmell, 'detectionStrategy'> {
  detectionStrategy_id: number;
}

export interface MetricsFile {
  classes: Map<string, FileClass>;
}

export interface FileClass {
  methods: Map<string, ClassMethod>;
  metrics: Map<string, number | boolean>;
  badSmellsAnalysed?: Map<number, boolean>;
}

export interface ClassMethod {
  metrics: Map<string, number | boolean>;
  badSmellsAnalysed?: Map<number, boolean>;
}
