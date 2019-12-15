import * as React from "react";
import {useState} from "react";
import {Container} from "../domain/container";
import {Player} from "../domain/player";
import './ManagementScreen.css'

interface Props {
  container: Container;
}

export const MatchScheduler: React.FC<Props> = ({container}) => {
  const {playerStore, matchStore} = container;
  const [players] = playerStore.connectComponent();
  const [draftMatch, setDraftMatch] = useState<Player[]>([]);

  return (
    <section className='management-screen match-scheduler'>
      <header>
        <h2>Match Scheduler</h2>
      </header>
      <aside>
        <ul className='player-list'>
          {players.filter(p => !draftMatch.includes(p)).map((player, i) =>
            <li key={i}>
              <a href={`?draft-match=${draftMatch.join(',')}`}
                 onClick={(e) => {
                   e.preventDefault();
                   if (draftMatch.length < 2) {
                     setDraftMatch([
                       ...draftMatch,
                       player
                     ])
                   }
                 }}>
                {player.firstName} {player.lastName}
              </a>
            </li>
          )}
        </ul>
      </aside>
      <main>
        <ul>
          {draftMatch.map((player, i) =>
            <li key={i}>
              {player.firstName} {player.lastName}
              <button onClick={(e) => {
                e.preventDefault();
                setDraftMatch(draftMatch.filter(p => p.id !== player.id));
              }}>
                Remove
              </button>
            </li>
          )}
        </ul>

        <button
          disabled={draftMatch.length !== 2}
          onClick={async (e) => {
            e.preventDefault();
            await matchStore.create(draftMatch);
            setDraftMatch([]);
          }}>
          Create Match
        </button>
      </main>
    </section>
  );
};
