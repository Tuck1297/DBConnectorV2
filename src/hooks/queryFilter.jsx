export const queryFilter = (queries) => {
  const { dbconnectid, ...allQueries } = queries;
  const allValues = Object.values(allQueries);
  let selectCount = 0;
  let invalidQueryType = null;
  console.log("allValues: ", allValues);
  allValues.forEach((query) => {
    if (query.toUpperCase().includes("SELECT")) {
      selectCount++;
    }
    // extract first word from query and match it with one of valid query types
    const queryType = query.split(" ")[0].toUpperCase();

    switch (queryType) {
      case "SELECT":
        break;
      case "UPDATE":
        break;
      case "DELETE":
        break;
      case "INSERT":
        break;
      case "CREATE":
        break;
      case "ALTER":
        break;
      case "DROP":
        break;
      case "TRUNCATE":
        break;
      case "ALTER":
        break;
      case "GRANT":
        break;
      case "REVOKE":
        break;
      case "COMMIT":
        break;
      case "ROLLBACK":
        break;
      default:
        invalidQueryType = queryType;
        break;
    }
  });
  if (invalidQueryType != null) {
    return `${invalidQueryType} is an invalid query type.`;
  }

  if (selectCount > 1) {
    return "Only one SELECT query is allowed at a time.";
  }
  return null;
};
