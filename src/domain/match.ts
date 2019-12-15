import {BehaviorSubject} from "rxjs";
import {ApiGateway} from "./RestApiGateway";
import {Player} from "./player";
import {useStore} from "react-rxjs-connector";

export interface Match {
  id: number
  players: Player[]
  winner: Player | null
  cancelled: boolean
  createdAt: string
  updatedAt: string
}

export type ListMatchesResponse = { matches: Match[] };
export type CreateMatchResponse = Match;
export type CompleteMatchResponse = Match;
export type CancelMatchResponse = Match;

export class MatchStore {
  readonly matches = new BehaviorSubject<Match[]>([]);

  constructor(private apiGateway: ApiGateway) {
  }

  list() {
    this.apiGateway.list('/matches')
      .then((json: ListMatchesResponse) => this.matches.next(json.matches));
  }

  create(proposedPlayers: Player[]): Promise<CreateMatchResponse> {
    return this.apiGateway.create('/matches', {
      playerOneId: proposedPlayers[0].id,
      playerTwoId: proposedPlayers[1].id
    })
      .then((json: CreateMatchResponse) => {
        const matches = this.matches.getValue();
        this.matches.next([
          ...matches,
          json
        ]);

        return json;
      });
  }

  complete(match: Match, player: Player) {
    this.apiGateway.update(`/matches/${match.id}/complete`, {winnerId: player.id})
      .then(this.updateMatchInPlace.bind(this));
  }

  cancel(match: Match) {
    this.apiGateway.update(`/matches/${match.id}/cancel`)
      .then(this.updateMatchInPlace.bind(this))
  }

  updateMatchInPlace(json: Match) {
    const matches = this.matches.getValue();
    const matchIndex = matches.findIndex(match => match.id === json.id);
    matches[matchIndex] = json;
    this.matches.next(matches);
  }

  connectComponent() {
    return useStore(this.matches);
  }
}
