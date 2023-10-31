import { MetricsFile, FileClass, ClassMethod } from './types';
import fs from 'fs';
import { parse } from 'csv-parse';

function parseClassCSV(filePath: string): Promise<Map<string, MetricsFile>> {
  const records: Map<string, MetricsFile> = new Map();

  const parser = parse({ columns: true });

  parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      const fileName = record?.file;
      const fileAccess: MetricsFile = records.has(fileName) ? records.get(fileName) : { classes: new Map() };
      const className = record?.class;
      const classAccess: FileClass = fileAccess.classes.has(className)
        ? fileAccess.classes.get(className)
        : fileAccess.classes.set(className, { methods: new Map(), metrics: new Map() }) &&
          fileAccess.classes.get(className);

      for (const property in record) {
        if (property !== 'file' && property !== 'class' && property !== 'method') {
          if (record[property].toLowerCase() === 'true' || record[property].toLowerCase() === 'false')
            classAccess.metrics.set(property, record[property].toLowerCase() === 'true');
          else classAccess.metrics.set(property, parseFloat(record[property]));
        }
      }

      records.set(fileName, fileAccess);
    }
  });

  parser.on('error', function (err) {
    console.error(err.message);
  });

  fs.createReadStream(filePath).pipe(parser);

  return new Promise<Map<string, MetricsFile>>((resolve) =>
    parser.on('end', function () {
      resolve(records);
    }),
  );
}

function parseMethodCSV(
  filePath: string,
  classMetricsMap: Map<string, MetricsFile>,
): Promise<Map<string, MetricsFile>> {
  const records: Map<string, MetricsFile> = classMetricsMap;

  const parser = parse({ columns: true });

  parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      const fileName = record?.file;
      const fileAccess: MetricsFile = records.has(fileName) ? records.get(fileName) : { classes: new Map() };
      const className = record?.class;
      const classAccess: FileClass = fileAccess.classes.has(className)
        ? fileAccess.classes.get(className)
        : fileAccess.classes.set(className, { methods: new Map(), metrics: new Map() }) &&
          fileAccess.classes.get(className);

      const methodName = record?.method;
      const methodAccess: ClassMethod = classAccess.methods.has(methodName)
        ? classAccess.methods.get(methodName)
        : classAccess.methods.set(methodName, { metrics: new Map() }) && classAccess.methods.get(methodName);

      for (const property in record) {
        if (property !== 'file' && property !== 'class' && property !== 'method') {
          if (record[property].toLowerCase() === 'true' || record[property].toLowerCase() === 'false')
            methodAccess.metrics.set(property, record[property].toLowerCase() === 'true');
          else methodAccess.metrics.set(property, parseFloat(record[property]));
        }
      }

      records.set(fileName, fileAccess);
    }
  });

  parser.on('error', function (err) {
    console.error(err.message);
  });

  fs.createReadStream(filePath).pipe(parser);

  return new Promise<Map<string, MetricsFile>>((resolve) =>
    parser.on('end', function () {
      resolve(records);
    }),
  );
}

export function parseCkMetricsFiles(
  classMetricsFilePath: string,
  methodMetricsFilePath: string,
): Promise<Map<string, MetricsFile>> {
  const methodsMetricsMap = parseClassCSV(classMetricsFilePath).then((classMetricsMap) => {
    return parseMethodCSV(methodMetricsFilePath, classMetricsMap);
  });

  return methodsMetricsMap;
}
