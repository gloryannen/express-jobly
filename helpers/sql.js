const { BadRequestError } = require("../expressError");

/**
 * [Update database with partial data]
 * @param dataToUpdate Object with key/val - ex: {firstName: "Aliya", age: 32}
 * @param jsToSql Object with JS keys and values as SQL database column names - ex: {firstName: "first_name"}
 * @returns { Object } {setCols: stringOfColumnNames, values: valueFromDataToUpdate} - ex : {setCols: "first_name"=$1, values: 'Aliya'}
 * */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);

  // console.log("KEYS ===", keys, "=== KEYS");

  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  // console.log("jsToSql ===", jsToSql, "=== jsToSql");
  // console.log("COLS ===", cols, "=== COLS");
  // console.log("setCols ===", cols.join(", "), "=== setCols");
  // console.log("values ===", Object.values(dataToUpdate), "=== values");

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
