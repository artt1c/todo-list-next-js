import type {Metadata} from "next";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export const metadata: Metadata = {
  title: "Todo Lists",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {
  return (
    <div className='flex h-full'>
      <Sidebar/>
      <main className='grow'>
        {children}
      </main>
    </div>
  );
}
