import * as React from "react";
import {Route} from "../domain/ui";

interface Props {
  setRoute: (v: Route) => void
  to: Route
}

export const NavLink: React.FC<Props> = ({setRoute, to, children}) => (
  <a className='nav-link'
     href={`?${to.toString()}`}
     onClick={e => {
       e.preventDefault();
       setRoute(to);
     }}>
    {children}
  </a>
);
