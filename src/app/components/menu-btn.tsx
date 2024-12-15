"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MenuBtn() {
  const pathname = usePathname();
  return pathname === "/translations" ? (
    <Link className="mr-2 border rounded-md p-2" href="/">
      Translate New
    </Link>
  ) : (
    <Link className="mr-2 border rounded-md p-2" href="/translations">
      My Translations
    </Link>
  );
}
