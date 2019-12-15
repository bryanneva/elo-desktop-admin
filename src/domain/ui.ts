import {BehaviorSubject} from "rxjs";

export enum Route {
  HOME = 'HOME',
  PLAYERS = 'PLAYERS',
  SCHEDULE = 'SCHEDULE',
  MATCHES = 'MATCHES',
  RANKING = 'RANKING',
  PLAY = 'PLAY',
}

export class Ui {
  readonly route = new BehaviorSubject<Route>(Route.HOME);
}
