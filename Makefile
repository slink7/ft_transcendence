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

ps:
	$(COMPOSE) ps

.PHONY: all up detached stop down clean fclean re logs ps
