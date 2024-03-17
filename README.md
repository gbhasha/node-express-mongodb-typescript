# Building A REST API With Node, Express, TypeScript & MongoDB + Authentication

## Folder structure

Created below folder structure to group related code:
* `index.ts` for main application code.
* `routes` folder for route definitions.
  * Create separate file for each route or group of related routes 
* `controllers` folder for controller functions handling routes.
  * Keep controllers thin, focusing on request handling and delegating tasks to services.
* `services` folder for business logic services.
  * Services contain reusable logic, independent of routes and controllers.
* `models` folder for database models 
  * Define your database schema here
* `middleware` folder for custom middleware functions (if applicable).
* `config` folder for configuration files (if applicable).
* `helper` folder for helper functions
* `types` folder for type definations


## Steps:
- Environment setup
- Setup Express server
- MongoDB Setup
- Creating User Model
- Helpers for authentication
- Authentication controllers
- Authentication routing and logging in
- Middleware creation
- Users controller and routing

## Ref video: 
- https://www.youtube.com/watch?v=b8ZUb_Okxro&t=1076s
