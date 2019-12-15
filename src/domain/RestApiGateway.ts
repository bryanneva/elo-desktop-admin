export interface ApiGateway {
  list(url: string): Promise<any>;

  create(url: string, body?: any): Promise<any>;

  update(url: string, body?: any): Promise<any>;

  destroy(url: string): Promise<any>;
}

export class RestApiGateway implements ApiGateway {
  constructor(readonly urlBase: string = '') {
  }

  private api(url: string) {
    const result = `${this.urlBase}${url}`;
    console.log('fetching', result);
    return result;
  }

  list(url: string) {
    return fetch(this.api(url))
      .then(response => response.json());
  }

  create(url: string, body: any = {}) {
    return fetch(this.api(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
  }

  update(url: string, body: any = {}) {
    return fetch(this.api(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
  }

  destroy(url: string) {
    return fetch(this.api(url), {method: 'DELETE'})
      .then(response => response.json());
  }
}
