import {BehaviorSubject, Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";

const storage = require('electron-json-storage');

export const CONFIG = 'CONFIG';
export const SERVER_BASE_KEY = 'SERVER_BASE_KEY';

export type ConfigJson = {
  [SERVER_BASE_KEY]: string
}

const notEmpty = pipe(map(v => v !== ''));

export class Config {
  readonly serverUrl = new BehaviorSubject<string>('');
  readonly ready: Observable<boolean>;

  constructor() {
    this.ready = this.serverUrl.pipe(notEmpty);
    this.serverUrl.subscribe(this.setServerUrl.bind(this));
    storage.get(CONFIG, this.getServerBaseUrlCallback.bind(this));
  }

  setServerUrl(value: string) {
    if (value !== '') {
      storage.set(CONFIG, {[SERVER_BASE_KEY]: value});
    }
  }

  getServerBaseUrlCallback(error: any, data: ConfigJson) {
    if (error) {
      throw error;
    }

    this.serverUrl.next(data[SERVER_BASE_KEY] || '');
  }
}
