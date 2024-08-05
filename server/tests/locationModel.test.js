import { queryLocation } from "../models/locations.js"
import { db_connect } from "../db/database.js"
import { jest } from '@jest/globals'

describe ('No params are passed', () => {
  test('it returns all worker records for all tasks at all locations', async () => {  
    const expected_data = [
      { "id":1, "labor_total":"1304.99" },
      { "id":2, "labor_total":"399.99" },
      { "id":3, "labor_total":"15.00" },
      { "id":4, "labor_total":"150.00" }
    ]

    const result = await queryLocation()

    expect(result).toEqual(expected_data);
  });
});

describe ('a string of specific worker ids are passed', () => {
  test('it returns only data for the specified workers but at all locations with all tasks', async () => {   
    const expected_data = [
        { "id": 1, "labor_total": "150.00" },
        { "id": 3, "labor_total": "15.00" },
        { "id": 4, "labor_total": "150.00" }
    ]
    const result = await queryLocation("1", undefined, undefined)

    expect(result).toEqual(expected_data);
  });

  test('it returns an empty data set if requesting records for a worker who has no logged time', async () => {
    const expected_data = []
    const result = await queryLocation("5", undefined, undefined)

    expect(result).toEqual(expected_data);
  });
});

describe ('not all tasks are included', () => {
  test('it returns all worker records from all locations but only for complete tasks', async () => {
    const expected_data = [
      { "id":1, "labor_total":"954.99" },
      { "id":2, "labor_total":"200.00" },
      { "id":3, "labor_total":"15.00" }
    ]
    const result = await queryLocation(undefined, undefined, "complete")

    expect(result).toEqual(expected_data);
  });

  test('it returns all worker records from all locations but only for incomplete tasks', async () => {
    const expected_data = [
      { "id":1, "labor_total":"350.00" },
      { "id":2, "labor_total":"199.99" },
      { "id":4, "labor_total":"150.00" }
    ]
    const result = await queryLocation(undefined, undefined, "incomplete")

    expect(result).toEqual(expected_data);
  });
});

describe ('a string of specific location ids are passed', () => {
  test('it returns all worker records for all tasks but only from the specified locations', async () => {
    const expected_data = [
      { "id":1,"labor_total":"1304.99" },
      { "id":4,"labor_total":"150.00" }
    ]
    const result = await queryLocation(undefined, "1,4", undefined)

    expect(result).toEqual(expected_data);
  });

  test('it returns an empty data set if requesting records for a location with no logged time', async () => {
    const expected_data = []
    const result = await queryLocation(undefined, "8", undefined)

    expect(result).toEqual(expected_data);
  });
});


describe ('incomplete tasks excluded, specific worker ids, specific location ids', () => {
  test('it returns only the specified worker records from the specified locations for complete tasks', async () => {
    const expected_data = [
      {"id":1, "labor_total":"755.00"}
    ]
    const result = await queryLocation("4", "1", "complete")

    expect(result).toEqual(expected_data);
  });
});


