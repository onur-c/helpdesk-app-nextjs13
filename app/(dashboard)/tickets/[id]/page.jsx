import React from "react";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamicParams = true;

// export async function generateStaticParams() {

//   const res = await fetch("http://localhost:4000/tickets");

//   const tickets = await res.json();

//   return tickets.map((ticket) => ({
//     id: `${ticket.id}`,
//   }));
// }

export async function generateMetadata({ params }) {
  const id = params.id;
  const { title } = await getTicket(id);

  return {
    title: `${title || "Not Found"} | O-dev Helpdesk `,
  };
}

const getTicket = async (id) => {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  // const supabase = createServerComponentClient({ cookies });

  // const { data, error } = await supabase
  //   .from("tickets")
  //   .select()
  //   .eq("id", id)
  //   .single();

  // if (error || !data) notFound();

  return data;
};

const TicketDetail = async ({ params }) => {
  const id = params.id;
  const ticket = await getTicket(id);
  return (
    <main>
      <h2>Ticket Details</h2>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};
export default TicketDetail;
