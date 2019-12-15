import {BehaviorSubject} from "rxjs";
import {ApiGateway} from "./RestApiGateway";
import {useStore} from "react-rxjs-connector";

export interface Rating {
  id: number
  value: number
  strategyUsed?: string
  createdAt: string
  updatedAt: string
}

export interface Player {
  id?: number
  firstName: string
  lastName: string
  retired?: boolean
  rating?: Rating
  ratings?: Rating[]
}

export type GetPlayersResponse = { players: Player[] };
export type CreatePlayerResponse = Player;
export type RetirePlayerResponse = { player: Player };

export class PlayerStore {
  readonly players = new BehaviorSubject<Player[]>([]);

  constructor(private apiGateway: ApiGateway) {
  }

  connectComponent() {
    return useStore(this.players);
  }

  list() {
    this.apiGateway.list('/players')
      .then((json: GetPlayersResponse) => this.players.next(json.players));
  }

  create(draftPlayer: Player) {
    return this.apiGateway.create('/players', draftPlayer)
      .then(json => {
        const players = this.players.getValue();
        this.players.next([
          ...players,
          json
        ]);
      });
  }

  retire(player: Player) {
    this.apiGateway.destroy(`/players/${player.id}`)
      .then((json: RetirePlayerResponse) => {
        const players = this.players.getValue();
        const updatedPlayers = players.filter(p => p.id !== json.player.id);
        this.players.next(updatedPlayers);
      });
  }
}
