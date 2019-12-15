import {MockApiGateway} from "../../testhelpers/MockApiGateway";
import {
  CancelMatchResponse,
  CompleteMatchResponse,
  CreateMatchResponse,
  ListMatchesResponse,
  Match,
  MatchStore
} from "../match";
import {createMatch, createPlayer} from "../../testhelpers/mock-generators";
import {headers} from "../../testhelpers/fetch-test-helpers";


describe('MatchStore', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('list', async () => {
    const mockApiGateway = new MockApiGateway();
    const response: ListMatchesResponse = {matches: [createMatch()]};
    mockApiGateway.list.mockReturnValue(Promise.resolve(response));
    const matchStore = new MatchStore(mockApiGateway);

    await matchStore.list();

    const matches = matchStore.matches.getValue();
    expect(matches).toHaveLength(1);
  });

  test('create', async () => {
    const mockApiGateway = new MockApiGateway();
    const response: CreateMatchResponse = createMatch();
    mockApiGateway.create.mockReturnValue(Promise.resolve(response));
    const matchStore = new MatchStore(mockApiGateway);

    await matchStore.create([createPlayer(), createPlayer()]);

    const matches = matchStore.matches.getValue();
    expect(matches).toHaveLength(1);
  });

  test('complete', async () => {
    let winner = createPlayer();
    const matchToComplete = createMatch();
    const completedMatch = createMatch();
    matchToComplete.id = completedMatch.id;
    completedMatch.winner = winner;

    const mockApiGateway = new MockApiGateway();
    const response: CompleteMatchResponse = completedMatch;
    mockApiGateway.update.mockReturnValue(Promise.resolve(response));
    const matchStore = new MatchStore(mockApiGateway);

    matchStore.matches.next([createMatch(), matchToComplete, createMatch()]);

    await matchStore.complete(matchToComplete, winner);

    const matches = matchStore.matches.getValue();
    expect(matches).toHaveLength(3);
    expect(matches.map(match => match.winner)).toContain(winner);
  });

  test('cancel', async () => {
    const matchToCancel = createMatch();
    const canceledMatch = createMatch();
    canceledMatch.id = matchToCancel.id;
    canceledMatch.cancelled = true;

    const mockApiGateway = new MockApiGateway();
    const response: CancelMatchResponse = canceledMatch;
    mockApiGateway.update.mockReturnValue(Promise.resolve(response));
    const matchStore = new MatchStore(mockApiGateway);

    matchStore.matches.next([createMatch(), matchToCancel, createMatch()]);

    await matchStore.cancel(matchToCancel);

    const matches = matchStore.matches.getValue();
    expect(matches).toHaveLength(3);

    const matchInPlace = matches.find(match => match.id === matchToCancel.id);
    expect(matchInPlace).not.toBeNull();
    expect(matchInPlace!.cancelled).toBe(true);
  });
});
