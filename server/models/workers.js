import { db_connect } from "../db/database.js"

export const queryWorker = async (workerIds, locationIds, excludeIncomplete) => {
  const db = await db_connect();

  const whereClauses = await buildWhereClauses(workerIds, locationIds, excludeIncomplete)
  const query = await buildDbQuery(whereClauses);
  const data = await db.query(query);

  return data;
};

const buildDbQuery = async (whereClauses) => {
  const queryString = `SELECT
                          w.id,
                          ROUND((w.hourly_wage * (SUM(lt.time_seconds) / 3600)), 2) AS labor_total
                       FROM workers w 
                       INNER JOIN logged_time lt 
                         ON w.id=lt.worker_id 
                       INNER JOIN tasks t
                         ON t.id=lt.task_id
                       ${whereClauses}
                       GROUP BY w.id`
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

  if (typeof excludeIncomplete != 'undefined' && excludeIncomplete === true) {
    whereClauses.push("t.completed_at IS NOT NULL");
  };

  if (whereClauses.length >= 1) {
    return (`WHERE ${whereClauses.join(' AND ')}`)
  } else {
    return ""
  };
};