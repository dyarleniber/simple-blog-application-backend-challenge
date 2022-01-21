# Simple Blog Application: backend challenge

[![CI](https://github.com/dyarleniber/simple-blog-application/actions/workflows/ci.yml/badge.svg)](https://github.com/dyarleniber/simple-blog-application/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/dyarleniber/simple-blog-application/badge.svg?branch=main)](https://coveralls.io/github/dyarleniber/simple-blog-application?branch=main)

Simple Blog API built with [TypeScript](https://www.typescriptlang.org/) and [MongoDB](https://www.mongodb.com/), using Clean Architecture, and SOLID principles.

The API allows users to create, read, update and delete blog posts and comments. It also has an authentication system that supports login and signup, which uses JWT.
In order to make operations to create/update/delete posts and comments, the user must be authenticated.

A CI workflow created on [GitHub Actions](https://github.com/features/actions) is responsible for automatically test the source code, generate a coverage report and upload it on [Coveralls](https://coveralls.io). All these jobs are activated by a push or pull request event on main branch.

To run this API locally, you can use the container environment created for this project using [Docker Compose](https://docs.docker.com/compose/) with the right version of [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/). Check the configuration section below.

An API documentation with some requests and responses examples is available on [dyarleniber.github.io/simple-blog-application-backend-challenge](https://dyarleniber.github.io/simple-blog-application-backend-challenge/). This documentation was generated using [Insomnia](https://insomnia.rest/) and [Insomnia Documenter](https://github.com/jozsefsallai/insomnia-documenter).

## Architecture

To separate concerns, the application was built with a **Clean Architecture**. The application is divided into **Domain**, **Application**, and **Infrastructure** layers: There is also a **Main** layer, which is the entry point of the application.

There are unit and integration tests covering each layer of the application. The main tool used to test the application is [Jest](https://facebook.github.io/jest/).

To cover the **Main** layer, integration tests were created to test the HTTP requests of the API. That way, I can assure that the [Express](https://expressjs.com/) server is working correctly, all the adapters are also working as expected, and all the dependencies are being injected correctly.
For all the other layers, unit tests were created, using mocks and stubs to mock the dependencies.

And for testing the MongoDB, an in-memory implementation was used as a Jest preset.

> Due to a lack of time, the tests were implemented just for posts. And the integration tests were implemented just for login and signup.
> 
> However, as mentioned above, the tests were implemented to cover all layers, and the same approach was used to test the controllers, middlewares, repositories, routes, etc. for posts. It can also be used to test comments or any other subdomain.

### Domain Layer

The **Domain** layer is the layer that contains the business logic of the application. It contains the **Entities**, which are the classes that represent the data of the application. This layer is isolated from outer layers concerns.

Due to limited time, I decided to take a simpler approach here. And, although some **Domain-Driven Design** patterns have been implemented, such as **DTOs**, **Mappers** , **Entities**, and the **Repository** pattern. Some other DDD patterns could also be implemented to enrich the application domain, and avoid illegal operations and illegal states.

Such as **Value Objects**, they could be used to define the minimum and maximum size, and the standards that the content of the post must follow. Not only that, but they could also be used to override all (or most) of the primitive types, such as strings, numbers, and booleans.

### Application Layer

The **Application** layer is the layer that contains the _application specific_ business rules. It implements all the use cases of the application, it uses the domain classes, but it is isolated from the details and implementation of outer layers, such as databases, adapters, etc. This layer just holds interfaces to interact with the outside world.

I also defined interfaces for each use case, in order to make the application more testable, since I'm using these interfaces to create stubs for testing the controllers and middlewares in the infrastructure layer.

### Infrastructure Layer

The **Infrastructure** layer is the layer that contains all the concrete implementations of the application. It contains repositories, adapters, controllers, middlewares, etc.  It also contains the validators, which are used to validate the data of the controllers.

### Main Layer

The **Main** layer is the entry point of the application. It is the layer that contains the Express server, and where all the routes are defined. In this layer I also compose all the controllers, middlewares, and use cases, injecting the dependencies that are needed, since I am not using any dependency injection container.

## Configuration

To clone and run this application, you’ll need to have [Git](https://git-scm.com), [Docker](https://www.docker.com), [Docker Compose](https://docs.docker.com/compose), and [npm](https://www.npmjs.com) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dyarleniber/simple-blog-application-backend-challenge.git

# Go into the repository folder
$ cd simple-blog-application-backend-challenge

# Start the application
$ npm run up
# This will build and run the Node.js and MongoDB images,
# build the TypeScript files, and run the application in watch mode.

# To shut down the application run the following command
$ npm run down
```

To run the tests, use the following commands:

```bash
$ npm run test

# Or

$ npm run test:ci
# This will also generate the coverage report
```

Use the following command to run [Eslint](https://eslint.org) from the command line:

```bash
$ npm run lint
```

## Improvements

Some improvements that could be made in the future:
- Include an ODM and a Schema validation library like [mongoose](https://mongoosejs.com/).
- Involve all the database operations in a transaction, to avoid data inconsistency.
- Improve the validations applied to the controllers, to make them more strict.
- Include more use cases to manage the users.
