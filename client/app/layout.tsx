"use client";
import React from "react";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import RoomProvider from "@/contexts/RoomContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Weyeyet | Home</title>
      </head>
      <body>
        <UserProvider>
          <RoomProvider>{children}</RoomProvider>
        </UserProvider>
      </body>
    </html>
  );
}
