"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBadSmells = exports.defaultDetectionStrategies = exports.defaultMetrics = exports.executionLogsTableCreate = exports.detectionStrategies_m2m_metricsCreate = exports.badSmellsTableCreate = exports.detectionStrategiesTableCreate = exports.metricsTableCreate = void 0;
exports.metricsTableCreate = `CREATE TABLE IF NOT EXISTS metrics(
  metric_id INTEGER NOT NULL PRIMARY KEY,  
  name TEXT NOT NULL UNIQUE, 
  type TEXT NOT NULL, 
  min INTEGER, 
  max INTEGER, 
  description TEXT
)`;
exports.detectionStrategiesTableCreate = `CREATE TABLE IF NOT EXISTS detectionStrategies(
  detectionStrategy_id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL UNIQUE,
  formula TEXT,
  description TEXT
)`;
exports.badSmellsTableCreate = `CREATE TABLE IF NOT EXISTS badSmells(
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
exports.detectionStrategies_m2m_metricsCreate = ` CREATE TABLE IF NOT EXISTS detectionStrategies_m2m_metrics(
  FOREIGN KEY (detectionStrategy_id)
    REFERENCES detectionStrategies (detectionStrategy_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (metric_id)
    REFERENCES metrics (metric_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE 
)`;
exports.executionLogsTableCreate = ` CREATE TABLE IF NOT EXISTS executionLogs(
  log_id INTEGET NOT NULL PRIMARY KEY,
  executionDate DATE,
)`;
exports.defaultMetrics = `INSERT INTO metrics (name, type, description) VALUES 
('CBO (Coupling between objects)', '', 'Counts the number of dependencies a class has. The tools checks for any type used in the entire class (field declaration, method return types, variable declarations, etc). It ignores dependencies to Java itself (e.g. java.lang.String).'),
('CBO Modified (Coupling between objects)', '', 'Counts the number of dependencies a class has. It is very similar to the CKTool''s original CBO. However, this metric considers a dependency from a class as being both the references the type makes to others and the references that it receives from other types.'),
('FAN-IN', '', 'Counts the number of input dependencies a class has, i.e, the number of classes that reference a particular class. For instance, given a class X, the fan-in of X would be the number of classes that call X by referencing it as an attribute, accessing some of its attributes, invoking some of its methods, etc.'),
('FAN-OUT', '', 'Counts the number of output dependencies a class has, i.e, the number of other classes referenced by a particular class. In other words, given a class X, the fan-out of X is the number of classes called by X via attributes reference, method invocations, object instances, etc.'),
('DIT (Depth Inheritance Tree)', '', 'It counts the number of "fathers" a class has. All classes have DIT at least 1 (everyone inherits java.lang.Object). In order to make it happen, classes must exist in the project (i.e. if a class depends upon X which relies in a jar/dependency file, and X depends upon other classes, DIT is counted as 2).'),
('NOC (Number of Children)', '', 'It counts the number of immediate subclasses that a particular class has.'),
('Number of fields', '', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of methods', '', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of visible methods', '', 'Counts the number of visible methods. A method is visible if it is not private.'),
('NOSI (Number of static invocations)', '', 'Counts the number of invocations to static methods. It can only count the ones that can be resolved by the JDT.'),
('RFC (Response for a Class)', '', 'Counts the number of unique method invocations in a class. As invocations are resolved via static analysis, this implementation fails when a method has overloads with same number of parameters, but different types.'),
('WMC (Weight Method Class) or McCabe''s complexity', '', 'It counts the number of branch instructions in a class.'),
('LOC (Lines of code)', '', 'It counts the lines of count, ignoring empty lines and comments (i.e., it''s Source Lines of Code, or SLOC). The number of lines here might be a bit different from the original file, as we use JDT''s internal representation of the source code to calculate it.'),
('LCOM (Lack of Cohesion of Methods)', '', 'Calculates LCOM metric. This is the very first version of metric, which is not reliable. LCOM-HS can be better (hopefully, you will send us a pull request).'),
('LCOM* (Lack of Cohesion of Methods)', '', 'This metric is a modified version of the current version of LCOM implemented in CK Tool. LCOM* is a normalized metric that computes the lack of cohesion of class within a range of 0 to 1. Then, the closer to 1 the value of LCOM* in a class, the less the cohesion degree of this respective class. The closer to 0 the value of LCOM* in a class, the most the cohesion of this respective class. This implementation follows the third version of LCOM* defined in [1].'),
('TCC (Tight Class Cohesion)', '', 'Measures the cohesion of a class with a value range from 0 to 1. TCC measures the cohesion of a class via direct connections between visible methods, two methods or their invocation trees access the same class variable.'),
('LCC (Loose Class Cohesion)', '', 'Similar to TCC but it further includes the number of indirect connections between visible classes for the cohesion calculation. Thus, the constraint LCC >= TCC holds always.'),
('Quantity of returns', '', 'The number of return instructions.'),
('Quantity of loops', '', 'The number of loops (i.e., for, while, do while, enhanced for).'),
('Quantity of comparisons', '', 'The number of comparisons (i.e., == and !=).'),
('Quantity of try/catches', '', 'The number of try/catches.'),
('Quantity of parenthesized expressions', '', 'The number of expressions inside parenthesis.'),
('String literals', '', 'The number of string literals (e.g., "John Doe"). Repeated strings count as many times as they appear.'),
('Quantity of Number', '', 'The number of numbers (i.e., int, long, double, float) literals.'),
('Quantity of Math Operations', '', 'The number of math operations (times, divide, remainder, plus, minus, left shit, right shift).'),
('Quantity of Variables', '', 'Number of declared variables.'),
('Max nested blocks', '', 'The highest number of blocks nested together.'),
('Quantity of Anonymous classes, inner classes, and lambda expressions', '', 'The name says it all. Note that whenever an anonymous class or an inner class is declared, it becomes an "entire new class", e.g., CK generates A.B and A.B$C, C being an inner class inside A.B. However, lambda expressions are not considered classes, and thus, are part of the class/method they are embedded into. A class or a method only has the number of inner classes that are declared at its level, e.g., an inner class that is declared inside a method M2, that is inside an anonymous class A, that is declared inside a method M, that finally is declared inside a class C, will not count in class C, but only in method M2 (first-level method it is embodied), and anonymous class A (first-level class it is embodied).'),
('Number of unique words', '', 'Number of unique words in the source code. At method level, it only uses the method body as input. At class level, it uses the entire body of the class as metrics. The algorithm basically counts the number of words in a method/class, after removing Java keywords. Names are split based on camel case and underline (e.g., longName_likeThis becomes four words). See WordCounter class for details on the implementation.'),
('Number of Log Statements', '', 'Number of log statements in the source code. The counting uses REGEX compatible with SLF4J and Log4J API calls. See NumberOfLogStatements.java and the test examples (NumberOfLogStatementsTest and fixtures/logs) for more info.'),
('Has Javadoc', '', 'Boolean indicating whether a method has javadoc. (Only at method-level for now)'),
('modifiers', '', 'public/abstract/private/protected/native modifiers of classes/methods. Can be decoded using org.eclipse.jdt.core.dom.Modifier.'),
('Usage of each variable', '', 'How often each variable was used inside each method.'),
('Usage of each field', '', 'How often each local field was used inside each method, local field are fields within a class (subclasses are not included). Also indirect local field usages are detected, indirect local field usages include all usages of fields within the local invocation tree of a class e.g. A invokes B and B uses field a, then a is indirectly used by A.'),
('Method invocations', '', 'All directly invoked methods, variations are local invocations and indirect local invocations.')
`; // TODO: Finish adding Ck Metrics.
exports.defaultDetectionStrategies = `INSERT INTO detectionStrategies (name, formula, description) VALUES
('Rezende (2023) Data Class Threshold', 'totalMethodsQty < 5 && fanin <= 2 && fanout <= 7 && returnQty <= 0 && finalFieldsQty >= 3 && mathOperationsQty = 0 && maxNestedBlocksQty < 1 && noc = 0', 'test Description'),
('Rezende (2023) Large Class Threshold', 'LOC > 200 && totalMethodsQty > 12 && cboModified >= 10 && staticFieldsQty > 1 && finalFieldsQty > 3 && stringLiteralsQty > 3 && assignmentsQty > 21 &&variablesQty > 15', NULL),
('Rezende (2023) Feature Envy Threshold', 'fanout > 15', NULL)
`;
exports.defaultBadSmells = `INSERT INTO badSmells (name, scope, detectionStrategy_id, description) VALUES(

)`; // TODO: Add Remaining Bad Smells
//# sourceMappingURL=initializationQueries.js.map