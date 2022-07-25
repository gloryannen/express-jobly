const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("Generate Partial SQL", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya" },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Aliya"],
    });
  });
});
