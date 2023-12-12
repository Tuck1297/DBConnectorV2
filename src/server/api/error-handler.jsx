import { NextResponse } from "next/server";

export { errorHandler };

function errorHandler(error) {
  console.log("errorHandler error tostring: ", error.toString());
  console.log("errorHandler error: ", error);

  if (typeof error === "string") {
    const is404 = error.toLowerCase().includes("not found");
    const statusCode = is404 ? 404 : 400;
    return NextResponse.json({ message: error }, { status: statusCode });
  }
  if (typeof error === "object" && error.name === "ZodError") {
    // const parsedErr = JSON.parse(err);
    let message = error.issues[0].message;
    let is404 = 404;
    if (message.indexOf("must") <= -1 || message.indexOf("expected") <= -1) {
      // console.log("is 400 message");
      is404 = 400;
    }
    return NextResponse.json({ message }, { status: is404 });
  }
  if (error.toString() != null) {
    return NextResponse.json({ message: error.toString() }, { status: 400 });
  }
  return NextResponse.json(
    {
      message:
        "Internal server error. Please check your query parameters and/or data payload and try again.",
    },
    { status: 500 }
  );
}
