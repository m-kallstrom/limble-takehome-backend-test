CREATE TABLE locations (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=INNODB;

CREATE TABLE tasks (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  completed_at DATETIME,
  location_id INT(11) NOT NULL,

  FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE workers (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  hourly_wage DECIMAL(5, 2) NOT NULL
) ENGINE=INNODB;

CREATE TABLE logged_time (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  time_seconds INT(11) NOT NULL,
  location_id INT(11) NOT NULL,
  task_id INT(11) NOT NULL,
  worker_id INT(11) NOT NULL,

  FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE,
  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY(worker_id) REFERENCES workers(id) ON DELETE CASCADE
) ENGINE=INNODB;

INSERT INTO 
  locations (name) 
VALUES
  ("Jackson"),
  ("Diggs"),
  ("Boise"),
  ("Lakeview"),
  ("Cedarville"),
  ("No tasks location");


INSERT INTO
  tasks (description, completed_at, location_id)
VALUES
  ("change oil filter", null, 1),
  ("change transmission fluid", '2024-02-07T16:18:00.045', 1),
  ("replace shade motor", null, 2),
  ("rewire 12v socket", '2024-01-06T16:18:00.045', 2),
  ("sew blackout curtains", '2024-01-07T16:18:00.045', 3),
  ("recaulk roof", null, 4),
  ("unworked on task for a location with other worked on tasks", null, 4),
  ("unworked on task for a location with no worked on tasks", null, 5);

INSERT INTO
  workers (username, hourly_wage)
VALUES
  ("Alice", 150.00),
  ("Bob", 100.00),
  ("Chandran", 199.99),
  ("Daneen", 75.50),
  ("Newbie who hasn't worked yet", 123.45);

INSERT INTO
  logged_time (time_seconds, location_id, task_id, worker_id)
VALUES
  (3600, 1, 1, 1),
  (7200, 1, 1, 2),
  (3600, 1, 2, 3),
  (36000, 1, 2, 4),
  (3600, 2, 3, 3),
  (7200, 2, 4, 2),
  (360, 3, 5, 1),
  (3600, 4, 6, 1);
