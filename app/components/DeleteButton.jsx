"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const DeleteButton = ({ id, classNames }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/tickets");
    }
  };
  return (
    <button className={classNames} onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        "Deleting..."
      ) : (
        <>
          <MdDeleteForever /> "Delete"
        </>
      )}
    </button>
  );
};

export default DeleteButton;
