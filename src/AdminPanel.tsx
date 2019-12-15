import * as React from "react";
import {useLayoutEffect} from "react";
import {PlayerManagement} from "./components/PlayerManagement";
import {NavLink} from "./components/NavLink";
import {Container} from "./domain/container";
import {Route} from "./domain/ui";
import {MatchScheduler} from "./components/MatchScheduler";
import {MatchManagement} from "./components/MatchManagement";
import {Ranking} from "./components/Ranking";
import './AdminPanel.css';
import {Play} from "./components/Play";
import {useBehaviorSubject} from "react-rxjs-connector";

interface Props {
  container: Container;
}

const AdminPanel: React.FC<Props> = ({container}) => {
  const {route} = container.ui;
  const [currentRoute, setCurrentRoute] = useBehaviorSubject(route);
  useLayoutEffect(() => {
    container.init();
  }, [container]);

  return (
    <div className='admin-panel'>
      <header className='admin-header'>
        <h1>Admin Panel</h1>
        {currentRoute !== Route.HOME && (
          <nav className='page-nav'>
            <ul>
              <li><NavLink to={Route.HOME} setRoute={setCurrentRoute}>Home</NavLink></li>
              <li><NavLink to={Route.PLAYERS} setRoute={setCurrentRoute}>Players</NavLink></li>
              <li><NavLink to={Route.SCHEDULE} setRoute={setCurrentRoute}>Schedule</NavLink></li>
              <li><NavLink to={Route.MATCHES} setRoute={setCurrentRoute}>Matches</NavLink></li>
              <li><NavLink to={Route.RANKING} setRoute={setCurrentRoute}>Ranking</NavLink></li>
            </ul>
          </nav>
        )}
      </header>
      <section className='admin-body'>
        {currentRoute === Route.PLAY && <Play container={container}/>}
        {currentRoute === Route.PLAYERS && <PlayerManagement container={container}/>}
        {currentRoute === Route.SCHEDULE && <MatchScheduler container={container}/>}
        {currentRoute === Route.MATCHES && <MatchManagement container={container}/>}
        {currentRoute === Route.RANKING && <Ranking container={container}/>}
        {currentRoute === Route.HOME && (
          <section className='splash-menu'>
            <header>
              <h2>What do you need to do?</h2>
            </header>
            <ul>
              <NavLink to={Route.PLAY} setRoute={setCurrentRoute}>
                <li>Play!</li>
              </NavLink>
              <NavLink to={Route.PLAYERS} setRoute={setCurrentRoute}>
                <li>Manage Players</li>
              </NavLink>
              <NavLink to={Route.SCHEDULE} setRoute={setCurrentRoute}>
                <li>Schedule a Match</li>
              </NavLink>
              <NavLink to={Route.MATCHES} setRoute={setCurrentRoute}>
                <li>Manage Matches</li>
              </NavLink>
              <NavLink to={Route.RANKING} setRoute={setCurrentRoute}>
                <li>View Current Rankings</li>
              </NavLink>
            </ul>
          </section>
        )}
      </section>
    </div>
  )
};

export default AdminPanel;
