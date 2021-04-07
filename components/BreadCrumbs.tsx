import Link from "next/link";
import React from "react";

type Props = {
  //Insert Props Here
  className?: string;
  children?: React.ReactNode;
};

const BreadCrumbs = ({ className, children }: Props) => {
  return (
    <div className="flex text-xs border-b pb-2 mb-2">
      <Link href="/">
        <a className="text-gray-400 hover:underline">Home</a>
      </Link>
      <div className="mx-2">/</div>
      <div>{children}</div>
    </div>
  );
};

export default BreadCrumbs;
