import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../services/helper.service';
import * as AppUtils from '../utils/app.utils';
import {Common} from '../utils/Common';
import {Balance, User} from '../model/CustomResponse';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [HelperService],
})

/**
 * Handles all user related tasks.
 */
export class UserComponent implements OnInit {
  user: User;
  balance: Balance;
  walletBalance: Number;
  userName: string;
  rechargeForm: FormGroup;
  billPaymentForm: FormGroup;
  movieForm: FormGroup;

  constructor(public form: FormBuilder, private helperService: HelperService) {
    this.rechargeForm = form.group({
      'amount': [null, Validators.required]
    });
    this.billPaymentForm = form.group({
      'amount': [null, Validators.required]
    });
    this.movieForm = form.group({
      'amount': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.userName = Common.getStorage(AppUtils.LS_USER_NAME);
    if (Common.getStorage(AppUtils.LS_USER_ROLE) === AppUtils.ROLE_NON_ADMIN) {
      this.getBalance(Common.getStorage(AppUtils.LS_USER_ID));
    } else {
      this.helperService.openSnackBar('Please login again!!');
    }
  }


  submitRechargeForm(post) {
    this.purchase(post.amount, 'RECHARGE');
  }

  submitBillPaymentForm(post) {
    this.purchase(post.amount, 'BILL PAYMENT');
  }

  submitMovieForm(post) {
    this.purchase(post.amount, 'MOVIE');

  }


  purchase(amount: number, transactionType: string) {
    const cs = Common.create();
    cs.amount = amount;
    cs.transactionType = transactionType;
    cs.userId = Common.getStorage(AppUtils.LS_USER_ID);
    this.helperService.post(AppUtils.BACKEND_API_PURCHASE, cs).subscribe(customResponse => {
      if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
        this.helperService.openSnackBar(transactionType + ' Service Successful');
      } else {
        this.helperService.openSnackBar(transactionType + ' Failed !! with Error code ' + customResponse.error.status + ' and message: '
          + customResponse.error.message);
      }
    });

  }

  getBalance(userId: number) {
    this.helperService.get(AppUtils.BACKEND_API_BALANCE + userId).subscribe(customResponse => {
      if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
        this.walletBalance = customResponse.balance.balance;
        this.helperService.openSnackBar('Balance Is :' + customResponse.balance.balance);
      } else {
        this.helperService.openSnackBar('Error While fetching balance : ' + customResponse.error.message);
      }
    });
  }

  logOut() {
    this.helperService.clear();
  }
}


