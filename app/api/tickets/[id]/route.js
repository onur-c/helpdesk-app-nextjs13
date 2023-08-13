import { NextResponse } from "next/server";

export const dynamics = "force-dynamic";

// underscore means to note that request(first parameter) is not used
export async function GET(_, { params }) {
  const res = await fetch(`http://localhost:4000/tickets/${params.id}`);
  const tickets = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Cannot find the ticket" },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(tickets, {
    status: 200,
  });
}
