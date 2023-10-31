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
    for (const [, classObject] of fileObject.classes) {
      // Calculate Class Level Bad Smells
      // This variable is accessed during evals
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const currentClassMetrics = Object.fromEntries(classObject.metrics);
      const classLevelAnalysisResult = new Map();
      classLevelIssues.forEach((classLevelIssue) => {
        const classLevelLogicExpression = buildLogicalExpressionToAnalyse(
          classLevelIssue.detectionStrategy.formula,
          'currentClassMetrics',
        );
        classLevelAnalysisResult.set(classLevelIssue.badSmell_id, eval(classLevelLogicExpression));
      });

      classObject.badSmellsAnalysed = classLevelAnalysisResult;

      for (const [, methodObject] of classObject.methods) {
        // Calculate Method Level Bad Smells
        // This variable is accessed during evals
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const currentMethodMetrics = Object.fromEntries(methodObject.metrics);
        const methodLevelAnalysisResult = new Map();
        methodLevelIssues.forEach((methodLevelIssue) => {
          const methodLevelLogicExpression = buildLogicalExpressionToAnalyse(
            methodLevelIssue.detectionStrategy.formula,
            'currentMethodMetrics',
          );
          methodLevelAnalysisResult.set(methodLevelIssue.badSmell_id, eval(methodLevelLogicExpression));
        });

        methodObject.badSmellsAnalysed = methodLevelAnalysisResult;
      }
    }
  }

  const test = processedCSVMap
    .get(
      'C:\\Temp\\ProgramsToAnalyse\\dbeaver\\plugins\\org.jkiss.dbeaver.erd.ui\\src\\org\\jkiss\\dbeaver\\erd\\ui\\part\\EntityPart.java',
    )
    .classes.get('org.jkiss.dbeaver.erd.ui.part.EntityPart');

  for (const [, testPrint] of test.methods) {
    console.log(testPrint);
  }

  return processedCSVMap;
}
