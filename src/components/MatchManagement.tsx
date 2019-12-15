import * as React from "react";
import {Container} from "../domain/container";
import './ManagementScreen.css'

interface Props {
  container: Container;
}

export const MatchManagement: React.FC<Props> = ({container}) => {
  const {matchStore} = container;
  const [matches] = matchStore.connectComponent();
  return (
    <section>
      <header>
        <h2>Match Management</h2>
      </header>
      <main>
        <ol>
          {matches
            .filter(match => match.winner === null && !match.cancelled)
            .map((match, i) =>
              <li key={i}>
                <ul>
                  {match.players.map((player, j) =>
                    <li key={`${i}_${j}`}>
                      <a href={`?complete=${match.id}`}
                         onClick={(e) => {
                           e.preventDefault();
                           matchStore.complete(match, player);
                         }}>
                        {player.firstName} {player.lastName}
                      </a>
                    </li>
                  )}

                  <button
                    onClick={() => {
                      matchStore.cancel(match);
                    }}>
                    Cancel
                  </button>
                </ul>
              </li>
            )}
        </ol>
      </main>
    </section>
  );
};
