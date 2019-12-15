import {ApiGateway} from "../domain/RestApiGateway";

export class MockApiGateway implements ApiGateway {
  list = jest.fn().mockReturnValue(Promise.resolve());
  create = jest.fn().mockReturnValue(Promise.resolve());
  update = jest.fn().mockReturnValue(Promise.resolve());
  destroy = jest.fn().mockReturnValue(Promise.resolve());
}
