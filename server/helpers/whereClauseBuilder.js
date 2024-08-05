export const buildWhereClauses = async (workerIds, locationIds, excludeIncomplete) => {
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
