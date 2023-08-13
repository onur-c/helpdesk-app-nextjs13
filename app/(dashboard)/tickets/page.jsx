import React, { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";
import { IoIosCreate } from "react-icons/io";

export const metadata = {
  title: "Tickets | O-dev Helpdesk",
  description: "Create, read, delete tickets. ",
};

const Tickets = () => {
  return (
    <main>
      <div className="flex">
        <div>
          <h2 className="text-3xl">Tickets</h2>
          <p>Currently open tickets.</p>
        </div>

        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary p-3 text-lg">
            <IoIosCreate />
            Create Ticket
          </button>
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
};

export default Tickets;
