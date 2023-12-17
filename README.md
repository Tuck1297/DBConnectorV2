## Database Connector V2 Project

This project is the younger sibling of an initial idea created in participation of the .NET Aspire 2023 Hackathon. The intention of this project is to be a simple internal tool when interacting with databases being used with particular projects. Postgres is the initial database that this application will be built for, with intentions of integrating other databases as I begin working with them.

### Tech Stack

The initial tech stack for this application will focus on React.js and Next.js. Styling will be done with Bootstrap.js and maybe anime.js for other animation purposes. Will also most likely use Sequelize to interact with the database in the api endpoints.

### Scope of the project

#### General
- [X] Create a page that allows one to easily visualize queried data from execute panel
- [X] Allow state to be retained on Build, Execute and View pages until page is refreshed
- [X] Allow project while hosted on local machine easily work with local databases as well as remote ones
- [ ] when links are involved allow one to click on a link where a new page will open up to view the direction of the link
- [ ] integrate ai into build query component

- [ ] allow options to save commonly used and accessed queries for later use in a database - require table in database to store selected queries
- [ ] when page is refreshed panel currently in on database page will remain open (currently refresh to home page)
- [X] create a new panel called Manage - this is panel to access unique forms, delete database, delete tables, delete entire columns and perform other operations.
- [ ] look into feasability of being able to cancel a current database execution

#### Forms
- [X] Create a page that handles Executing database queries
- [ ] Select and delete multiple rows in a database (FEATURE TO CURRENT)
- [ ] delete a database itself - and also remove the connection to that database (NEW FORM)
- [X] easily craft simple queries by interacting with a ui
- [X] in execute and builder panels have a component that will allow user to view all tables (and their columns) within a specific database
- [ ] insert multiple rows of new data into a table at a time (NEW FORM)
- [ ] Manage columns in a particular table (NEW FORM) - still working on
- [ ] Manage Table (update name, delete) (Manage Panel - Module popup for both operations)
- [X] Update row data - (MODAL FORM)
- [ ] Add a new column to a table form

### NOTES
4. in postgres docs maybe have them be related to a page in notion account - when page is updated in the application it is updated on the notion page??? - believe there is a notion api that I can integrate...