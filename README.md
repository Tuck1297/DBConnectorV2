## Database Connector V2 Project

This project is the younger sibling of an initial idea created in participation of the .NET Aspire 2023 Hackathon. The intention of this project is to be a simple internal tool when interacting with databases being used with particular projects. Postgres is the initial database that this application will be built for, with intentions of integrating other databases as I begin working with them.

### Tech Stack

The initial tech stack for this application will focus on React.js and Next.js. Styling will be done with Bootstrap.js and maybe anime.js for other animation purposes. Will also most likely use Sequelize to interact with the database in the api endpoints.

### Initial Scope of the project

-[] Create a page that handles Executing database queries that have been previously saved and used
-[] Create a page that allows one to easily visualize data 25 rows at a time, organize the rows based by certain columns and be able to update or delete a particular row in the database.
-[] Select and delete multiple rows in a database
-[] delete a table in a database
-[] delete a database itself
-[] set up specific schemas within a database (public and other custom schemas)
-[] when links are involved allow one to click on a link where a new page will open up to view the direction of the link
-[] easily craft simple queries by interacting with a ui (even integrate a ai component eventually...)
-[] insert multiple rows of new data into a table at a time (unique form for this)
-[] upsert information to a database if it is allowed
-[] access every table and be able to insert any kind of value into a database (alot to consider in this one (start with common and integrate new values as they appear))
-[] allow options to save commonly used and accessed queries for later use in a database

#### when integrate into the cloud -- if I ever get this far
-[] be able to sign in as a particular user
-[] integrate google auth with next-auth library