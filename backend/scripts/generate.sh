#!/bin/sh

go generate ./...
go mod tidy
go run github.com/vektra/mockery/v2@v2.53.5
