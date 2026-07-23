import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { PlayerProvider } from "./context/PlayerContext";
import { MatchProvider } from "./context/MatchContext";
import { ModalProvider } from "./context/ModalContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayerProvider>
      <ModalProvider>
        <MatchProvider>
          <App />
        </MatchProvider>
      </ModalProvider>
    </PlayerProvider>
  </React.StrictMode>
);