import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {HelperService} from '../services/helper.service';
import * as AppUtils from '../utils/app.utils';
import {Common} from '../utils/Common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
/**
 * Handles all login related tasks.
 */
export class LoginComponent implements OnInit {
  title = 'FabWallet';
  loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute,
              public form: FormBuilder, private helperService: HelperService) {

    this.loginForm = form.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (!this.loginService.isAuthenticated()) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  submitLoginForm(post) {
    this.loginService.authenticate(post.userName, post.password).subscribe(customResponse => {
      if (customResponse.status === AppUtils.BE_STATUS_SUCCESS) {
        this.helperService.openSnackBar('Login Successfull');
        Common.setStorage(AppUtils.LS_LOGGED_IN_STATUS, customResponse.status);
        Common.setStorage(AppUtils.LS_USER_ROLE, customResponse.user.role);
        Common.setStorage(AppUtils.LS_USER_NAME, customResponse.user.userName);
        Common.setStorage(AppUtils.LS_USER_ID, customResponse.user.userId);
        if (customResponse.user.role === AppUtils.ROLE_ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        this.helperService.openSnackBar('Login Failed with Error message : ' + customResponse.error.message);
      }
    });
  }

}
