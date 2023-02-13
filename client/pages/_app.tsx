import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SocketProvider } from "@/contexts/SocketIoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <SocketProvider>
    // {/* <MediaStreamProvider> */}
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    // {/*  </MediaStreamProvider> */}
    // </SocketProvider>
  );
}
