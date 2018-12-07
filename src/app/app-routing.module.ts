import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminComponent } from './user/components/user-admin/user-admin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { UserDetailComponent } from './user/components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'user-admin', component: UserAdminComponent},
  { path: 'user-admin/user/:id', component: UserDetailComponent },
  { path: 'products', component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
