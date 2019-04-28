# Cat API / fullstack exercise ![Build Status](https://travis-ci.com/Zeukkari/cat-api.svg?branch=master) [![Codecov Coverage](https://img.shields.io/codecov/c/github/zeukkari/cat-api/master.svg?style=flat-square)](https://codecov.io/gh/zeukkari/cat-api/) [![David](https://img.shields.io/david/zeukkari/cat-api.svg)](https://img.shields.io/david/zeukkari/cat-api.svg) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Zeukkari_cat-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=Zeukkari_cat-api) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)



Demo: https://radiant-wave-74426.herokuapp.com/

GraphQL playground: https://radiant-wave-74426.herokuapp.com/graphql

## Getting Started

Install node.js v10.x.x.

Set up PostgreSQL server somewhere. The demo deployment of this project uses [https://www.elephantsql.com/](https://www.elephantsql.com/)

```
cp .env.EXAMPLE .env
```

Edit .env file and update DATABASE_URL field to point to your database instance.

Install dependencies:

```
npm install
```

Build client:

```
npm run build:client
```

Start development server:

```
npm run serve
```

The demo should now be accessible at [http://localhost:8000/index.html](http://localhost:8000/index.html).

There's also a graphiql playground available at [http://localhost:8000/graphql](http://localhost:8000/graphql).

## Backend: Cat API

Suggested technologies: Node.js, GraphQl, MongoDB/PostgreSQL, Typescript

Create a REST api and deploy it. The Api should include following endpoints:

Get all breeds

Get a breed by id

Search a breed by name

### Model

Breed:

- Name
- Description
- Temperament
- Origin

## Frontend

Suggested technologies: React

## Architecture

![](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Zeukkari/cat-api/master/architecture.puml)

## Data Model

![](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Zeukkari/cat-api/master/database.puml)
