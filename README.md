## Database Connector V2 Project

This project is the younger sibling of an initial idea created in participation of the .NET Aspire 2023 Hackathon. The intention of this project is to be a simple internal tool when interacting with databases being used with particular projects. Postgres is the initial database that this application will be built for, with intentions of integrating other databases as I begin working with them.

### Tech Stack

The initial tech stack for this application will focus on React.js and Next.js. Styling will be done with Bootstrap.js and maybe anime.js for other animation purposes. Will also most likely use Sequelize to interact with the database in the api endpoints.

### Initial Scope of the project

- [ ] Create a page that handles Executing database queries that have been previously saved and used
- [X] Create a page that allows one to easily visualize queried data from execute panel
- [ ] Select and delete multiple rows in a database
- [ ] delete a table in a database
- [ ] delete a database itself
- [ ] set up specific schemas within a database (public and other custom schemas)
- [ ] when links are involved allow one to click on a link where a new page will open up to view the direction of the link
- [ ] easily craft simple queries by interacting with a ui (even integrate a ai component eventually...)
- [ ] insert multiple rows of new data into a table at a time (unique form for this)
- [ ] upsert information to a database if it is allowed
- [ ] access every table and be able to insert any kind of value into a database (alot to consider in this one (start with common and integrate new values as they appear))
- [ ] allow options to save commonly used and accessed queries for later use in a database
- [ ] when page is refreshed panel currently in on database page will remain open (currently refresh to home page)

#### when integrate into the cloud -- if I ever get this far
- [X] be able to sign in as a particular user
- [X] integrate google auth with next-auth library

### NOTES
1. Review page overextending error ~ table is causing style issue
2. only allow one select query to exeucte at a time on the execute panel - when done automatically switch to view panel to see the queried data but also retain the query
that retrieved that data in the execute panel text area where the query was written
3. have a form on the data view page that will allow easy addition of a row
4. in postgres docs maybe have them be related to a page in notion account - when page is updated in the application it is updated on the notion page??? - believe there is a notion api that I can integrate...