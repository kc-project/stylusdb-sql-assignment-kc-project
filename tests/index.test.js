// tests/index.test.js

// test('Basic Jest Test', () => {
//     expect(1).toBe(1);
//   });

// tests/index.test.js

// const readCSV = require('../step2/csvReader');

// test('Read CSV File', async () => {
//     const data = await readCSV('./sample.csv');
//     expect(data.length).toBeGreaterThan(0);
//     expect(data.length).toBe(3);
//     expect(data[0].name).toBe('John');
//     expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
// });
// src/index.js




// tests/index.test.js

// const executeSELECTQuery = require('../step4/index.js');

// test('Execute SQL Query', async () => {
//     const query = 'SELECT id, name FROM sample';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBeGreaterThan(0);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0]).not.toHaveProperty('age');
//     expect(result[0]).toEqual({ id: '1', name: 'John' });
// });
// tests/index.test.js

//5 & 6 
// tests/index.test.js

//const executeSELECTQuery = require('../step6/index.js');

// test('Execute SQL Query with WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 25';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0].id).toBe('2');
// });


//6
// src/index.js
//7
// const parseQuery = require('../step7/queryParser');
// const executeSELECTQuery = require('../step7/index.js');
// test('Parse SQL Query with Multiple WHERE Clauses', () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
//     const parsed = parseQuery(query);
//     expect(parsed).toEqual({
//         fields: ['id', 'name'],
//         table: 'sample',
//         whereClauses: [{
//             "field": "age",
//             "operator": "=",
//             "value": "30",
//         }, {
//             "field": "name",
//             "operator": "=",
//             "value": "John",
//         }]
//     });
// });

// test('Execute SQL Query with Multiple WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toEqual({ id: '1', name: 'John' });
// });
//6
// module.exports = executeSELECTQuery;

// tests/index.test.js

// tests/index.test.js
// const parseQueryequery = require('../step7/queryParser.js');
// const executeSELECTQuery = require('../step7/index.js');

// test('Execute SQL Query with Greater Than', async () => {
//     const queryWithGT = 'SELECT id FROM sample WHERE age > 22';
//     const result = await executeSELECTQuery(queryWithGT);
//     expect(result.length).toEqual(2);
//     expect(result[0]).toHaveProperty('id');
// });

// test('Execute SQL Query with Not Equal to', async () => {
//     const queryWithGT = 'SELECT name FROM sample WHERE age != 25';
//     const result = await executeSELECTQuery(queryWithGT);
//     expect(result.length).toEqual(2);
//     expect(result[0]).toHaveProperty('name');
// });
//7

//8
const readCSV = require('../step2/csvReader');
const parseQuery = require('../step8/queryParser');
const executeSELECTQuery = require('../step8/index.js');


test('Read CSV File', async () => {
    const data = await readCSV('./student.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
});

test('Parse SQL Query', () => {
    const query = 'SELECT id, name FROM student';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        whereClauses: [],
        joinCondition: null,
        joinTable: null
    });
});

test('Execute SQL Query', async () => {
    const query = 'SELECT id, name FROM student';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).not.toHaveProperty('age');
    expect(result[0]).toEqual({ id: '1', name: 'John' });
});

test('Parse SQL Query with WHERE Clause', () => {
    const query = 'SELECT id, name FROM student WHERE age = 25';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        whereClauses: [{
            "field": "age",
            "operator": "=",
            "value": "25",
        }],
        joinCondition: null,
        joinTable: null
    });
});

test('Execute SQL Query with WHERE Clause', async () => {
    const query = 'SELECT id, name FROM student WHERE age = 25';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0].id).toBe('1');
});

test('Parse SQL Query with Multiple WHERE Clauses', () => {
    const query = 'SELECT id, name FROM student WHERE age = 30 AND name = John';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        whereClauses: [{
            "field": "age",
            "operator": "=",
            "value": "30",
        }, {
            "field": "name",
            "operator": "=",
            "value": "John",
        }],
        joinCondition: null,
        joinTable: null
    });
});

test('Execute SQL Query with Complex WHERE Clause', async () => {
    const query = 'SELECT id, name FROM student WHERE age = 30 AND name = John';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ id: '1', name: 'John' });
});

test('Execute SQL Query with Greater Than', async () => {
    const queryWithGT = 'SELECT id FROM student WHERE age > 22';
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty('id');
});

test('Execute SQL Query with Not Equal to', async () => {
    const queryWithGT = 'SELECT name FROM student WHERE age != 25';
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty('name');
});

test('Parse SQL Query with INNER JOIN', async () => {
    const query = 'SELECT student.name, enrollment.course FROM student INNER JOIN enrollment ON student.id=enrollment.student_id';
    const result = await parseQuery(query);
    expect(result).toEqual({
        fields: ['student.name', 'enrollment.course'],
        table: 'student',
        whereClauses: [],
        joinTable: 'enrollment',
        joinCondition: { left: 'student.id', right: 'enrollment.student_id' }
    })
});

test('Parse SQL Query with INNER JOIN and WHERE Clause', async () => {
    const query = 'SELECT student.name, enrollment.course FROM student INNER JOIN enrollment ON student.id = enrollment.student_id WHERE student.age > 20';
    const result = await parseQuery(query);
    expect(result).toEqual({
        fields: ['student.name', 'enrollment.course'],
        table: 'student',
        whereClauses: [{ field: 'student.age', operator: '>', value: '20' }],
        joinTable: 'enrollment',
        joinCondition: { left: 'student.id', right: 'enrollment.student_id' }
    })
});

test('Execute SQL Query with INNER JOIN', async () => {
    const query = 'SELECT student.name, enrollment.course FROM student INNER JOIN enrollment ON student.id=enrollment.student_id';
    const result = await executeSELECTQuery(query);
    /*
    result = [
      { 'student.name': 'John', 'enrollment.course': 'Mathematics' },
      { 'student.name': 'John', 'enrollment.course': 'Physics' },
      { 'student.name': 'Jane', 'enrollment.course': 'Chemistry' },
      { 'student.name': 'Bob', 'enrollment.course': 'Mathematics' }
    ]
    */
    expect(result.length).toEqual(4);
    // toHaveProperty is not working here due to dot in the property name
    expect(result[0]).toEqual(expect.objectContaining({
        "enrollment.course": "Mathematics",
        "student.name": "John"
    }));
});

test('Execute SQL Query with INNER JOIN and a WHERE Clause', async () => {
    const query = 'SELECT student.name, enrollment.course, student.age FROM student INNER JOIN enrollment ON student.id = enrollment.student_id WHERE student.age > 25';
    const result = await executeSELECTQuery(query);
    /*
    result =  [
      {
        'student.name': 'John',
        'enrollment.course': 'Mathematics',
        'student.age': '30'
      },
      {
        'student.name': 'John',
        'enrollment.course': 'Physics',
        'student.age': '30'
      }
    ]
    */
    expect(result.length).toEqual(2);
    // toHaveProperty is not working here due to dot in the property name
    expect(result[0]).toEqual(expect.objectContaining({
        "enrollment.course": "Mathematics",
        "student.name": "John"
    }));
});