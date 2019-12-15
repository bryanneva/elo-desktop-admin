import {MatchScheduler} from "../MatchScheduler";
import {Container} from "../../domain/container";
import {cleanup, fireEvent, render} from "@testing-library/react";
import * as React from "react";
import {createPlayer} from "../../testhelpers/mock-generators";

describe('MatchScheduler', () => {
  afterEach(cleanup);

  it('shows header with "Match Scheduler"', () => {
    const {getByText} = render(<MatchScheduler container={new Container()}/>);
    getByText(/match scheduler/i);
  });

  it('displays players', () => {
    const container = new Container();
    let player = createPlayer('test');
    container.playerStore.players.next([player]);
    const {getByText} = render(<MatchScheduler container={container}/>);
    getByText(/test/i);
  });

  it('clicking player adds to draft match', () => {
    const container = new Container();
    let player = createPlayer('test');
    container.playerStore.players.next([player]);
    const {getByText} = render(<MatchScheduler container={container}/>);

    fireEvent.click(getByText(/test/i));

    getByText(/remove/i);
  });

  it('creates matches', () => {
    const container = new Container();
    const mockCreate = jest.fn();
    container.matchStore.create = mockCreate;
    let playerA = createPlayer('player_a');
    let playerB = createPlayer('player_b');
    container.playerStore.players.next([playerA, playerB]);
    const {getByText} = render(<MatchScheduler container={container}/>);

    fireEvent.click(getByText(/player_a/i));
    fireEvent.click(getByText(/player_b/i));

    fireEvent.click(getByText(/create match/i));

    expect(mockCreate).toHaveBeenCalledWith([playerA, playerB]);
  });

  it('clicking remove removes player from match', () => {
    const container = new Container();
    let player = createPlayer('first', 'player');
    container.playerStore.players.next([player]);
    const {getByText, queryByText} = render(<MatchScheduler container={container}/>);

    fireEvent.click(getByText(/first player/i));
    fireEvent.click(getByText(/remove/i));

    expect(queryByText(/remove/i)).not.toBeInTheDocument();
  });
});
