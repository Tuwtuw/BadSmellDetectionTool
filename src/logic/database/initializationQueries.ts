export const metricsTableCreate = `CREATE TABLE IF NOT EXISTS metrics(
  metric_id INTEGER NOT NULL PRIMARY KEY,  
  name TEXT NOT NULL UNIQUE, 
  type TEXT NOT NULL, 
  metric_input_id TEXT NOT NULL UNIQUE, 
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

export const executionLogsTableCreate = ` CREATE TABLE IF NOT EXISTS executionLogs(
  log_id INTEGET NOT NULL PRIMARY KEY,
  executionDate DATE,
)`;

export const defaultMetrics = `INSERT INTO metrics (name, type, metric_input_id, description) VALUES 
('CBO (Coupling between objects)', 'integer', 'cbo', 'Counts the number of dependencies a class has. The tools checks for any type used in the entire class (field declaration, method return types, variable declarations, etc). It ignores dependencies to Java itself (e.g. java.lang.String).'),
('CBO Modified (Coupling between objects)', 'integer', 'cboModified', 'Counts the number of dependencies a class has. It is very similar to the CKTool''s original CBO. However, this metric considers a dependency from a class as being both the references the type makes to others and the references that it receives from other types.'),
('FAN-IN', 'integer', 'fanin', 'Counts the number of input dependencies a class has, i.e, the number of classes that reference a particular class. For instance, given a class X, the fan-in of X would be the number of classes that call X by referencing it as an attribute, accessing some of its attributes, invoking some of its methods, etc.'),
('FAN-OUT', 'integer', 'fanout', 'Counts the number of output dependencies a class has, i.e, the number of other classes referenced by a particular class. In other words, given a class X, the fan-out of X is the number of classes called by X via attributes reference, method invocations, object instances, etc.'),
('DIT (Depth Inheritance Tree)', 'integer', 'dit', 'It counts the number of "fathers" a class has. All classes have DIT at least 1 (everyone inherits java.lang.Object). In order to make it happen, classes must exist in the project (i.e. if a class depends upon X which relies in a jar/dependency file, and X depends upon other classes, DIT is counted as 2).'),
('NOC (Number of Children)', 'integer', 'noc', 'It counts the number of immediate subclasses that a particular class has.'),
('Number of fields', 'integer', 'totalFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of static fields', 'integer', 'staticFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of public fields', 'integer', 'publicFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of private fields', 'integer', 'privateFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of protected fields', 'integer', 'protectedFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of default fields', 'integer', 'defaultFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of final fields', 'integer', 'finalFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of synchronized fields', 'integer', 'synchronizedFieldsQty', 'Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields.'),
('Number of methods', 'integer' ,'totalMethodsQty', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of static methods', 'integer' ,'staticMethodsQty', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of public methods', 'integer' ,'publicMethodsQty', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of private methods', 'integer' ,'privateMethodsQty', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of default methods', 'integer' ,'defaultMethodsQty', 'Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here.'),
('Number of visible methods', 'integer', 'visibleMethodsQty', 'Counts the number of visible methods. A method is visible if it is not private.'),
('Number of abstract methods', 'integer', 'abstractMethodsQty', 'Counts the number of visible methods. A method is visible if it is not private.'),
('Number of synchronized methods', 'integer', 'synchronizedMethodsQty', 'Counts the number of visible methods. A method is visible if it is not private.'),
('NOSI (Number of static invocations)', 'integer', 'nosi', 'Counts the number of invocations to static methods. It can only count the ones that can be resolved by the JDT.'),
('RFC (Response for a Class)', 'integer', 'rfc', 'Counts the number of unique method invocations in a class. As invocations are resolved via static analysis, this implementation fails when a method has overloads with same number of parameters, but different types.'),
('WMC (Weight Method Class) or McCabe''s complexity', 'integer', 'wmc', 'It counts the number of branch instructions in a class.'),
('LOC (Lines of code)', 'integer', 'loc', 'It counts the lines of count, ignoring empty lines and comments (i.e., it''s Source Lines of Code, or SLOC). The number of lines here might be a bit different from the original file, as we use JDT''s internal representation of the source code to calculate it.'),
('LCOM (Lack of Cohesion of Methods)', 'integer', 'lcom', 'Calculates LCOM metric. This is the very first version of metric, which is not reliable. LCOM-HS can be better (hopefully, you will send us a pull request).'),
('LCOM* (Lack of Cohesion of Methods)', 'float', 'lcom*', 'This metric is a modified version of the current version of LCOM implemented in CK Tool. LCOM* is a normalized metric that computes the lack of cohesion of class within a range of 0 to 1. Then, the closer to 1 the value of LCOM* in a class, the less the cohesion degree of this respective class. The closer to 0 the value of LCOM* in a class, the most the cohesion of this respective class. This implementation follows the third version of LCOM* defined in [1].'),
('TCC (Tight Class Cohesion)', 'float', 'tcc', 'Measures the cohesion of a class with a value range from 0 to 1. TCC measures the cohesion of a class via direct connections between visible methods, two methods or their invocation trees access the same class variable.'),
('LCC (Loose Class Cohesion)', 'float', 'lcc', 'Similar to TCC but it further includes the number of indirect connections between visible classes for the cohesion calculation. Thus, the constraint LCC >= TCC holds always.'),
('Quantity of returns', 'integer', 'returnQty', 'The number of return instructions.'),
('Quantity of loops', 'integer', 'loopQty', 'The number of loops (i.e., for, while, do while, enhanced for).'),
('Quantity of comparisons', 'integer', 'comparisonsQty', 'The number of comparisons (i.e., == and !=).'),
('Quantity of try/catches', 'integer', 'tryCatchQty', 'The number of try/catches.'),
('Quantity of parenthesized expressions', 'integer', 'parenthesizedExpsQty', 'The number of expressions inside parenthesis.'),
('String literals', 'integer', 'stringLiteralsQty', 'The number of string literals (e.g., "John Doe"). Repeated strings count as many times as they appear.'),
('Quantity of Number', 'integer', 'numbersQty', 'The number of numbers (i.e., int, long, double, float) literals.'),
('Quantity of Assignment Operations', 'integer', 'assignmentsQty', 'The number of math operations (times, divide, remainder, plus, minus, left shit, right shift).'),
('Quantity of Math Operations', 'integer', 'mathOperationsQty', 'The number of math operations (times, divide, remainder, plus, minus, left shit, right shift).'),
('Quantity of Variables', 'integer', 'variablesQty', 'Number of declared variables.'),
('Max nested blocks', 'integer', 'maxNestedBlocksQty', 'The highest number of blocks nested together.'),
('Quantity of Anonymous classes', 'integer', 'anonymousClassesQty', 'The name says it all. Note that whenever an anonymous class or an inner class is declared, it becomes an "entire new class", e.g., CK generates A.B and A.B$C, C being an inner class inside A.B. However, lambda expressions are not considered classes, and thus, are part of the class/method they are embedded into. A class or a method only has the number of inner classes that are declared at its level, e.g., an inner class that is declared inside a method M2, that is inside an anonymous class A, that is declared inside a method M, that finally is declared inside a class C, will not count in class C, but only in method M2 (first-level method it is embodied), and anonymous class A (first-level class it is embodied).'),
('Quantity of Inner classes', 'integer', 'innerClassesQty', 'The name says it all. Note that whenever an anonymous class or an inner class is declared, it becomes an "entire new class", e.g., CK generates A.B and A.B$C, C being an inner class inside A.B. However, lambda expressions are not considered classes, and thus, are part of the class/method they are embedded into. A class or a method only has the number of inner classes that are declared at its level, e.g., an inner class that is declared inside a method M2, that is inside an anonymous class A, that is declared inside a method M, that finally is declared inside a class C, will not count in class C, but only in method M2 (first-level method it is embodied), and anonymous class A (first-level class it is embodied).'),
('Quantity of Lambda expressions', 'integer', 'lambdasQty', 'The name says it all. Note that whenever an anonymous class or an inner class is declared, it becomes an "entire new class", e.g., CK generates A.B and A.B$C, C being an inner class inside A.B. However, lambda expressions are not considered classes, and thus, are part of the class/method they are embedded into. A class or a method only has the number of inner classes that are declared at its level, e.g., an inner class that is declared inside a method M2, that is inside an anonymous class A, that is declared inside a method M, that finally is declared inside a class C, will not count in class C, but only in method M2 (first-level method it is embodied), and anonymous class A (first-level class it is embodied).'),
('Number of unique words', 'integer', 'uniqueWordsQty', 'Number of unique words in the source code. At method level, it only uses the method body as input. At class level, it uses the entire body of the class as metrics. The algorithm basically counts the number of words in a method/class, after removing Java keywords. Names are split based on camel case and underline (e.g., longName_likeThis becomes four words). See WordCounter class for details on the implementation.'),
('Number of Log Statements', 'integer', 'logStatementsQty', 'Number of log statements in the source code. The counting uses REGEX compatible with SLF4J and Log4J API calls. See NumberOfLogStatements.java and the test examples (NumberOfLogStatementsTest and fixtures/logs) for more info.'),
('Has Javadoc', 'boolean', 'hasJavaDoc', 'Boolean indicating whether a method has javadoc. (Only at method-level for now)'),
('Quantity of parameters', 'integer', 'parametersQty', 'The number of return instructions.'),
('Modifiers', 'integer', 'modifiers', 'public/abstract/private/protected/native modifiers of classes/methods. Can be decoded using org.eclipse.jdt.core.dom.Modifier.'),
('Method invocations', 'integer', 'methodsInvokedQty', 'All directly invoked methods, variations are local invocations and indirect local invocations.'),
('Local Method invocations', 'integer', 'methodsInvokedLocalQty', 'All directly invoked methods, variations are local invocations and indirect local invocations.'),
('Indirect Method invocations', 'integer', 'methodsInvokedIndirectLocalQty', 'All directly invoked methods, variations are local invocations and indirect local invocations.')
`;

export const defaultDetectionStrategies = `INSERT INTO detectionStrategies (name, formula, description) VALUES
('Rezende (2023) Data Class Threshold', '[{"metric":{"metric_id":15,"name":"Number of methods","type":"integer","metric_input_id":"totalMethodsQty","description":"Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here."},"comparison":"<","comparisonValue":5},{"value":"&&"},{"metric":{"metric_id":3,"name":"FAN-IN","type":"integer","metric_input_id":"fanin","description":"Counts the number of input dependencies a class has, i.e, the number of classes that reference a particular class. For instance, given a class X, the fan-in of X would be the number of classes that call X by referencing it as an attribute, accessing some of its attributes, invoking some of its methods, etc."},"comparison":"<=","comparisonValue":2},{"value":"&&"},{"metric":{"metric_id":4,"name":"FAN-OUT","type":"integer","metric_input_id":"fanout","description":"Counts the number of output dependencies a class has, i.e, the number of other classes referenced by a particular class. In other words, given a class X, the fan-out of X is the number of classes called by X via attributes reference, method invocations, object instances, etc."},"comparison":"<=","comparisonValue":7},{"value":"&&"},{"metric":{"metric_id":31,"name":"Quantity of returns","type":"integer","metric_input_id":"returnQty","description":"The number of return instructions."},"comparison":"<=","comparisonValue":0},{"value":"&&"},{"metric":{"metric_id":13,"name":"Number of final fields","type":"integer","metric_input_id":"finalFieldsQty","description":"Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields."},"comparison":">=","comparisonValue":3},{"value":"&&"},{"metric":{"metric_id":39,"name":"Quantity of Math Operations","type":"integer","metric_input_id":"mathOperationsQty","description":"The number of math operations (times, divide, remainder, plus, minus, left shit, right shift)."},"comparison":"===","comparisonValue":0},{"value":"&&"},{"metric":{"metric_id":41,"name":"Max nested blocks","type":"integer","metric_input_id":"maxNestedBlocksQty","description":"The highest number of blocks nested together."},"comparison":"<","comparisonValue":1},{"value":"&&"},{"metric":{"metric_id":6,"name":"NOC (Number of Children)","type":"integer","metric_input_id":"noc","description":"It counts the number of immediate subclasses that a particular class has."},"comparison":"===","comparisonValue":0}]', 'test Description'),
('Rezende (2023) Large Class Threshold', '[{"metric":{"metric_id":26,"name":"LOC (Lines of code)","type":"integer","metric_input_id":"loc","description":"It counts the lines of count, ignoring empty lines and comments (i.e., its Source Lines of Code, or SLOC). The number of lines here might be a bit different from the original file, as we use JDTs internal representation of the source code to calculate it."},"comparison":">","comparisonValue":200},{"value":"&&"},{"metric":{"metric_id":15,"name":"Number of methods","type":"integer","metric_input_id":"totalMethodsQty","description":"Counts the number of methods. Specific numbers for total number of methods, static, public, abstract, private, protected, default, final, and synchronized methods. Constructor methods also count here."},"comparison":">","comparisonValue":12},{"value":"&&"},{"metric":{"metric_id":2,"name":"CBO Modified (Coupling between objects)","type":"integer","metric_input_id":"cboModified","description":"Counts the number of dependencies a class has. It is very similar to the CKTools original CBO. However, this metric considers a dependency from a class as being both the references the type makes to others and the references that it receives from other types."},"comparison":">=","comparisonValue":10},{"value":"&&"},{"metric":{"metric_id":8,"name":"Number of static fields","type":"integer","metric_input_id":"staticFieldsQty","description":"Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields."},"comparison":">","comparisonValue":1},{"value":"&&"},{"metric":{"metric_id":8,"name":"Number of static fields","type":"integer","metric_input_id":"staticFieldsQty","description":"Counts the number of fields. Specific numbers for total number of fields, static, public, private, protected, default, final, and synchronized fields."},"comparison":">","comparisonValue":3},{"value":"&&"},{"metric":{"metric_id":36,"name":"String literals","type":"integer","metric_input_id":"stringLiteralsQty","description":"The number of string literals (e.g., John Doe). Repeated strings count as many times as they appear."},"comparison":">","comparisonValue":3},{"value":"&&"},{"metric":{"metric_id":38,"name":"Quantity of Assignment Operations","type":"integer","metric_input_id":"assignmentsQty","description":"The number of math operations (times, divide, remainder, plus, minus, left shit, right shift)."},"comparison":">","comparisonValue":21},{"value":"&&"},{"metric":{"metric_id":40,"name":"Quantity of Variables","type":"integer","metric_input_id":"variablesQty","description":"Number of declared variables."},"comparison":">","comparisonValue":15}]', NULL),
('Rezende (2023) Feature Envy Threshold', '[{"metric":{"metric_id":4,"name":"FAN-OUT","type":"integer","metric_input_id":"fanout","description":"Counts the number of output dependencies a class has, i.e, the number of other classes referenced by a particular class. In other words, given a class X, the fan-out of X is the number of classes called by X via attributes reference, method invocations, object instances, etc."},"comparison":">","comparisonValue":15}]', NULL)
`;

export const defaultBadSmells = `INSERT INTO badSmells (name, scope, detectionStrategy_id, description) VALUES
("test", "test", 1, "test")
`; // TODO: Add Remaining Bad Smells
