import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex text-center flex-col m-auto">
      <h1>Something went wrong. No ticket found </h1>
      <p>
        We couldnt find the page you were looking for. Go back to the&nbsp;
        <Link href="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
