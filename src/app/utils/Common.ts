import {CustomRequest} from '../model/CustomRequest';

/**
 * Created by deepak.kumar
 */
export class Common {


  static create(): CustomRequest {
    const customRequest = new CustomRequest();
    return customRequest;
  }

  public static setStorage(key: string, value: any) {
    if (typeof localStorage === 'object') {
      try {
        if (key.startsWith('SS')) {
          sessionStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (e) {
        alert('Your web browser does not support storing settings in private browsing mode. Please use normal mode.');
      }
    }
  }

  public static getStorage(item: any) {
    if (item.startsWith('SS')) {
      return this.parse(sessionStorage.getItem(item));
    } else {
      return this.parse(localStorage.getItem(item));
    }
  }

  public static parse(input: any) {
    if (this.isJson(input)) {
      return JSON.parse(input);
    } else {
      return input;
    }
  }

  public static isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

}
