import React from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = React.createContext<Socket>(
  io("http://127.0.0.1:3002", {
    transports: ["websocket"],
  })
);

export const SocketProvider = (props: {} & React.PropsWithChildren) => {
  const socket = React.useMemo(
    () =>
      io("http://127.0.0.1:3002", {
        transports: ["websocket"],
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
