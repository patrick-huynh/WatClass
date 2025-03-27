# 🏫 WatClass

Explore hundreds of courses and plan all your study terms at the University of Waterloo with this all-in-one platform.

CS 348 Project Group Members: Ed, Edward, Rainbow, Aadar, Patrick

## Requirements

- NextJS
- NodeJS:22.13.0
- MySQL Community Server:9.2.0

## Setting up the sample database

- Run `mysql -u root -p < setup/create_db_sample.sql`. The script creates the database "WatClass" and loads sample data into the tables

## Setting up the production database

- Run `mysql --local_infile=1 -u root -p < setup/create_db.sql`. The script creates the database "WatClass" and loads production data into the tables
- View the database by going back into the MySQL CLI with `mysql -u root -p WatClass` and running SQL commands from there. An example is as follows

```
mysql -u root -p WatClass;
SELECT * FROM Courses;
```

## Running the database with the web app

1. Setup your `.env.local` with your mysql root password
2. Run `cd src; npm i; npm run dev`

## Currently supported features

1. Loading info on all courses & sorting by course code or name
2. Loading aggregate metrics (average rating) across courses in each subject
3. Favouritng courses on the courses list for viewing later, saved to user's account
4. A questionnaire for giving course recommendations
5. Sign up/log in to view saved favourite courses
6. Adding new courses - feature only available for users with professor roles
