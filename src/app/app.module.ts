import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserAdminComponent } from './user/components/user-admin/user-admin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './user/components/roles/roles.component';
import { PermissionsComponent } from './user/components/permissions/permissions.component';
import { UsersComponent } from './user/components/users/users.component';
import { UserDetailComponent } from './user/components/user-detail/user-detail.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    UserAdminComponent,
    WelcomeComponent,
    ProductsComponent,
    RolesComponent,
    PermissionsComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }