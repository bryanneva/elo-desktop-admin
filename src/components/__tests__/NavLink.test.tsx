import {NavLink} from "../NavLink";
import {cleanup, render} from '@testing-library/react';
import {BehaviorSubject} from "rxjs";
import {Route} from "../../domain/ui";
import * as React from "react";

describe('NavLink', () => {
  afterEach(cleanup);
  it('updates route when clicked', () => {
    const route = new BehaviorSubject<Route>(Route.HOME);
    const {getByText} = render(<NavLink setRoute={(v) => route.next(v)} to={Route.PLAYERS}>Link</NavLink>);
    getByText('Link').click();

    const currentRoute = route.getValue();
    expect(currentRoute).toEqual(Route.PLAYERS);
  });
});
