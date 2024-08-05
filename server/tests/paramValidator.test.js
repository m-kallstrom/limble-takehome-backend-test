import { validateQueryParams } from "../helpers/paramValidator.js"
import { jest } from '@jest/globals'

describe ('All params are valid', () => {
  test('it returns an empty errors array', async () => {
    const expected_data = []

    expect( await validateQueryParams("1,2,3,4,5", "21,22,23,24,25", "true")).toEqual(expected_data);
  });
});

describe ('All params are invalid', () => {
  test('it returns a descriptive error for each invalid param', async () => {
    const expected_data = [ "workerIds must be a string of comma-separated integers",
                            "locationIds must be a string of comma-separated integers",
                            "excludeIncomplete must have a value of true or false" ]

    expect( await validateQueryParams("false", "1,2,3'); DROP TABLE Students;--", "yes, please")).toEqual(expected_data)
  });
});