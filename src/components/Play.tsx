import * as React from "react";
import {Container} from "../domain/container";

interface Props {
  container: Container;
}

export const Play: React.FC<Props> = ({container}) => {
  // usePlayerStore(container);
  return (
    <section>
      <header>
        <h2>Play a game</h2>
      </header>
    </section>
  );
};
