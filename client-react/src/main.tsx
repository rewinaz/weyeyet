import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import RoomProvider from "./contexts/RoomContext";
import { SocketProvider } from "./contexts/SocketIoContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-j7tpwkwk.us.auth0.com"
      clientId="QqXukZ4w0HhUjm2LwCqjKaB7fbl2ELic"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <SocketProvider>
        <RoomProvider>
          <App />
        </RoomProvider>
      </SocketProvider>
    </Auth0Provider>
  </React.StrictMode>
);
