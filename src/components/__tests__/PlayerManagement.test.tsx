import * as React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react';
import {PlayerManagement} from "../PlayerManagement";
import {Container} from "../../domain/container";
import {createPlayer} from "../../testhelpers/mock-generators";
import {targetValue} from "../../testhelpers/component-test-helpers";

describe('PlayerManagement', () => {
  afterEach(cleanup);

  it('renders header with "Player Management"', () => {
    const {getByText} = render(<PlayerManagement container={new Container()}/>);
    getByText(/Player Management/i);
  });

  it('displays a list players', () => {
    const container = new Container();
    const player = createPlayer();
    player.firstName = 'expected';
    container.playerStore.players.next([player]);
    const {getByText} = render(<PlayerManagement container={container}/>);
    getByText(/expected/i);
  });

  it('creates players', () => {
    const container = new Container();
    const mockCreate = jest.fn();
    container.playerStore.create = mockCreate;
    const {getByLabelText} = render(<PlayerManagement container={container}/>);
    const firstName = getByLabelText('First Name') as HTMLInputElement;
    const lastName = getByLabelText('Last Name') as HTMLInputElement;

    fireEvent.change(firstName, targetValue('first-name'));
    fireEvent.change(lastName, targetValue('last-name'));
    fireEvent.submit(firstName);

    expect(mockCreate).toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledWith({firstName: 'first-name', lastName: 'last-name'});
  });

  it('displays the active player when clicked', () => {
    const container = new Container();
    const player = createPlayer();
    player.firstName = 'firstName';
    container.playerStore.players.next([player]);
    const {getByText} = render(<PlayerManagement container={container}/>);

    const playerName = getByText(/firstName/i);
    fireEvent.click(playerName);

    getByText(/retire/i);
  });

  it('retires players', () => {
    const container = new Container();
    const mockRetire = jest.fn();
    container.playerStore.retire = mockRetire;
    const player = createPlayer();
    player.firstName = 'firstName';
    container.playerStore.players.next([player]);
    const {getByText} = render(<PlayerManagement container={container}/>);

    getByText(/firstName/i).click();

    const retireButton = getByText(/retire/i);
    fireEvent.click(retireButton);

    expect(mockRetire).toHaveBeenCalledWith(player);
  });
});
