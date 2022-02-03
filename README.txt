In order to start this application navigate to the ./server directory and type in the command line "npm start"

This will start both the front-end client application and back-end server.

Concurrently is a dependancy that was installed in the server directory which allows you to create custom scripts. If you check
the package.json file in the ./server directory you'll see the concurrently script.

If the package concurrently wasn't installed then you would have to:

    1. Navigate to ./client and run "npm start"
    2. Navigate to ./server and run "nodemon index.js"

Concurrently allows us to run both these commands from one place.

----------------------------------------------------------------------------------

In order to login to the database and look at tables and databases you can open command prompt and follow the below commands:

    1. type "psql -U postgres"
    2. enter password which is "password"
    3. type "\l" to list all databases
    4. type "\c perntodo" to connect to the perntodo database
    5. begin writing SQL select statements, inserts, etc.

