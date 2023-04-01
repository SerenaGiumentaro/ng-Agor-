# Agora
## Project Tree
```bash
.
└── src/
    ├── app/
    │   ├── components
    │   └── services
    ├── dashboard/
    │   ├── components
    │   └── services
    ├── login-signup/
    │   ├── components
    │   └── services    
    ├── posts/
    │   ├── components
    │   └── services
    ├── shared/
    │   ├── components
    │   └── services
    └── assets
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

For lazy loading pourpose it is divided by modules:
- dashboard('users')
- posts
- login-signup, that handle the authentication system
- shared, that handle the dialog component shared with all the application

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

