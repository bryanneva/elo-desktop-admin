import * as React from "react";
import {FormEvent, useState} from "react";
import {Container} from "../domain/container";
import {Player} from "../domain/player";
import './ManagementScreen.css';

interface Props {
  container: Container;
}

export const PlayerManagement: React.FC<Props> = ({container}) => {
  const {playerStore} = container;
  const [players] = playerStore.connectComponent();
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [draftPlayer, setDraftPlayer] = useState<Player>({firstName: '', lastName: ''});

  return (
    <section className='management-screen player-management'>
      <header>
        <h2>Player Management</h2>
      </header>
      <nav>
        <ul>
          {players.map((player: Player, i: number) =>
            <li key={i}>
              <a
                href={`?active-player=${player.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePlayer(player);
                }}>
                {player.firstName} {player.lastName}
              </a>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <form onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          await playerStore.create(draftPlayer);
          setDraftPlayer({firstName: '', lastName: ''});
        }}>
          <header>
            <h3>Create Player</h3>
          </header>
          <fieldset>
            <label
              htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={draftPlayer.firstName}
              onChange={(e) => {
                setDraftPlayer({
                  ...draftPlayer,
                  firstName: e.target.value
                });
              }}/>
          </fieldset>
          <fieldset>
            <label htmlFor="last-name">Last Name</label>
            <input id='last-name'
                   type="text"
                   value={draftPlayer.lastName}
                   onChange={(e) => {
                     setDraftPlayer({
                       ...draftPlayer,
                       lastName: e.target.value
                     });
                   }}/>
          </fieldset>
          <fieldset>
            <input type="submit"/>
          </fieldset>
        </form>

        {activePlayer !== null && (
          <section>
            <header>
              <h3>{activePlayer.firstName} {activePlayer.lastName}</h3>
            </header>
            <main>
              <button onClick={(e) => {
                e.preventDefault();
                playerStore.retire(activePlayer);
              }}>
                Retire
              </button>
            </main>
          </section>
        )}
      </main>
    </section>
  );
};
