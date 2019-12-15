import {Ui} from "./ui";
import {PlayerStore} from "./player";
import {MatchStore} from "./match";
import {ApiGateway} from "./RestApiGateway";

export class Container {
  ui: Ui;
  playerStore: PlayerStore;
  matchStore: MatchStore;


  constructor(private apiGateway: ApiGateway) {
    this.ui = new Ui();
    this.playerStore = new PlayerStore(apiGateway);
    this.matchStore = new MatchStore(apiGateway);
  }

  init() {
    this.playerStore.list();
    this.matchStore.list();
  }
}


