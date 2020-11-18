import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';

@Injectable()
export class PersistenceService extends BaseService {

  public constructor() {
    super();
  }

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
    return;
  }

  public get(key: string): Object {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  public remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing data from localStorage', e);
      return false;
    }
  }

  public clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
    return;
  }

  public append(key: string, data: any): void {
    try {
      const existingData = JSON.parse(localStorage.getItem(key));
      localStorage.setItem(key, JSON.stringify({...data, ...existingData}));
    } catch (e) {
      console.error('Error appending data to existing item in localStorage', e);
    }
    return;
  }

  public drop(key: string): boolean {
    try {
      const existingData = JSON.parse(localStorage.getItem(key));
      delete existingData[key];
      localStorage.setItem(key, JSON.stringify(existingData));
      return true;
    } catch (e) {
      console.error('Error droping data from existing item in localStorage', e);
      return false;
    }
  }
}
