import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminComponent } from './modules/user/components/user-admin/user-admin.component';
import { WelcomeComponent } from './modules/welcome/components/welcome.component';
import { ProductAdminComponent } from './modules/product/components/product-admin/product-admin.component';
import { UserDetailComponent } from './modules/user/components/user-detail/user-detail.component';
import { LoginComponent } from './modules/auth/components/login/login.component'
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { AuthGuard } from './modules/auth/guard/auth.guard'
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {
    path: 'user-admin',
    component: UserAdminComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ADMIN'
    }
  },
  { path: 'user-admin/user/:id', component: UserDetailComponent },
  { path: 'product-admin', component: ProductAdminComponent},
  { path: 'signin', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'adduser', component: UserDetailComponent},
  { path: 'products', component: ProductListComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
