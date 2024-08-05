export const validateQueryParams = async(workerIds, locationIds, excludeIncomplete) => {
  const errors = [];

  if (!validString(workerIds)) {
    errors.push("workerIds must be a string of comma-separated integers");
  };

  if (!validString(locationIds)) {
    errors.push("locationIds must be a string of comma-separated integers");
  };

  if (!isBool(excludeIncomplete)) {
    errors.push("excludeIncomplete must have a value of true or false")
  };

  return errors;
};

function validString(param) {
  return /^[0-9][0-9,]*$/.test(param) || typeof param == 'undefined';
};

function isBool(param) {
  return param === "true" || param === "false" || typeof param == 'undefined';
};
