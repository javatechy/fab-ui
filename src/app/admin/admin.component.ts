import {Component, OnInit} from '@angular/core';
import {HelperService} from '../services/helper.service';
import * as AppUtils from '../utils/app.utils';
import {Common} from '../utils/Common';
import {Transaction, User} from '../model/CustomResponse';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [HelperService],
})

/**
 * Handles all admin page activities
 */
export class AdminComponent implements OnInit {
  users: User[];
  transactions: Transaction[];

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
    if (Common.getStorage(AppUtils.LS_USER_ROLE) === AppUtils.ROLE_ADMIN) {
      this.helperService.get(AppUtils.BACKEND_API_USERS).subscribe(customResponse => {
        if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
          this.users = customResponse.users;
          this.helperService.openSnackBar('fetched data successfully');
        } else {
          this.helperService.openSnackBar('Error While fetching users list : ' + customResponse.error.message);
        }
      });
    } else {
      this.helperService.openSnackBar('You are not admin');
    }
  }

  getBalance(userId: number) {
    this.helperService.get(AppUtils.BACKEND_API_BALANCE + userId).subscribe(customResponse => {
      if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
        this.helperService.openSnackBar('Balance Is :' + customResponse.balance.balance);
      } else {
        this.helperService.openSnackBar('Error While fetching balance : ' + customResponse.error.message);
      }
    });
  }

  showTransactions(userId: number) {
    this.helperService.get(AppUtils.BACKEND_API_TRANSACTIONS + userId).subscribe(customResponse => {
      if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
        this.helperService.openSnackBar('Open Expansion panel to check transactions');
        this.transactions = customResponse.transactions;
      } else {
        this.helperService.openSnackBar('Error While fetching balance : ' + customResponse.error.message);
      }
    });
  }

  logOut() {
    this.helperService.clear();
  }
}

