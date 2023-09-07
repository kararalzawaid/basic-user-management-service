## Project setup

In the project directory, run:

### `docker-compose build`
### `docker-compose up`

After that enter to the docker container and write 

### ` yarn sequelize-esm db:migrate`

Docker will start the server in develop mode on: <http://localhost:4000/>

## Database CLI

### You should be able to run CLI with

### `$ yarn sequelize-esm`

```
Commands:
  db:migrate                        Run pending migrations
  db:migrate:schema:timestamps:add  Update migration table to have timestamps
  db:migrate:status                 List the status of all migrations
  db:migrate:undo                   Reverts a migration
  db:migrate:undo:all               Revert all migrations ran
  db:seed                           Run specified seeder
  db:seed:undo                      Deletes data from the database
  db:seed:all                       Run every seeder
  db:seed:undo:all                  Deletes data from the database
  db:create                         Create database specified by configuration
  db:drop                           Drop database specified by configuration
  init                              Initializes project
  init:config                       Initializes configuration
  init:migrations                   Initializes migrations
  init:models                       Initializes models
  init:seeders                      Initializes seeders
  migration:generate                Generates a new migration file       [aliases: migration:create]
  model:generate                    Generates a model and its migration  [aliases: model:create]
  seed:generate                     Generates a new seed file            [aliases: seed:create]

Options:
  --version  Show version number                                         [boolean]
  --help     Show help                                                   [boolean]
```
