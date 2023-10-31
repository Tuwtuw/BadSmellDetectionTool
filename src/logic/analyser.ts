import { parseCkMetricsFiles } from './CkMetricsParser';
import { fetchBadSmellFromID } from './database/database';
import { expression, operator, isExpression } from '../components/formula-builder';
import { MetricsFile } from './types';

function buildLogicalExpressionToAnalyse(formula: (expression | operator)[], variableOfAccess: string) {
  if (!formula) return '';
  let logicalExpression = '';
  formula.forEach((formulaElement) => {
    if (isExpression(formulaElement)) {
      // Eg: currentClassMetrics[loc] > 200
      logicalExpression += `${variableOfAccess}["${formulaElement.metric.metric_input_id}"] ${formulaElement.comparison} ${formulaElement.comparisonValue}`;
    } else {
      formulaElement.value === '!'
        ? (logicalExpression += ' ' + formulaElement.value)
        : (logicalExpression += ' ' + formulaElement.value + ' ');
    }
  });
  return logicalExpression;
}

export async function runAnalysis(
  classMetricsFilePath: string,
  methodMetricsFilePath: string,
  issuesToAnalyseIds: number[],
): Promise<Map<string, MetricsFile>> {
  const issuesToAnalyse = fetchBadSmellFromID(issuesToAnalyseIds);
  const classLevelIssues = issuesToAnalyse.filter((issue) => issue.scope === 'class');
  const methodLevelIssues = issuesToAnalyse.filter((issue) => issue.scope === 'method');

  const processedCSVMap = await parseCkMetricsFiles(classMetricsFilePath, methodMetricsFilePath);

  for (const [, fileObject] of processedCSVMap) {
    let fileHasIssue = false;
    for (const [, classObject] of fileObject.classes) {
      // Calculate Class Level Bad Smells
      // This variable is accessed during evals
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const currentClassMetrics = Object.fromEntries(classObject.metrics);
      const classLevelAnalysisResult = new Map();
      let classItselfHasIssue = false;
      classLevelIssues.forEach((classLevelIssue) => {
        const classLevelLogicExpression = buildLogicalExpressionToAnalyse(
          classLevelIssue.detectionStrategy.formula,
          'currentClassMetrics',
        );
        const issueExpressionResult = eval(classLevelLogicExpression);
        classItselfHasIssue = classItselfHasIssue || issueExpressionResult;
        classLevelAnalysisResult.set(classLevelIssue.badSmell_id, issueExpressionResult);
      });

      classObject.issuesAnalysed = classLevelAnalysisResult;
      classObject.classItselfHasIssues = classItselfHasIssue;
      let classHasIssue = classItselfHasIssue;

      for (const [, methodObject] of classObject.methods) {
        // Calculate Method Level Bad Smells
        // This variable is accessed during evals
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const currentMethodMetrics = Object.fromEntries(methodObject.metrics);
        const methodLevelAnalysisResult = new Map();
        let methodHasIssue = false;
        methodLevelIssues.forEach((methodLevelIssue) => {
          const methodLevelLogicExpression = buildLogicalExpressionToAnalyse(
            methodLevelIssue.detectionStrategy.formula,
            'currentMethodMetrics',
          );
          const issueExpressionResult = eval(methodLevelLogicExpression);
          methodHasIssue = methodHasIssue || issueExpressionResult;
          methodLevelAnalysisResult.set(methodLevelIssue.badSmell_id, issueExpressionResult);
        });

        methodObject.issuesAnalysed = methodLevelAnalysisResult;
        methodObject.methodHasIssues = methodHasIssue;
        classHasIssue = classHasIssue || methodHasIssue;
      }

      classObject.classHasIssues = classHasIssue;
      fileHasIssue = fileHasIssue || classHasIssue;
    }

    fileObject.fileHasIssues = fileHasIssue;
  }

  return processedCSVMap;
}
