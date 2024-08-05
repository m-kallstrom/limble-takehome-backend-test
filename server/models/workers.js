import { db_connect } from "../db/database.js";
import { buildWhereClauses } from "../helpers/whereClauseBuilder.js";

export const queryWorker = async (workerIds, locationIds, includedTasks) => {
  const db = await db_connect();

  const whereClauses = await buildWhereClauses(
    workerIds,
    locationIds,
    includedTasks,
  );
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
                       GROUP BY w.id`;
  return queryString;
};
