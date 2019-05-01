# Cat API / fullstack exercise

![Build Status](https://travis-ci.com/Zeukkari/cat-api.svg?branch=master) [![Codecov Coverage](https://img.shields.io/codecov/c/github/zeukkari/cat-api/master.svg?style=flat-square)](https://codecov.io/gh/zeukkari/cat-api/) [![David](https://img.shields.io/david/zeukkari/cat-api.svg)](https://img.shields.io/david/zeukkari/cat-api.svg) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Zeukkari_cat-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Zeukkari_cat-api) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Zeukkari_cat-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=Zeukkari_cat-api) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Zeukkari_cat-api&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=Zeukkari_cat-api) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Zeukkari_cat-api&metric=security_rating)](https://sonarcloud.io/dashboard?id=Zeukkari_cat-api)


Demo: https://radiant-wave-74426.herokuapp.com/

GraphQL playground: https://radiant-wave-74426.herokuapp.com/graphql

## Getting Started

Install/setup Docker.

Init .env file `cp .env.EXAMPLE .env`

Run docker-compose `docker-compose up`

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
