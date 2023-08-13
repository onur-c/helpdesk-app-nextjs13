import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamics = "force-dynamic";

// underscore means to note that request(first parameter) is not used
export async function GET(_, { params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: dataDB, error: errorDB } = await supabase
    .from("tickets")
    .select()
    .eq("id", params.id)
    .single();

  if (errorDB) {
    return NextResponse.json(
      {
        error: errorDB.message,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(dataDB, {
    status: 200,
  });

  // const res = await fetch(`http://localhost:4000/tickets/${params.id}`);
  // const tickets = await res.json();

  // if (!res.ok) {
  //   return NextResponse.json(
  //     { error: "Cannot find the ticket" },
  //     {
  //       status: 404,
  //     }
  //   );
  // }
  // return NextResponse.json(tickets, {
  //   status: 200,
  // });
}

export async function DELETE(_, { params }) {
  const id = params.id;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("tickets").delete().eq("id", id);

  return NextResponse.json({
    error,
  });
}
