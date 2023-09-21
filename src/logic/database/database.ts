import * as sqlite3 from 'sqlite3';
import { metricsTableCreate } from './initializationQueries';

function firstTimeDatabaseInitialization() {
  const db = new sqlite3.Database('./metrics.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err);
    }
  });

  db.run(metricsTableCreate);

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

firstTimeDatabaseInitialization();

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
