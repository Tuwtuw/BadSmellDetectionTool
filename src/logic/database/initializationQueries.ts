export const metricsTableCreate = `CREATE TABLE IF NOT EXISTS metrics(
  metric_id INTEGER NOT NULL PRIMARY KEY,  
  name TEXT NOT NULL UNIQUE, 
  type TEXT NOT NULL, 
  min INTEGER, 
  max INTEGER, 
  description TEXT
)`;

export const detectionStrategiesTableCreate = `CREATE TABLE IF NOT EXISTS detectionStrategies(
  detectionStrategy_id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL UNIQUE,
  formula TEXT,
  description TEXT
)`;

export const badSmellsTableCreate = `CREATE TABLE IF NOT EXISTS badSmells(
  badSmell_id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL UNIQUE, 
  scope TEXT NOT NULL, 
  detectionStrategy_id INTEGER,
  description TEXT,
  FOREIGN KEY (detectionStrategy_id)
    REFERENCES detectionStrategies (detectionStrategy_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE 
)`;

export const detectionStrategies_m2m_metricsCreate = ` CREATE TABLE IF NOT EXISTS detectionStrategies_m2m_metrics(
  FOREIGN KEY (detectionStrategy_id)
    REFERENCES detectionStrategies (detectionStrategy_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (metric_id)
    REFERENCES metrics (metric_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE 
)`;

export const defaultMetrics = `INSERT INTO metrics (name, type, description) VALUES (

)`; // TODO: Finish adding Ck Metrics.

export const defaultDetectionStrategies = `INSERT INTO detectionStrategies (name, formula, description) VALUES
('Rezende (2023) Data Class Threshold', 'totalMethodsQty < 5 && fanin <= 2 && fanout <= 7 && returnQty <= 0 && finalFieldsQty >= 3 && mathOperationsQty = 0 && maxNestedBlocksQty < 1 && noc = 0', 'test Description'),
('Rezende (2023) Large Class Threshold', 'LOC > 200 && totalMethodsQty > 12 && cboModified >= 10 && staticFieldsQty > 1 && finalFieldsQty > 3 && stringLiteralsQty > 3 && assignmentsQty > 21 &&variablesQty > 15', NULL),
('Rezende (2023) Feature Envy Threshold', 'fanout > 15', NULL)
`;

export const defaultBadSmells = `INSERT INTO badSmells (name, scope, detectionStrategy_id, description) VALUES(

)`; // TODO: Add Remaining Bad Smells
