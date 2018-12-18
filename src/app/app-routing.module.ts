import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UserAdminComponent } from './modules/user/components/user-admin/user-admin.component'
import { WelcomeComponent } from './modules/welcome/components/welcome.component'
import { ProductAdminComponent } from './modules/product/components/product-admin/product-admin.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { SignupComponent } from './modules/auth/components/signup/signup.component'
import { AuthGuard } from './modules/auth/guard/auth.guard'
import { ProductListComponent } from './modules/product/components/product-list/product-list.component'
import { Permission } from './modules/role/enums/permisson.enum'
import { UserDetailProfileComponent } from './modules/user/components/user-detail-profile/user-detail-profile.component'
import { UserDetailAdminComponent } from './modules/user/components/user-detail-admin/user-detail-admin.component'
import { UserDetailAddComponent } from './modules/user/components/user-detail-add/user-detail-add.component'

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    {
        path: 'user-admin',
        component: UserAdminComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.adminDefault],
        },
    },
    {
        path: 'user-admin/user/:id',
        component: UserDetailAdminComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.adminDefault],
        },
    },
    {
        path: 'product-admin',
        component: ProductAdminComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.adminDefault],
        },
    },
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'adduser',
        component: UserDetailAddComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.adminDefault],
        },
    },
    {
        path: 'products',
        component: ProductListComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.readDefault],
        },
    },
    {
        path: 'profile',
        component: UserDetailProfileComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.readDefault],
        },
    },
    { path: '**', redirectTo: '' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
