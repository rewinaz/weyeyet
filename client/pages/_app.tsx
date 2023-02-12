import { MediaStreamProvider } from "@/contexts/MediaStreamContext";
import { SocketProvider } from "@/contexts/SocketIoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      {/* <MediaStreamProvider> */}
      <Component {...pageProps} />
      {/*  </MediaStreamProvider> */}
    </SocketProvider>
  );
}
