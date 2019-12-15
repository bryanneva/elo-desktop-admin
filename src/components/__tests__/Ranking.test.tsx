import * as React from "react";
import {cleanup, render} from "@testing-library/react";
import {Container} from "../../domain/container";
import {Ranking} from "../Ranking";
import {createPlayer, createRating} from "../../testhelpers/mock-generators";
import {Player} from "../../domain/player";

describe('Ranking', () => {
  let container: Container;
  let player: Player;

  afterEach(cleanup);

  beforeEach(() => {
    container = new Container();
    player = createPlayer('Foo', 'Bar');
    player.rating = createRating(100);
  });

  it('shows header with "Ranking"', () => {
    const {getByText} = render(<Ranking container={container}/>);
    getByText(/Current Rankings/i);
  });

  it('shows players with ranking', () => {
    container.playerStore.players.next([player]);
    const {getByText} = render(<Ranking container={container}/>);
    getByText(/Foo Bar/i);
    getByText(/100/i);
  });

  it('orders players by ranking', () => {
    let player2 = createPlayer('Player2', 'LastName');
    player2.rating = createRating(200);

    container.playerStore.players.next([player, player2]);
    const {getByText} = render(<Ranking container={container}/>);
    let playerEle = getByText(/Foo Bar/i);

    const children: Array<string | null> = [];
    Array.from(playerEle.parentElement!.childNodes)
      .forEach(v => children.push(v.textContent));

    expect(children[0]).toContain('200');
    expect(children[1]).toContain('100');
  });
});
