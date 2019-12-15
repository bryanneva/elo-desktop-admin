import {RestApiGateway} from "../RestApiGateway";
import {createMockFetch, headers} from "../../testhelpers/fetch-test-helpers";

describe('RestApiGateway', () => {
  let restApiGateway: RestApiGateway;

  beforeEach(() => {
    restApiGateway = new RestApiGateway();
  });

  test('list', async () => {
    const mockFetch = createMockFetch('response');
    window.fetch = mockFetch;

    const promise = await restApiGateway.list('/resource');

    expect(mockFetch).toBeCalledWith('/resource');
    expect(promise).toBe('response');
  });

  test('create', async () => {
    let mockFetch = createMockFetch('response');
    window.fetch = mockFetch;

    const promise = await restApiGateway.create('/resource', 'body');

    expect(mockFetch).toBeCalledWith('/resource', headers('POST', 'body'));
    expect(promise).toBe('response');
  });

  test('update', async () => {
    let mockFetch = createMockFetch('response');
    window.fetch = mockFetch;

    const promise = await restApiGateway.update('/resource/1', 'body');

    expect(mockFetch).toBeCalledWith('/resource/1', headers('PUT', 'body'));
    expect(promise).toBe('response');
  });

  test('destroy', async () => {
    let mockFetch = createMockFetch('response');
    window.fetch = mockFetch;

    const promise = await restApiGateway.destroy('/resource/1');

    expect(mockFetch).toBeCalledWith('/resource/1', headers('DELETE'));
    expect(promise).toBe('response');
  });
});
