import { db_connect } from "../db/database.js"
import { buildWhereClauses } from "../helpers/whereClauseBuilder.js"

export const queryLocation = async (workerIds, locationIds, excludeIncomplete) => {
  const db = await db_connect();

  const whereClauses = await buildWhereClauses(workerIds, locationIds, excludeIncomplete)
  const query = await buildDbQuery(whereClauses);
  const data = await db.query(query);

  return data;
};

const buildDbQuery = async (whereClauses) => {
  const queryString = `SELECT wage_per_worker.l_id AS id, ROUND(SUM(wage_per_worker.worker_totals), 2) AS labor_total FROM (
                          SELECT
                            lt.location_id AS l_id,
                            lt.worker_id,
                            (w.hourly_wage * (SUM(lt.time_seconds) / 3600)) AS worker_totals
                         FROM logged_time lt 
                         INNER JOIN workers w
                           ON w.id=lt.worker_id 
                         INNER JOIN tasks t
                           ON t.id=lt.task_id
                         ${whereClauses}
                         GROUP BY lt.location_id, lt.worker_id
                      ) AS wage_per_worker
                      GROUP BY id`
                      console.log(queryString);
  return queryString;
};
