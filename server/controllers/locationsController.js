import { queryLocation } from "../models/locations.js"
import { validateQueryParams } from "../helpers/paramValidator.js"

export const calculateLaborByLocation = async(req, res) => {
    const { workerIds, locationIds, includedTasks } = req.query
    const errors = await validateQueryParams(workerIds, locationIds, includedTasks)

    if (errors.length > 0) {
        return res.status(400).send({data: [], errors: errors})
    } else {
        const data = await queryLocation(workerIds, locationIds, includedTasks);

    console.log(req.query)
    return res.status(200).send({data: data, errors: []})
    }
};
