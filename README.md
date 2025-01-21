# CS 348 - Undergrad Planner

## Requirements

- NextJS
- NodeJS:22.13.0
- MySQL:9.2.0

## Setting up databse
NOTE: Make sure you have mySQL Community Server (9.2.0 Innovation) installed.

1. Run `mysql -u root -p`
2. Create a new database by running `CREATE DATABASE {database_name};`
3. Exit out of the mySQL CLI by running `exit`
3. Import the MySQL database from the file `db_undergrad_planner.sql` by running `mysql -u root -p {database_name} < db_undergrad_planner.sql` (where database_name is the name you chose in step 2).
4. View the database by going back into the MySQL CLI and running SQL commands from there. An example is as follows

```
mysql -u root -p undergrad_planner;
SELECT * FROM student;
```