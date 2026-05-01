COMPOSE		= docker compose --env-file $(ENV_FILE)
ENV_FILE	= $(shell [ -f .env ] && printf ".env" || printf ".env.example")
RM			= rm -rf

all: up

up:
	$(COMPOSE) up --build -d

attached:
	$(COMPOSE) up --build

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down --remove-orphans

fclean:
	$(COMPOSE) down --volumes --remove-orphans --rmi local
	$(RM) backend/dist frontend/dist

re: fclean all

logs:
	$(COMPOSE) logs -f

monitor-logs:
	$(COMPOSE) logs -f prometheus grafana postgres-exporter blackbox-exporter

ps:
	$(COMPOSE) ps

.PHONY: all up attached stop down clean fclean re logs monitor-logs ps
