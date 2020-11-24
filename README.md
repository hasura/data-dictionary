# Hasura Data Dictionary

---

## Introduction

The Data Dictionary is a set of tools which allow users and organizations to explore & collaborate on their data.

There are two pieces to the Data Dictionary:

1. A **GraphQL endpoint** that provides **information on Hasura Metadata and the Database schema**
2. A **client-side layer** which consumes this API to provide the **visualization of that data**

In this repository, there is a Next.js reference application which showcases bringing these pieces together. You can use this reference application as the base for building your own tooling, or use just the GraphQL service, or whichever bits-and-pieces you might prefer.

## Demo

![](./data-dictionary-readme-demo.gif)

## Architecture

At a high-level, here are some of the tools and libraries used to build this experience:

- TypeScript
  - JavaScript, but with types
  - https://github.com/microsoft/TypeScript
- React
  - JavaScript framework
  - https://github.com/facebook/react
- Next.js
  - React framework. Used for lazy file-based routing and because the `/pages/api` functionality provides an easy way to run and host/deploy the GraphQL service on the serverside (along with the client layer)
  - https://github.com/vercel/next.js
- TailwindCSS
  - Utility-first CSS framework
  - https://github.com/tailwindlabs/tailwindcss
- PgTyped
  - Used to auto-generate TS types from SQL queries, so that the queries run to get DB information (tables, schemas, columns, views, etc) have strongly-typed results
  - https://github.com/adelsz/pgtyped
- genql
  - Auto-generates a typesafe GraphQL query client (differs from `graphql-codegen` in that you don't need to provide manual operations in files, it does dynamic type inference)
  - https://github.com/remorses/genql
  - _Note: This library is also basically the same as https://github.com/graphql-editor/graphql-zeus. They are both solid._
- easy-peasy
  - Redux, but wrapped with Immer and a better API
  - https://github.com/ctrlplusb/easy-peasy

The folder structure of the application and descriptions is as below:

```
├── hasura // Contains docker-compose.yaml to run PG + Hasura, and migrations + seeds for Chinook
└── react-app // Contains Next.js app with frontend web app and backend GraphQL API
```

## Setup Instructions

- Clone this repo
- `cd hasura`, then `docker-compose up -d`
  - This exposes Hasura on `localhost:8085` and Postgres is on `localhost:5430` (to not conflict with potential other running apps)
  - Hasura has the Chinook schema + rows as a migration, along with the Metadata, and uses the `.cli-migrations` variant so it will auto-apply these for you
- From the root of the project
  - `cd react-app`
  - `yarn install` or `npm install`
  - `yarn dev` or `npm run dev`
  - This starts Next.js on `localhost:3000`
  - It contains the GraphQL API under the `/pages/api/graphql.ts`
  - GraphQL Playground is available at `localhost:3000/api/graphql`
