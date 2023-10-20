import sqlite3 from 'better-sqlite3';
import {
  metricsTableCreate,
  detectionStrategiesTableCreate,
  badSmellsTableCreate,
  defaultDetectionStrategies,
  defaultMetrics,
  defaultBadSmells,
} from './initializationQueries';
import { app } from 'electron';

import { Metric, DetectionStrategy, BadSmell, BadSmellDB } from '../types/index';

const databasePath = app.getPath('userData').concat('/data.db');

export function firstTimeDatabaseInitialization() {
  const db = new sqlite3(databasePath);

  try {
    // Initializing tables
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.prepare(metricsTableCreate).run();
    db.prepare(detectionStrategiesTableCreate).run();
    db.prepare(badSmellsTableCreate).run();

    // Inserting default values
    db.prepare(defaultDetectionStrategies).run();
    db.prepare(defaultMetrics).run();
    db.prepare(defaultBadSmells).run();
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
}

// Metrics database functions

export const fetchAllMetrics = (): Metric[] => {
  const db = new sqlite3(databasePath);

  let metrics: Array<Metric> = [];
  try {
    metrics = db.prepare('SELECT * FROM metrics').all() as Array<Metric>;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
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
      .run([name, type, min, max, description ?? '']);

    createdMetric = db.prepare('SELECT * from metrics where metric_id=?').get(result.lastInsertRowid) as Metric;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();

  return createdMetric;
};

export const editMetric = (
  metricId: number,
  name: string,
  type: string,
  min?: number,
  max?: number,
  description?: string,
) => {
  const db = new sqlite3(databasePath);

  try {
    db.prepare('UPDATE metrics SET name=?, type=?, min=?, max=?, description=? WHERE metric_id=?').run([
      name,
      type,
      min ?? '',
      max ?? '',
      description ?? '',
      metricId,
    ]);
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
};

export const deleteMetric = (metricId: number) => {
  const db = new sqlite3(databasePath);

  try {
    db.prepare('DELETE FROM metrics WHERE metric_id=?').run(metricId);
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
};

// Detection Strategies database functions

export const fetchAllDetectionStrategies = (): DetectionStrategy[] => {
  const db = new sqlite3(databasePath);

  let detectionStrategies: Array<DetectionStrategy> = [];
  try {
    detectionStrategies = db.prepare('SELECT * FROM detectionStrategies').all() as Array<DetectionStrategy>;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();

  return detectionStrategies;
};

export const insertDetectionStrategy = (
  name: string,
  formula: string,
  description?: string,
): DetectionStrategy | undefined => {
  const db = new sqlite3(databasePath);

  let createdDetectionStrategy: DetectionStrategy | undefined = undefined;
  try {
    const result = db
      .prepare('INSERT INTO detectionStrategies (name, formula, description) VALUES (?, ?, ?)')
      .run([name, formula, description ?? '']);

    createdDetectionStrategy = db
      .prepare('SELECT * from detectionStrategies where detectionStrategy_id=?')
      .get(result.lastInsertRowid) as DetectionStrategy;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();

  return createdDetectionStrategy;
};

export const editDetectionStrategy = (
  detectionStrategyId: number,
  name: string,
  formula: string,
  description?: string,
) => {
  const db = new sqlite3(databasePath);

  try {
    db.prepare('UPDATE detectionStrategies SET name=?, formula=?, description=? WHERE detectionStrategy_id=?').run([
      name,
      formula,
      description ?? '',
      detectionStrategyId,
    ]);
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
};

export const deleteDetectionStrategy = (detectionStrategyId: number) => {
  const db = new sqlite3(databasePath);

  try {
    const result = db.prepare('DELETE FROM detectionStrategies WHERE detectionStrategy_id=?').run(detectionStrategyId);
    db.close();
    return !!result.changes;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
    db.close();
    return false;
  }
};

// Bad Smells database functions

export const fetchAllBadSmells = (): BadSmell[] => {
  const db = new sqlite3(databasePath);

  let badSmells: Array<BadSmell> = [];
  try {
    const detectionStrategies = fetchAllDetectionStrategies();

    const result = db.prepare('SELECT * FROM badSmells').all() as Array<BadSmellDB>;
    badSmells = result.map((badSmell) => {
      return {
        badSmell_id: badSmell.badSmell_id,
        name: badSmell.name,
        scope: badSmell.scope,
        description: badSmell.description,
        detectionStrategy: detectionStrategies.find(
          (detectionStrategy) => detectionStrategy.detectionStrategy_id === badSmell.detectionStrategy_id,
        ),
      };
    });
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();

  return badSmells;
};

export const insertBadSmell = (
  name: string,
  scope: string,
  detectionStrategyId?: number,
  description?: string,
): BadSmell | undefined => {
  const db = new sqlite3(databasePath);

  let createdBadSmell: BadSmell | undefined = undefined;
  try {
    const result = db
      .prepare('INSERT INTO badSmells (name, scope, detectionStrategy_id, description) VALUES (?, ?, ?, ?)')
      .run([name, scope, detectionStrategyId ?? '', description ?? '']);

    createdBadSmell = db
      .prepare('SELECT * from BadSmells where detectionStrategy_id=?')
      .get(result.lastInsertRowid) as BadSmell;
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
  return createdBadSmell;
};

export const editBadSmell = (
  badSmellId: number,
  name: string,
  scope: string,
  detectionStrategyId: number,
  description?: string,
) => {
  const db = new sqlite3(databasePath);

  try {
    db.prepare('UPDATE badSmells SET name=?, scope=?, detectionStrategy_id=?, description=? WHERE badSmell_id=?').run([
      name,
      scope,
      detectionStrategyId,
      description ?? '',
      badSmellId,
    ]);
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
};

export const deleteBadSmell = (badSmell_id: number) => {
  const db = new sqlite3(databasePath);

  try {
    db.prepare('DELETE FROM badSmells WHERE badSmell_id=?').run(badSmell_id);
  } catch (error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }

  db.close();
};
