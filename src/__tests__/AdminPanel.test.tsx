import React from 'react';
import {cleanup, render} from '@testing-library/react';
import AdminPanel from "../AdminPanel";
import {Container} from "../domain/container";
import {Route} from "../domain/ui";
import {MockApiGateway} from "../testhelpers/MockApiGateway";

describe('Admin Panel', () => {
  afterEach(cleanup);
  let container: Container;

  beforeEach(() => {
    let mockApiGateway = new MockApiGateway();
    container = new Container(mockApiGateway);
    container.init = jest.fn();
  });

  test('renders Admin Panel header', () => {
    const {getByText} = render(<AdminPanel container={container}/>);
    const headerText = getByText(/admin panel/i);
    expect(headerText).toBeInTheDocument();
  });

  describe('Routes', () => {
    test('HOME', () => {
      container.ui.route.next(Route.HOME);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/what do you need to do/i);
    });

    test('PLAYERS', () => {
      container.ui.route.next(Route.PLAYERS);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/player management/i);
    });

    test('MATCHES', () => {
      container.ui.route.next(Route.MATCHES);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/match management/i);
    });

    test('SCHEDULE', () => {
      container.ui.route.next(Route.SCHEDULE);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/match schedule/i);
    });

    test('RANKING', () => {
      container.ui.route.next(Route.RANKING);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/current ranking/i);
    });

    test('PLAY', () => {
      container.ui.route.next(Route.PLAY);
      const {getByText} = render(<AdminPanel container={container}/>);
      getByText(/play a game/i);
    });
  });
});

