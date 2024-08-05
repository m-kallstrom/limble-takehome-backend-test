import { queryWorker } from "../models/workers.js"
import { validateQueryParams } from "../helpers/paramValidator.js"

export const calculateLaborByWorker = async(req, res) => {
    const { workerIds, locationIds, includedTasks } = req.query
    const errors = await validateQueryParams(workerIds, locationIds, includedTasks)

    if (errors.length > 0) {
        return res.status(400).send({data: [], errors: errors})
    } else {
        const data = await queryWorker(workerIds, locationIds, includedTasks);

    console.log(req.query)
    // call a formatter for the data?
    return res.status(200).send({data: data, errors: []})
    }
};
