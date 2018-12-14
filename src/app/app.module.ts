import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './modules/navigation/components/header/header.component';
import { SidenavListComponent } from './modules/navigation/components/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserAdminComponent } from './modules/user/components/user-admin/user-admin.component';
import { WelcomeComponent } from './modules/welcome/components/welcome.component';
import { ProductAdminComponent } from './modules/product/components/product-admin/product-admin.component';
import { RoleOverviewComponent } from './modules/role/components/role-overview/role-overview.component';
import { PermissionOverviewComponent } from './modules/role/components/permission-overview/permission-overview.component';
import { UserOverviewComponent } from './modules/user/components/user-overview/user-overview.component';
import { UserDetailComponent } from './modules/user/components/user-detail/user-detail.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './modules/message/components/message/message.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { ImageUploadComponent } from './modules/image/components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    UserAdminComponent,
    WelcomeComponent,
    ProductAdminComponent,
    RoleOverviewComponent,
    PermissionOverviewComponent,
    UserOverviewComponent,
    UserDetailComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
