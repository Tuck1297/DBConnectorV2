import { db } from "./db";

export { apiSetup };

async function apiSetup(request, connectToDB = false, session = null) {
  if (!session) {
    throw "Operation not allowed.";
  }

  if (connectToDB) {
    if (!db.initialized) {
      await db.initialize();
    }
  }
  return;
}
