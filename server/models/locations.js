import { db_connect } from "../db/database.js"

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



const buildWhereClauses = async (workerIds, locationIds, excludeIncomplete) => {
  const whereClauses = [];

  if (typeof workerIds != 'undefined') {
    whereClauses.push(`w.id IN (${workerIds})`);
  }; 

  if (typeof locationIds != 'undefined') {
    whereClauses.push(`lt.location_id IN (${locationIds})`)
  };

  if (typeof excludeIncomplete != 'undefined' && excludeIncomplete === "true") {
    whereClauses.push("t.completed_at IS NOT NULL");
  };

  if (whereClauses.length >= 1) {
    return (`WHERE ${whereClauses.join(' AND ')}`)
  } else {
    return ""
  };
};