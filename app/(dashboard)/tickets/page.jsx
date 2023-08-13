import React, { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";

export const metadata = {
  title: "Tickets | O-dev Helpdesk",
  description: "Create, read, delete tickets. ",
};

const Tickets = () => {
  return (
    <main>
      <div>
        <h2>Tickets</h2>
        <p>Currently open tickets.</p>
      </div>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
};

export default Tickets;
