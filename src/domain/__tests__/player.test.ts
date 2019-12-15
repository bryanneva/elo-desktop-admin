import {CreatePlayerResponse, PlayerStore, RetirePlayerResponse} from "../player";
import {MockApiGateway} from "../../testhelpers/MockApiGateway";
import {createPlayer} from "../../testhelpers/mock-generators";

describe('PlayerStore', () => {
  test('list', async () => {
    const mockApiGateway = new MockApiGateway();
    const response = {players: [createPlayer()]};
    mockApiGateway.list.mockReturnValue(Promise.resolve(response));
    const playerStore = new PlayerStore(mockApiGateway);

    await playerStore.list();

    const players = playerStore.players.getValue();
    expect(players).toHaveLength(1);
  });

  test('create', async () => {
    const mockApiGateway = new MockApiGateway();
    const response: CreatePlayerResponse = createPlayer();
    response.firstName = 'expected';
    mockApiGateway.create.mockReturnValue(Promise.resolve(response));
    const playerStore = new PlayerStore(mockApiGateway);

    await playerStore.create({firstName: 'a', lastName: 'b'});

    const players = playerStore.players.getValue();
    expect(players).toHaveLength(1);
    expect(players[0].firstName).toBe('expected');
  });

  test('retire', async () => {
    const playerToRetire = createPlayer();
    const mockApiGateway = new MockApiGateway();
    const response: RetirePlayerResponse = {player: playerToRetire};
    mockApiGateway.destroy.mockReturnValue(Promise.resolve(response));
    const playerStore = new PlayerStore(mockApiGateway);

    playerStore.players.next([createPlayer(), playerToRetire, createPlayer()]);

    await playerStore.retire(playerToRetire);

    const players = playerStore.players.getValue();
    expect(players).toHaveLength(2);
    expect(players.map(player => player.id)).not.toContain(playerToRetire.id);
  });
});
