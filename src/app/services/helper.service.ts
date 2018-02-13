import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Http, Headers, Jsonp} from '@angular/http';
import {AppLogger} from '../utils/AppLogger';
import {CustomRequest} from '../model/CustomRequest';
import {CustomResponse, Error} from '../model/CustomResponse';
import {Location} from '@angular/common';
import 'rxjs/add/operator/map';
import {MdSnackBar} from '@angular/material';

@Injectable()
export class HelperService {
  response: CustomResponse;

  constructor(private http: Http,
              private router: Router, private location: Location, private jsonp: Jsonp, public snackBar: MdSnackBar) {
  }


  /**
   * For HTTP POST calls
   * @param {string} url URL of backend API
   * @param {CustomRequest} customRequest Request Data
   * @returns {Observable<CustomResponse>} CustomResponse
   */
  post(url: string, customRequest: CustomRequest): Observable<CustomResponse> {
    AppLogger.log('Custom Request=======> ', customRequest);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Allow-Cross-Origin', '*');
    const bodySend = JSON.parse(JSON.stringify(customRequest));
    return this.http.post(url, bodySend, headers).map(res => res.json());
  }

  /**
   * For HTTP GET calls
   * @param {string} url
   * @returns {Observable<CustomResponse>}
   */
  get(url: string): Observable<CustomResponse> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Allow-Cross-Origin', '*');
    return this.http.get(url, headers).map(res => res.json());
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Clears all storage data - session and local.
   */
  clear() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    //this.goLogin();
  }

  /**
   * Common Method to show snackbar on screen.
   * @param {string} msg Message to show.
   */
  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 6000,
    });
  }

}
