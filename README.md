# GraphqlClientStarter

This projects implements a sample front-end and demonstrates how you can implement modern web apps nowadays, by using state of the art technologies

# Pre-requirements
To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [Angular](https://angular.io/guide/quickstart)
-   Install [VS Code](https://code.visualstudio.com/)

# Getting started

-   Clone the repository

```
git clone https://github.com/mayerph/graphql-client-starter.git
```

-   Install dependencies

```
cd graphql-client-starter
npm install
```

-   Serve the application

```
ng serve --open
```

![frontend_1](../assets/frontend_1.png?raw=true)

# Developing

-   Serve the application

```
cd graphql-client-starter
ng serve --open
```

-    Adding a new feature. [click here](https://github.com/mayerph/graphql-client-starter#adding-a-new-featuremodule)


# Project
## General structure
| Name | Description |
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|
| **src/app/modules**                                    | contains all features and models of the application                                                                          |
| **src/app/app-routing.module.ts**                      | defines all routes of the application                                                                        |
| **src/app/app.component.css**                      | css of the base component                                                                   |
| **src/app/app.component.html**                      | html template of the base component                                                                  |
| **src/app/app.component.spec.ts**                      | test class of the base component                                                                    |
| **src/app/app.component.ts**                      | typescript class of the base component                                                                    |
| **src/app/app.module.ts**                      | declares the app module                                                                    |
| **src/app/graphql.module.ts**                      | initializes the connection to the back-end system                                                                   |
| **src/app/material.module.ts**                      | imports all used material design components                                                                |


## Feature-based structure
### Naming
#### 1. Definitions
- wrapper/child component = represents a component, that extends a child-component with some parameters and functions. For example a child component can implement an input formular. The wrapper components will implement the submit function of the input-formular. A good exemaple for that can be seen in this sample project. </br></br>- [child-component](https://github.com/mayerph/graphql-client-starter/tree/master/src/app/modules/user/components/user-detail) </br>- [wrapper-component](https://github.com/mayerph/graphql-client-starter/tree/master/src/app/modules/user/components/user-detail-admin)

- feature = combines complementary implementations
e.g. user

- role = a certain kind of implementation
e.g. interface

- features-based directory = organizes all roles related to a feature. 


#### 2. Convention
- wrapper components</br>(e.g child component = user-detail)

```
<child-component>-<wrapper-extension>
e.g. user-detail-admin
```

- graphql-queries, models
```
<feature>-<role>
e.g. user.model.ts
```


### Sample project structure
The project structure follows a kind of a feature-based approach. Any complementary implementations should be placed in the same directory. This one represents a module and consists of a few subdirectory for the components, the graphql queries, ...


| Name | Description |
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|
| **src/app/modules/\<module>**                  | contains the components, services, graphQL-Queries, models, services and types of a feature                           |
| **src/app/modules/\<module>/components**        | contains all components of a module.  |
| **src/app/modules/\<module>/gql**              | contains all graphql query files  |
| **src/app/modules/\<module>/models**           | contains all models and interfaces related to the module |
| **src/app/modules/\<module>/service**           | contains all services of a module. The service uses the graphql queries of the gql directory to access the back-end   |
| **src/app/modules/\<module>/types**           | contains the signatures of some methods   |

### Adding a new feature/module
For adding a new feature or module you have to create a new feature-based directory in the src/app/modules directory including all files and directories equal to the sample project structure. This could be done by using the angular cli: 

**1. Adding a component</br>[sample implementation](https://github.com/mayerph/graphql-client-starter/tree/master/src/app/modules/user/components/user-overview)**
```
ng g c modules/<module>/components/<component> --module app
(e.g. ng g c modules/help/components/help-overview --module app)
```

**2. Adding a service</br>[sample implementation](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/user/services/user.service.ts)**
```
ng g s modules/<module>/services/<service>
(e.g. ng g s modules/<module>/services/help)
```
  
**3. Adding a graphql operation (query, mutation, subscription, fragment)</br>[sample implementation](https://github.com/mayerph/graphql-client-starter/tree/master/src/app/modules/user/gql)**
```
mkdir src/app/modules/<module>/gql
(e.g. touch src/app/modules/user/gql/)

touch src/app/modules/<module>/gql/index.ts
(e.g. touch src/app/modules/user/gql/index.ts)

touch src/app/modules/<module>/gql/<feature>.<role>.ts
(e.g. touch src/app/modules/user/gql/user.query.ts)
```

**4. Adding a model</br>[sample implementation](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/user/models/user.model.ts)**
```
mkdir src/app/modules/<module>/models
(e.g. touch src/app/modules/user/models/)

touch src/app/modules/<module>/models/<feature>.<role>.ts
(e.g. touch src/app/modules/user/models/user.model.ts)
```

**5. Adding a type</br>[sample implementation](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/user/types/onSubmit.type.ts)**
```
mkdir src/app/modules/<module>/types
(e.g. touch src/app/modules/user/types/)

touch src/app/modules/<module>/types/<feature>.<role>.ts
(e.g. touch src/app/modules/user/types/onSubmit.type.ts)
```

### Protecting the application
#### 1. Route-Protection
Protecting a route requires extending a standard route configuration of the [routing module](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/app-routing.module.ts) with two properties:</br>- canActivate = defines the implementation of the protecting mechanisms</br>- data.permissions = defines the necessary permissions for using the route.


```javascript
    {
        path: 'user-admin',
        component: UserAdminComponent,
        canActivate: [AuthGuard],
        data: {
            permissions: [Permission.adminDefault],
        },
    },
```

In this example the 'user-admin' route, which loads the [UserAdminComponent](https://github.com/mayerph/graphql-client-starter/tree/master/src/app/modules/user/components/user-detail-admin) is protected by the [AuthGuard](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/auth/guard/auth.guard.ts) class.

The route can only be accessed by users with the adminDefault Permission. The permissions of the front-end are equal to them of the back-end. Nevertheless they have to be defined in an [enumeration](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/role/enums/permisson.enum.ts).
A complete list of the permissions can be found [here](https://github.com/mayerph/grapqhl-server-starter/blob/master/README.md#permissions).

#### 2. Hide and show elements according to the user permissions
To hide and show elements according to the users permissions you have to use the methods of the authService.

- (1) Inject the authService via the constructor of the typescript class of the component
```javascript
constructor(public authService: AuthService) {}
```

- (2) call a function of the authService in the component's template
```html
<div *ngIf="authService.isAuthorized([permissions.adminDefault])">
  <!-- some content --> 
</div>
```
In this example the container element is only viewed if the users has the adminDefault permission. Alternatively you can use the isAuthenticated() method to check if the user is signed in. A good example for hiding and showing elements according to the user's permissions can be found [here](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/navigation/components/header/header.component.html) 

### Responsive Webdesign
#### 1. flex-layout
For optimizing the application's layout to the width of a device the flex-layout module has been used.
A detailed documentation of the module can be found on the [official github page](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview). 

- Desktop</br>

![frontend_1](../assets/frontend_1.png?raw=true)

- Mobile</br>

<img src="https://raw.githubusercontent.com/mayerph/graphql-client-starter/assets/frontend_2.png" width="40%">

In this sample project the module is used for three kinds of modification:
1. reposition of elements. [welcome.component](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/welcome/components/welcome.component.html) line 1
```html
<div class="welcome" fxLayout="column" fxLayout.gt-md="row" fxLayoutGap.gt-md="20px" fxLayoutAlign="center center">
  <section>
    <h1>SKI</h1>
    <p>rent ski for the whole saison</p>
  </section>
  <section>
    <h1>SNOWBOARD</h1>
    <p>rent snowboards for the whole saison</p>
  </section>
  <section>
    <h1>ACCESSOIRES</h1>
    <p>rent accessoires for the whole saison</p>
  </section>
</div>
```

The code snipped above shows a container element containing three section elements. By default these elements are ordered horizontally.  (fxLayout="column"). For devices with a display width greater than medium (fxLayout.gt-md) the section elements will be ordered vertically.  

2. increase and shrink the element's width. [user-detail.component](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/user/components/user-detail/user-detail.component.html) line 3
```html
<mat-card fxFlex.xs="100%" fxFlex="400px">
  <!-- some content -->
</mat-card>
```
The element above will be displayed along the full width of the display if the width of display is xs (extra small). Otherwise the element has a width of 400px. 

3. hide and show elements. [header.component.html](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/modules/navigation/components/header/header.component.html) line 3
```html
<div fxHide.gt-xs>
    <button (click)="onToggleSidenav()" mat-icon-button>
        <mat-icon>menu</mat-icon>
    </button>
</div>
```

The code-snipped above defines the menu-button for the side navigation bar. The button should be only visible for small devices. Therefore the fxHide.gt-xs directive ("hide element if width of the device is greater then extra small") is called.

#### 2. Angular Material
The Material Design Components implement reusable building blocks, which make it easy to create a reactive layout. A detailed description can be found in the offical [Angular Material Guide](https://material.angular.io/guides).
The available components can be found [here](https://material.angular.io/components/categories). In the API section of each element is a description, how to use the specific component.

##### Adding a Material Design Component
1. Import the specific module in the [src/app/material.module.ts](https://github.com/mayerph/graphql-client-starter/blob/master/src/app/material.module.ts) file
```javascript
import { MatButtonModule } from '@angular/material/button';
```

2. Add the module to the imports and exports property
```javascript
@NgModule({
  imports: [
      MatButtonModule,
    ],
  exports: [
        MatButtonModule
  ],
})
export class MaterialModule { }
```

3. Import the material components in the typescript class of the component
```javascript
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material'
```
