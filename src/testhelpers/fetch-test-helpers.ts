export function createMockFetch(response: any = '') {
  const mockResponse = {
    json: jest.fn().mockReturnValue(response)
  };

  return jest.fn().mockReturnValue(Promise.resolve(mockResponse));
}

export function headers(method: string, body?: any) {
  if (body) {
    return {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }
  }
  return {method}
}
