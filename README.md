# Cat API / fullstack exercise ![Build Status](https://travis-ci.com/Zeukkari/cat-api.svg?branch=master)

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

![](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Zeukkari/harkkaprojekti4/master/architecture.puml)

## Data Model

![](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/Zeukkari/harkkaprojekti4/master/database.puml)
