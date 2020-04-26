import React from "react";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Game from "./components/games/game.component";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}
