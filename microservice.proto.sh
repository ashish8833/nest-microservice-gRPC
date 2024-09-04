#!/bin/bash
protoc \
--plugin=$(npm root)/.bin/protoc-gen-ts_proto \
--proto_path=./apps/nest-microservice-g-rpc/assets/proto \
--proto_path=./apps/nest-microservice-g-rpc/assets/proto \
--ts_proto_out=./apps/nest-microservice-g-rpc/assets/proto \
--ts_proto_opt=nestJs=true,useOptionals=messages \
./apps/nest-microservice-g-rpc/assets/proto/*.proto
