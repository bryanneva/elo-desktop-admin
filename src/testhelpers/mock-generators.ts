import {Player, Rating} from "../domain/player";
import {Match} from "../domain/match";

let playerId = 0;
export function createPlayer(firstName: string = '', lastName: string = ''): Player {
  return {
    firstName,
    lastName,
    id: playerId++,
  }
}

let matchId = 0;
export function createMatch(player1: Player = createPlayer(), player2: Player = createPlayer()): Match {
  return {
    id: matchId++,
    players: [player1, player2],
    winner: null,
    cancelled: false,
    createdAt: '',
    updatedAt: ''
  }
}

export function createRating(rating: number = 0): Rating {
  return {
    id: 0,
    value: rating,
    createdAt: '',
    updatedAt: ''
  }
}
