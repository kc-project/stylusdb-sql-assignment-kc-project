// // src/index.js
// const parseQuery = require('../step8/queryParser');
// const readCSV = require('../step2/csvReader');

// async function executeSELECTQuery(query) {
//     const { fields, table, whereClauses } = parseQuery(query);
//     const data = await readCSV(`${table}.csv`);

//     // Apply WHERE clause filtering
//     // const filteredData = whereClauses.length > 0
//     //     ? data.filter(row => whereClauses.every(clause => {
//     //         // You can expand this to handle different operators
//     //         return row[clause.field] === clause.value;
//     // const filteredData = whereClauses.length > 0
//     // ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
//     // : data;
//         // }))
//         // : data;

//     // Select the specified fields
//     return filteredData.map(row => {
//         const selectedRow = {};
//         fields.forEach(field => {
//             selectedRow[field] = row[field];
//         });
//         return selectedRow;
//     });
// // src/index.js
// function evaluateCondition(row, clause) {
//     const { field, operator, value } = clause;
//     switch (operator) {
//         case '=': return row[field] === value;
//         case '!=': return row[field] !== value;
//         case '>': return row[field] > value;
//         case '<': return row[field] < value;
//         case '>=': return row[field] >= value;
//         case '<=': return row[field] <= value;
//         default: throw new Error(`Unsupported operator: ${operator}`);
//     }
// }
// }
// // src/index.js at executeSELECTQuery

// // Now we will have joinTable, joinCondition in the parsed query
// const { fields, table, whereClauses, joinTable, joinCondition } = parseQuery(query);
// let data = await readCSV(`${table}.csv`);

// // Perform INNER JOIN if specified
// if (joinTable && joinCondition) {
//     const joinData = await readCSV(`${joinTable}.csv`);
//     data = data.flatMap(mainRow => {
//         return joinData
//             .filter(joinRow => {
//                 const mainValue = mainRow[joinCondition.left.split('.')[1]];
//                 const joinValue = joinRow[joinCondition.right.split('.')[1]];
//                 return mainValue === joinValue;
//             })
//             .map(joinRow => {
//                 return fields.reduce((acc, field) => {
//                     const [tableName, fieldName] = field.split('.');
//                     acc[field] = tableName === table ? mainRow[fieldName] : joinRow[fieldName];
//                     return acc;
//                 }, {});
//             });
//     });
// }

// const filteredData = whereClauses.length > 0
//     ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
//     : data;

// module.exports = executeSELECTQuery;
// // src/index.js at executeSELECTQuery


const parseQuery = require('../step8/queryParser');
const readCSV = require('../step2/csvReader');



function evaluateCondition(row, clause) {
    const { field, operator, value } = clause;
    switch (operator) {
        case '=': return row[field] === value;
        case '!=': return row[field] !== value;
        case '>': return row[field] > value;
        case '<': return row[field] < value;
        case '>=': return row[field] >= value;
        case '<=': return row[field] <= value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

async function executeSELECTQuery(query) {
    const { fields, table, whereClauses, joinTable, joinCondition } = parseQuery(query);
    let data = await readCSV(`${table}.csv`);

    if (joinTable && joinCondition) {
        const joinData = await readCSV(`${joinTable}.csv`);
        data = data.flatMap(mainRow => {
            return joinData
                .filter(joinRow => {
                    const mainValue = mainRow[joinCondition.left.split('.')[1]];
                    const joinValue = joinRow[joinCondition.right.split('.')[1]];
                    return mainValue === joinValue;
                })
                .map(joinRow => {
                    return fields.reduce((acc, field) => {
                        const [tableName, fieldName] = field.split('.');
                        acc[field] = tableName === table ? mainRow[fieldName] : joinRow[fieldName];
                        return acc;
                    }, {});
                });
        });
    }

    const filteredData = whereClauses.length > 0
        ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
        : data;

    const selectedData = filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            const [tableName, fieldName] = field.split('.');
            selectedRow[field] = row[fieldName];
        });
        return selectedRow;
    });

    return selectedData;
}

module.exports = executeSELECTQuery;

