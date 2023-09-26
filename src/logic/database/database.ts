import sqlite3 from 'better-sqlite3';
import {
  metricsTableCreate,
  detectionStrategiesTableCreate,
  badSmellsTableCreate,
  defaultDetectionStrategies,
} from './initializationQueries';

import { Metric, DetectionStrategy, BadSmell } from '../types/index';

export function firstTimeDatabaseInitialization() {
  const db = new sqlite3('./data.db');

  // Initializing tables
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.prepare(metricsTableCreate).run();
  db.prepare(detectionStrategiesTableCreate).run();
  db.prepare(badSmellsTableCreate).run();
  // db.run(metricsTableCreate);
  // db.run(detectionStrategiesTableCreate);
  // db.run(badSmellsTableCreate);

  // Inserting default values
  // db.run(defaultDetectionStrategies);

  db.close();
}

// export const fetchAllMetrics = (): Metric[] => {
//   const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });

//   db.all<Metric>('SELECT * FROM metrics', [], (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
//   });

//   db.close();
//   return [];
// };

// export const fetchAllDetectionStrategies = (): DetectionStrategy[] => {
//   const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });

//   db.all<DetectionStrategy>('SELECT * FROM detectionStrategies', [], (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
//   });

//   db.close();

//   return [];
// };

// export const fetchAllBadSmells = (): BadSmell[] => {
//   return [];
// };

// function fetchGenericTableData<T>(table: string) {
//   const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });

//   db.all<T>(`SELECT * FROM ${table}`, [], (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
//   });

//   db.close();
// }

firstTimeDatabaseInitialization();
// fetchAllDetectionStrategies();

// const db = new sqlite3.Database('./metrics.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log('Connected to the chinook database.');
// });

// db.run('CREATE TABLE langs2(name text, description text)');

// // const sql = `SELECT DISTINCT Name name FROM playlists
// //            ORDER BY name`;

// // db.all(sql, [], (err, rows) => {
// //   if (err) {
// //     throw err;
// //   }
// //   rows.forEach((row) => {
// //     console.log(row?.name);
// //   });
// // });

// db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
//   if (err) {
//     return console.log(err.message);
//   }
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
