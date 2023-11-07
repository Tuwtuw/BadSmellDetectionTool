import fs from 'fs';
import { MetricsFile } from './types';
import { fetchBadSmellFromID } from './database/database';

export function generateOutputCSV(outputData: Map<string, MetricsFile>, idOfIssuesAnalysed: number[]): string {
  const issuesToAnalyse = fetchBadSmellFromID(idOfIssuesAnalysed);

  const headers = ['file', 'class', 'method'];
  const issuesPositions: { issueId: number; position: number }[] = [];
  issuesToAnalyse.forEach((issue, idx) => {
    headers.push(issue.name);
    issuesPositions.push({ issueId: issue.badSmell_id, position: idx });
  });

  const csvData: string[][] = [];
  for (const [fileName, fileObject] of outputData) {
    for (const [className, classObject] of fileObject.classes) {
      // Create Class lines
      const classData = [fileName, className, ''];
      for (let i = 3; i < headers.length; i++) {
        if (classObject.issuesAnalysed.has(issuesPositions[i - 3].issueId)) {
          classData.push(String(classObject.issuesAnalysed.get(issuesPositions[i - 3].issueId)));
        } else {
          classData.push('');
        }
      }
      csvData.push(classData);
      for (const [methodName, methodObject] of classObject.methods) {
        // Create Method Lines
        const methodData = [fileName, className, methodName];

        // if (className === 'org.jkiss.dbeaver.ext.generic.model.GenericView') {
        //   console.log(classObject);
        // }
        for (let i = 3; i < headers.length; i++) {
          if (methodObject.issuesAnalysed.has(issuesPositions[i - 3].issueId)) {
            methodData.push(String(methodObject.issuesAnalysed.get(issuesPositions[i - 3].issueId)));
          } else {
            methodData.push('');
          }
        }
        csvData.push(methodData);
      }
    }
  }

  let csvLines = '';
  csvLines += headers.join(';') + '\n';
  csvData.forEach((rowData) => {
    csvLines += rowData.join(';') + '\n';
  });

  const blob = new Blob([csvLines], { type: 'text/csv;charset=utf-8,' });
  const url = URL.createObjectURL(blob);

  try {
    fs.writeFileSync('output.csv', csvLines, 'utf-8');
  } catch (error) {
    console.error(error);
  }
  return url;
}
