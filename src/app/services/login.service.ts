import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as AppUtils from '../utils/app.utils';
import {Router, ActivatedRoute} from '@angular/router';
import {Response, Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {AppLogger} from '../utils/AppLogger';
import {Common} from '../utils/Common';
import {CustomResponse} from '../model/CustomResponse';
import {HelperService} from './helper.service';
import {isNullOrUndefined} from "util";

/**
 * Service for all login  related tasks.
 */
@Injectable()
export class LoginService {

  constructor(private http: Http, private router: Router,
              private route: ActivatedRoute, private helperService: HelperService) {
  }

  /**
   * Authentication based on username and password
   * @param {string} userName Username of the user
   * @param {string} password password of the user
   * @returns {Observable<CustomResponse>} CustomResponse got from  backend.
   */
  authenticate(userName: string, password: string): Observable<CustomResponse> {
    AppLogger.log('UserName  and pass' + userName + 'Password' + password);
    const cs = Common.create();
    cs.userName = userName;
    cs.password = password;
    return this.helperService.post(AppUtils.BACKEND_API_AUTH, cs);
  }

  /**
   * Checks if a user is logged in or not.
   * @returns {boolean} true if user is loggedin else false.
   */
  isAuthenticated(): boolean {
    const userName = Common.getStorage(AppUtils.LS_USER_NAME);
    if (isNullOrUndefined(userName)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * User Status.
   * @returns {string} user status.
   */
  getUserStatus(): string {
    const status = Common.getStorage(AppUtils.LS_USER_STATUS);
    return status;
  }


}
