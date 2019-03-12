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
cd <project_name>
npm install
```

-   Serve the application

```
cd <project_name>
ng serve --open
```

# Developing

-   Serve the application

```
cd <project_name>
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


