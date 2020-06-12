runall: ## Load the data, start api and frontend client
	make etl-loaddata
	make api-build
	make api-start-background
	make client-start

### ETL ###
etl-loaddata: ## Drop database and recreate
	-docker stop api_flask_1
	-docker stop api_database_1
	-docker container rm etl_database_1
	-docker container rm api_database_1
	-docker volume rm etl_postgres_data
	docker-compose -f etl/docker-compose.yaml up --build --abort-on-container-exit --exit-code-from dataloader


### CLIENT ###
client-start: ## Start frontend
	cd client && yarn start


### API ###
api-build: ## Rebuild flask container - use this if you change requirements.txt or Dockerfile
	docker-compose -f api/docker-compose.yaml build

api-start: ## Start flask and postgres with logs from both containers streaming to stdout
	docker-compose -f api/docker-compose.yaml up

api-start-debug: ## Start flask/postgres with debugging enabled
	DEBUG=True docker-compose -f api/docker-compose.yaml up 

api-start-background: ## Start flask/postgres in the background
	docker-compose -f api/docker-compose.yaml up -d




.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'