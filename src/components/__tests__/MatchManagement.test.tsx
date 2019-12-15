import {cleanup, render} from "@testing-library/react";
import * as React from "react";
import {Container} from "../../domain/container";
import {createMatch, createPlayer} from "../../testhelpers/mock-generators";
import {Player} from "../../domain/player";
import {MatchManagement} from "../MatchManagement";

describe('MatchManagement', () => {
  let container: Container;
  let playerA: Player;
  let playerB: Player;

  afterEach(cleanup);

  beforeEach(() => {
    container = new Container();
    playerA = createPlayer('Player', 'A');
    playerB = createPlayer('Player', 'B');
  });

  it('shows header with "Match Management"', () => {
    const {getByText} = render(<MatchManagement container={container}/>);
    getByText(/Match Management/i);
  });

  it('displays matches', () => {
    let match = createMatch(playerA, playerB);
    container.matchStore.matches.next([match]);
    const {getByText} = render(<MatchManagement container={container}/>);
    getByText(/Player A/i);
    getByText(/Player B/i);
  });

  it('does not display completed matches', () => {
    let match = createMatch(playerA, playerB);
    match.winner = playerA;
    let match2 = createMatch(createPlayer('Player', 'C'), createPlayer('Player', 'D'));
    container.matchStore.matches.next([match, match2]);
    const {queryByText, getByText} = render(<MatchManagement container={container}/>);

    getByText(/Player C/i);
    expect(queryByText(/Player A/i)).not.toBeInTheDocument();
  });

  it('does not display canceled matches', () => {
    let match = createMatch(playerA, playerB);
    match.cancelled = true;
    let match2 = createMatch(createPlayer('Player', 'C'), createPlayer('Player', 'D'));
    container.matchStore.matches.next([match, match2]);
    const {queryByText, getByText} = render(<MatchManagement container={container}/>);

    getByText(/Player C/i);
    expect(queryByText(/Player A/i)).not.toBeInTheDocument();
  });

  it('clicking player name completes match', () => {
    const completeSpy = jest.fn();
    container.matchStore.complete = completeSpy;

    let match = createMatch(playerA, playerB);
    container.matchStore.matches.next([match]);
    const {getByText} = render(<MatchManagement container={container}/>);

    getByText(/Player A/i).click();

    expect(completeSpy).toHaveBeenCalled();
  });

  it('clicking cancel cancels match', () => {
    const cancelSpy = jest.fn();
    container.matchStore.cancel = cancelSpy;

    let match = createMatch(playerA, playerB);
    container.matchStore.matches.next([match]);
    const {getByText} = render(<MatchManagement container={container}/>);

    getByText(/cancel/i).click();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
