import React from "react";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DeleteButton from "@/app/components/DeleteButton";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

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
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: "no-cache",
  });

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
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const id = params.id;
  const ticket = await getTicket(id);
  return (
    <main>
      <h1 className="text-3xl">Ticket Details</h1>
      <div className="card">
        <div className="ml-auto">
          {data.session.user.email === ticket.user_email && (
            <DeleteButton
              id={ticket.id}
              classNames="btn-warning absolute top-0 right-0"
            />
          )}
        </div>
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
