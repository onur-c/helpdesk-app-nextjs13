import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/o-dev-logo.png";
import LogoutButton from "./LogoutButton";

const Navbar = ({ user }) => {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Helpdesk logo"
        width={40}
        height={40}
        placeholder="blur"
      />
      <h1>O-dev Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      {user && <span className="ml-auto">Hello, {user.email}</span>}
      {user && <LogoutButton />}
    </nav>
  );
};

export default Navbar;
