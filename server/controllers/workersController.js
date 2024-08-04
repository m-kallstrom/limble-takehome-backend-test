import { queryWorker } from "../models/workers.js"

export const calculateLaborByWorker = async(req, res) => {
    const { workerIds, locationIds, excludeIncomplete } = req.query
    // validate the params

    const data = await queryWorker(workerIds, locationIds, excludeIncomplete);

    console.log(req.query)
    // call a formatter for the data?
    return res.status(200).send({data: data, errors: []})
};
