# docker commands

### view docker images

```shell
docker ps # -a if the containers are down
```

### to delete docker containers

```shell
docker rm <container_id>
```

### to check docker images

```shell
docker images
```

### to delete docker images

```shell
docker rmi <container_id>
```

### to build container

```shell
 docker-compose -f docker-compose.yml build
```

### to run container

```shell
 docker-compose -f docker-compose.yml up <container_name_optional> # -d to run in background
```

### to stop container

```shell
 docker-compose down <container_name_optional>
```

## docker-compose run ...

### to run all tests in the components packages

```shell
docker-compose run dev pnpm recursive test --filter ./components  -- --watchAll=false --passWithNoTests
```
