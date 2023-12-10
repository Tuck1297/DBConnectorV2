//import database for connection purposes
// import database interaction repo 

export { apiSetup };

async function apiSetup(request, connectToDB = false) {
    if (connectToDB) {
        // connect to db
        console.log("Connecting to DB...")
    }
    return;
}