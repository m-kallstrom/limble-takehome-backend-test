# About

## Querying

There are two endpoints for getting data for the different types of graphs:
```
 GET/worker_costs
 GET/location_costs
```

Querying without any params will return labor costs for all task states from all locations for all workers.
This can be modified for either endpoint by using any combination of the following params:

```
includedTasks:  a string of either "complete" or "incomplete"
workerIds:  a comma-separated string of integers
locationIds:  a comma-separated string of integers
```

Examples for each endpoint:

```
http://localhost:3000/worker_costs?workerIds=8,10,11,27&locationIds=5&includedTasks=incomplete
http://localhost:3000/location_costs?workerIds=1,2,3,4,5&locationIds=2,3,4,5&includedTasks=complete
```

A successful 200 response will return data in this format:

```json
data : [
  { "id": 1, "labor_total": "150.00" },
  { "id": 3, "labor_total": "15.00" },
  { "id": 4, "labor_total": "150.00" }
 ],
errors: []
```
* id here will always refer to the id of the sort of object the endpoint is for


Invalid queries will result in a 400 response and return error messages in this format:

```json
data : [],
errors: [
   "locationIds must be a string of comma-separated integers"
 ]
```

If there are no results for that particular set of params, it will return an empty data set like this:

```json
data : [],
errors: []
```

## Things I would improve with more time

- An independent test db with a seed file for more robust tests.
- Refactor the way params are passed through the app. This is a very Ruby way of moving data around and using it for conditionals, and I would ask for feedback on alternative ways of doing this.
- Better validation and error handling, based on discussion about how the errors will be used and displayed on the frontend.


# Installation

## Docker

To set up the environment, you will need to first install [Docker](https://docs.docker.com/engine/install/).
This test uses Docker Compose to run everything.

## Backend Server

The backend server uses Node.js, but you don't need to have that installed on your machine. You can install
the dependencies by running:

```bash
docker compose run server npm i
```

## Database

To bring up the database:

```bash
docker compose up -d db
```

Once it's ready to go, you can run the schema migrator to build the schema:

```bash
docker compose run migrate
```

If that fails (because of something like an already existing table), you can always start with a clean slate
by bringing the DB container down:

```bash
docker compose down
```
