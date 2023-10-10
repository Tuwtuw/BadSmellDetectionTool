import sqlite3 from 'better-sqlite3';
import {
  metricsTableCreate,
  detectionStrategiesTableCreate,
  badSmellsTableCreate,
  defaultDetectionStrategies,
} from './initializationQueries';
import { app } from 'electron';

import { Metric, DetectionStrategy, BadSmell } from '../types/index';

const databasePath = app.getPath('userData').concat('/data.db');

export function firstTimeDatabaseInitialization() {
  const db = new sqlite3(databasePath);

  // Initializing tables
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.prepare(metricsTableCreate).run();
  db.prepare(detectionStrategiesTableCreate).run();
  db.prepare(badSmellsTableCreate).run();

  // Inserting default values
  db.prepare(defaultDetectionStrategies).run();

  db.close();
}

// Metrics database functions

export const fetchAllMetrics = (): Metric[] => {
  const db = new sqlite3(databasePath);

  let metrics: Array<Metric> = [];
  try {
    metrics = db.prepare('SELECT * FROM metrics').all() as Array<Metric>;
  } catch (error) {
    console.error(error);
  }

  db.close();

  return metrics;
};

export const insertMetric = (
  name: string,
  type: string,
  min?: number,
  max?: number,
  description?: string,
): Metric | undefined => {
  console.log(databasePath);

  const db = new sqlite3(databasePath);

  let createdMetric: Metric | undefined = undefined;
  try {
    const result = db
      .prepare('INSERT INTO metrics (name, type, min, max, description) VALUES (?, ?, ?, ?, ?)')
      .run([name, type, min ?? '', max ?? '', description ?? '']);

    createdMetric = db.prepare('SELECT * from metrics where metric_id=?').get(result.lastInsertRowid) as Metric;
  } catch (error) {
    console.error(error);
  }

  db.close();

  return createdMetric;
};

export const editMetric = (metricId: number, metric: Metric) => {
  const db = new sqlite3(databasePath);

  db.prepare('INSERT INTO metrics (name, type, min, max, description) VALUES (?, ?, ?, ?, ?)').run([
    metric.name,
    metric.type,
    metric.min ?? '',
    metric.max ?? '',
    metric.description ?? '',
  ]);

  db.close();
};

export const deleteMetric = (metricId: number) => {
  const db = new sqlite3(databasePath);

  db.prepare('DELETE FROM metrics WHERE metric_id=?').run(metricId);

  db.close();
};

// Detection Strategies database functions

export const fetchAllDetectionStrategies = (): DetectionStrategy[] => {
  const db = new sqlite3(databasePath);

  let detectionStrategies: Array<DetectionStrategy> = [];
  try {
    detectionStrategies = db.prepare('SELECT * FROM detectionStrategies').all() as Array<DetectionStrategy>;
  } catch (error) {
    console.error(error);
  }

  db.close();

  return detectionStrategies;
};

export const insertDetectionStrategy = (detectionStrategy: DetectionStrategy) => {
  const db = new sqlite3(databasePath);

  db.prepare('INSERT INTO metrics (name, formula, description) VALUES (?, ?, ?)').run([
    detectionStrategy.name,
    detectionStrategy.formula,
    detectionStrategy.description ?? '',
  ]);

  db.close();
};

export const deleteDetectionStrategy = (detectionStrategyId: number) => {
  const db = new sqlite3(databasePath);

  try {
    const result = db.prepare('DELETE FROM detectionStrategies WHERE detectionStrategy_id=?').run(detectionStrategyId);
    db.close();
    return !!result.changes;
  } catch (error) {
    console.error(error);
    db.close();
    return false;
  }
};

export const insertBadSmell = (badSmell: BadSmell) => {
  const db = new sqlite3(databasePath);

  db.prepare('INSERT INTO metrics (name, scope, detectionStrategy, description) VALUES (?, ?, ?, ?)').run([
    badSmell.name,
    badSmell.scope,
    badSmell.detectionStrategy.detectionStrategy_id ?? '',
    badSmell.description ?? '',
  ]);

  db.close();
};

export const deleteBadSmell = (badSmell_id: number) => {
  const db = new sqlite3(databasePath);

  db.prepare('DELETE FROM badSmells WHERE badSmell_id=?').run(badSmell_id);

  db.close();
};
