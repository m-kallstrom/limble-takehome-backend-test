export const buildWhereClauses = async (workerIds, locationIds, includedTasks) => {
  const whereClauses = [];

  if (typeof workerIds != 'undefined') {
    whereClauses.push(`w.id IN (${workerIds})`);
  }; 

  if (typeof locationIds != 'undefined') {
    whereClauses.push(`lt.location_id IN (${locationIds})`)
  };

  if (typeof includedTasks != 'undefined') {
    if (includedTasks === "complete") {
      whereClauses.push("t.completed_at IS NOT NULL");
    } else if (includedTasks === "incomplete") {
      whereClauses.push("t.completed_at IS NULL");
    }
  };

  if (whereClauses.length >= 1) {
    return (`WHERE ${whereClauses.join(' AND ')}`)
  } else {
    return ""
  };
};
