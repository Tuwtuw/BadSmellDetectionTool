"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBadSmell = exports.editBadSmell = exports.insertBadSmell = exports.fetchAllBadSmells = exports.deleteDetectionStrategy = exports.editDetectionStrategy = exports.insertDetectionStrategy = exports.fetchAllDetectionStrategies = exports.deleteMetric = exports.editMetric = exports.insertMetric = exports.fetchAllMetrics = exports.firstTimeDatabaseInitialization = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const initializationQueries_1 = require("./initializationQueries");
const electron_1 = require("electron");
const databasePath = electron_1.app.getPath('userData').concat('/data.db');
function firstTimeDatabaseInitialization() {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        // Initializing tables
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        db.prepare(initializationQueries_1.metricsTableCreate).run();
        db.prepare(initializationQueries_1.detectionStrategiesTableCreate).run();
        db.prepare(initializationQueries_1.badSmellsTableCreate).run();
        // Inserting default values
        db.prepare(initializationQueries_1.defaultDetectionStrategies).run();
        db.prepare(initializationQueries_1.defaultMetrics).run();
        // db.prepare(defaultBadSmells).run();
    }
    catch (error) {
        console.error(error);
    }
    db.close();
}
exports.firstTimeDatabaseInitialization = firstTimeDatabaseInitialization;
// Metrics database functions
const fetchAllMetrics = () => {
    const db = new better_sqlite3_1.default(databasePath);
    let metrics = [];
    try {
        metrics = db.prepare('SELECT * FROM metrics').all();
    }
    catch (error) {
        console.error(error);
    }
    db.close();
    return metrics;
};
exports.fetchAllMetrics = fetchAllMetrics;
const insertMetric = (name, type, min, max, description) => {
    console.log(databasePath);
    const db = new better_sqlite3_1.default(databasePath);
    let createdMetric = undefined;
    try {
        const result = db
            .prepare('INSERT INTO metrics (name, type, min, max, description) VALUES (?, ?, ?, ?, ?)')
            .run([name, type, min !== null && min !== void 0 ? min : '', max !== null && max !== void 0 ? max : '', description !== null && description !== void 0 ? description : '']);
        createdMetric = db.prepare('SELECT * from metrics where metric_id=?').get(result.lastInsertRowid);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
    return createdMetric;
};
exports.insertMetric = insertMetric;
const editMetric = (metricId, name, type, min, max, description) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('UPDATE metrics SET name=?, type=?, min=?, max=?, description=? WHERE metric_id=?').run([
            name,
            type,
            min !== null && min !== void 0 ? min : '',
            max !== null && max !== void 0 ? max : '',
            description !== null && description !== void 0 ? description : '',
            metricId,
        ]);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.editMetric = editMetric;
const deleteMetric = (metricId) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('DELETE FROM metrics WHERE metric_id=?').run(metricId);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.deleteMetric = deleteMetric;
// Detection Strategies database functions
const fetchAllDetectionStrategies = () => {
    const db = new better_sqlite3_1.default(databasePath);
    let detectionStrategies = [];
    try {
        detectionStrategies = db.prepare('SELECT * FROM detectionStrategies').all();
    }
    catch (error) {
        console.error(error);
    }
    db.close();
    return detectionStrategies;
};
exports.fetchAllDetectionStrategies = fetchAllDetectionStrategies;
const insertDetectionStrategy = (name, formula, description) => {
    const db = new better_sqlite3_1.default(databasePath);
    let createdDetectionStrategy = undefined;
    try {
        const result = db
            .prepare('INSERT INTO detectionStrategies (name, formula, description) VALUES (?, ?, ?)')
            .run([name, formula, description !== null && description !== void 0 ? description : '']);
        createdDetectionStrategy = db
            .prepare('SELECT * from detectionStrategies where detectionStrategy_id=?')
            .get(result.lastInsertRowid);
    }
    catch (error) {
        console.log(error.code);
        console.error(error);
    }
    db.close();
    return createdDetectionStrategy;
};
exports.insertDetectionStrategy = insertDetectionStrategy;
const editDetectionStrategy = (detectionStrategyId, name, formula, description) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('UPDATE detectionStrategies SET name=?, formula=?, description=? WHERE detectionStrategy_id=?').run([
            name,
            formula,
            description !== null && description !== void 0 ? description : '',
            detectionStrategyId,
        ]);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.editDetectionStrategy = editDetectionStrategy;
const deleteDetectionStrategy = (detectionStrategyId) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        const result = db.prepare('DELETE FROM detectionStrategies WHERE detectionStrategy_id=?').run(detectionStrategyId);
        db.close();
        return !!result.changes;
    }
    catch (error) {
        console.error(error);
        db.close();
        return false;
    }
};
exports.deleteDetectionStrategy = deleteDetectionStrategy;
// Bad Smells database functions
const fetchAllBadSmells = () => {
    const db = new better_sqlite3_1.default(databasePath);
    let badSmells = [];
    try {
        badSmells = db.prepare('SELECT * FROM badSmells').all();
    }
    catch (error) {
        console.error(error);
    }
    db.close();
    return badSmells;
};
exports.fetchAllBadSmells = fetchAllBadSmells;
const insertBadSmell = (name, scope, detectionStrategyId, description) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('INSERT INTO metrics (name, scope, detectionStrategy, description) VALUES (?, ?, ?, ?)').run([
            name,
            scope,
            detectionStrategyId !== null && detectionStrategyId !== void 0 ? detectionStrategyId : '',
            description !== null && description !== void 0 ? description : '',
        ]);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.insertBadSmell = insertBadSmell;
const editBadSmell = (badSmellId, name, scope, detectionStrategyId, description) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('UPDATE badSmells SET name=?, scope=?, detectionStrategy_id=?, description=? WHERE badSmell_id=?').run([
            name,
            scope,
            detectionStrategyId,
            description !== null && description !== void 0 ? description : '',
            badSmellId,
        ]);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.editBadSmell = editBadSmell;
const deleteBadSmell = (badSmell_id) => {
    const db = new better_sqlite3_1.default(databasePath);
    try {
        db.prepare('DELETE FROM badSmells WHERE badSmell_id=?').run(badSmell_id);
    }
    catch (error) {
        console.error(error);
    }
    db.close();
};
exports.deleteBadSmell = deleteBadSmell;
//# sourceMappingURL=database.js.map