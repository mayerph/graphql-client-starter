import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminComponent } from './modules/user/components/user-admin/user-admin.component';
import { WelcomeComponent } from './modules/welcome/components/welcome.component';
import { ProductAdminComponent } from './modules/product/components/product-admin/product-admin.component';
import { UserDetailComponent } from './modules/user/components/user-detail/user-detail.component';
import { LoginComponent } from './modules/auth/components/login/login.component'
import { SignupComponent } from './modules/auth/components/signup/signup.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'user-admin', component: UserAdminComponent, runGuardsAndResolvers: 'always'},
  { path: 'user-admin/user/:id', component: UserDetailComponent },
  { path: 'products', component: ProductAdminComponent},
  { path: 'signin', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'adduser', component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
