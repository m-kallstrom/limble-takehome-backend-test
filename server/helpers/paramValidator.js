export const validateQueryParams = async (
  workerIds,
  locationIds,
  includedTasks,
) => {
  const errors = [];

  if (!validNumberString(workerIds)) {
    errors.push("workerIds must be a string of comma-separated integers");
  }

  if (!validNumberString(locationIds)) {
    errors.push("locationIds must be a string of comma-separated integers");
  }

  if (!validTaskType(includedTasks)) {
    errors.push(
      "includedTasks must have a value of 'complete' or 'incomplete'",
    );
  }

  return errors;
};

function validNumberString(param) {
  return /^[0-9][0-9,]*$/.test(param) || typeof param == "undefined";
}

function validTaskType(param) {
  return (
    param === "complete" ||
    param === "incomplete" ||
    typeof param == "undefined"
  );
}
