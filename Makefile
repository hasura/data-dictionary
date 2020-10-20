.PHONY: seed_chinook_database help 

PGUSER=postgres
PGPASS=postgrespassword
PGADDRESS=localhost:5430
SEEDFILE=chinook_pg_serial_pk_proper_naming.sql

seed_chinook_database: ## Creates Chinook database schema & seed data in Hasura for testing
	psql postgres://$(PGUSER):$(PGPASS)@$(PGADDRESS)/postgres <$(SEEDFILE)

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help