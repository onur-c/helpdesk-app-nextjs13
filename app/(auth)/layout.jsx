import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/");
  }
  return (
    <div>
      <nav>
        <Link href="/">
          <h1>O-dev Helpdesk</h1>
        </Link>

        <Link href="/signup">Sign up</Link>
        <Link href="/signin">Sign in</Link>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
