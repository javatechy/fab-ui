import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},

];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(routes,
  {preloadingStrategy: PreloadAllModules});

