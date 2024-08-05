export const buildWhereClauses = async (
  workerIds,
  locationIds,
  includedTasks,
) => {
  const whereClauses = [];

  if (typeof workerIds !== "undefined") {
    whereClauses.push(`w.id IN (${workerIds})`);
  }

  if (typeof locationIds !== "undefined") {
    whereClauses.push(`lt.location_id IN (${locationIds})`);
  }

  if (typeof includedTasks !== "undefined") {
    if (includedTasks === "complete") {
      whereClauses.push("t.completed_at IS NOT NULL");
    } else if (includedTasks === "incomplete") {
      whereClauses.push("t.completed_at IS NULL");
    }
  }

  return whereClauses.length >= 1 ? `WHERE ${whereClauses.join(" AND ")}` : "";
};
