# hasura-data-dictionary

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
