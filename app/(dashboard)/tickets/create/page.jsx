"use client";

import CreateTicketForm from "@/app/components/CreateTicketForm";
import React from "react";

const CreateTicket = () => {
  return (
    <main>
      <h2 className="text-primary text-center">Create new Ticket</h2>
      <CreateTicketForm />
    </main>
  );
};

export default CreateTicket;
