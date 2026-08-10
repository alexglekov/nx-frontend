# XYRO frontend

## Tech stack

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [ESLint](https://eslint.org), [stylelint](https://stylelint.io) and [Prettier](https://prettier.io) on VSCode and before you commit with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- E2E tests with [Cypress](https://www.cypress.io).

## TODOs

[List of tech improvements](./TODO.md)

## Misc

- The server graphql endpoint: http://localhost:3001/graphql
- The frontend oauth endpoint: http://localhost:3000/oauth?params...

## How-to's

### Test production build in Docker

1. Launch your Docker (Desktop app or terminal)
2. > docker build .

### Work with stand

```
Add to /etc/hosts

# xyro
127.0.0.1       local.xyro.io

```

open in browser: https://local.xyro.io:3000

### Reset database due to schema updates

1. Go to Docker Desktop App
2. Open container "xyro-postgres"
3. Open Terminal Tab
4. In the container's console run commands:
   ```shell
   psql postgres://postgres:postgres@localhost:5432/xyro
   create database "test";
   \c test
   DROP DATABASE "xyro";
   ```
5. In the backend's root run command: `npm run db:migrate`
