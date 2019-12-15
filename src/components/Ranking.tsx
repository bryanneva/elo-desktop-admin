import * as React from "react";
import {Container} from "../domain/container";
import {Player} from "../domain/player";

interface Props {
  container: Container;
}

function rating(player: Player): number {
  if (player.rating) {
    return player.rating.value;
  }

  return 0;
}

function ratingSort(playerA: Player, playerB: Player): number {
  return rating(playerB) - rating(playerA);
}

export const Ranking: React.FC<Props> = ({container}) => {
  const {playerStore} = container;
  const [players] = playerStore.connectComponent();

  return (
    <section>
      <header>
        <h2>Current Rankings</h2>
      </header>
      <ol>
        {players
          .sort(ratingSort)
          .map((player, i) => <li key={i}>{player.firstName} {player.lastName} ({rating(player)})</li>)
        }
      </ol>
    </section>
  );
};
