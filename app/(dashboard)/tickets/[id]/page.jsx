import React from "react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: `${ticket.id}`,
  }));
}

export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const { title } = await res.json();

  return {
    title: `${title} | O-dev Helpdesk `,
  };
}

const getTicket = async (id) => {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 100,
    },
  });
  if (!res.ok) notFound();

  return res.json();
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
