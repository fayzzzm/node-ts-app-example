# Makefile for Docker Compose management (Compose V2 syntax)

.PHONY: build up down clean

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

clean:
	docker compose down -v --rmi all --remove-orphans 