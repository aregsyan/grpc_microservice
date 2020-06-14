default: run

build:
	@echo BUILD GRPC_MICROSERVICES
	@docker-compose -f docker-compose.yml -p gprc_microservices build


run: build
	@echo START GRPC_MICROSERVICES
	@docker-compose -f docker-compose.yml -p gprc_microservices up --remove-orphans -d

stop:
	@echo STOPPING GRPC_MICROSERVICES
	@docker stop app_client_microservice  || true && docker rm app_client_microservice || true
	@docker stop server_microservice  || true && docker rm server_microservice || true

clean: stop
	@docker ps -q -f status=exited | while read l; do docker rm $$l; done
	@docker images -q -f dangling=true | while read l; do docker rmi $$l; done
	@docker system prune -f
