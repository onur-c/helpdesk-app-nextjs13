import DeleteButton from "@/app/components/DeleteButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const getTickets = async () => {
  const res = await fetch(`http://localhost:3000/api/tickets`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return data;
};

const TicketList = async () => {
  const tickets = await getTickets();
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <div>
      {tickets &&
        tickets.map((ticket) => (
          <>
            <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
              <div className="card my-5">
                <h3 className="flex">
                  {ticket.title}&nbsp;
                  {data.session.user.email === ticket.user_email && (
                    <span className="opacity-60 italic ml-auto">
                      (created by you)
                    </span>
                  )}
                </h3>
                <p>{ticket.body.slice(0, 200)}...</p>
                <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div>
              </div>
            </Link>
          </>
        ))}
      {tickets.length === 0 && <p className="text-center">No open tickets.</p>}
    </div>
  );
};

export default TicketList;
