# Backend database

The backend database uses MariaDB running within a dockerfile.

## Prerequisites

### Installing Docker image 
Install Docker and download specific [MariaDB LTS image using a SHA for linux/amd64](https://hub.docker.com/_/mariadb/tags?name=lts).

Note: is desired, you could use `mariadb:lts` instead of a SHA, but it is more secure to reference an image has directly.

```bash
sudo apt install docker.io
sudo docker pull mariadb@sha256:<sha>
```

### Initialising the server
The server can be initialised and run with 
```bash
docker run --detach --name <new container name> \
  --env MARIADB_ROOT_PASSWORD=<root password> \
  -p 3306:3306 \
  -v <volumename>:/var/lib/mysql \
  --mount type=bind,src=.,target=/scripts \
  <image id (first 12 characters of sha)>
```
This will by default expose port `3306` for network connections. This is mapped to local ip `3306` above using the `-p` flag. 

The `volumename` specifies a Docker volume to be mounted such that data persists between container instances.

The mount will add the current working directory to the `/scripts` folder in the running container so that we have access to the SQL scripts from the host.

### Get the local IP address

Due to [localhost network connections failing](https://mariadb.com/docs/server/server-management/automated-mariadb-deployment-and-administration/docker-and-mariadb/installing-and-using-mariadb-via-docker#connecting-to-mariadb-from-outside-the-container), we need to find the IP address the Docker container is running under in order to connect to it.

```bash
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' shoppinglistdb
```

Store this value for later as it is needed for setting up environment variables to configure the [node.js backend](../listapi/README.md).

### Connecting to the server and create client application database and user

The database and user for the client application can be automatically created when the docker container is initialised using the environment variables `MYSQL_DATABASE`, `MYSQL_USER` and `MYSQL_PASSWORD`, however greater flexibility for user permissions are possible if they are created manually using the MariaDB terminal.

Confirm the docker container is running
```bash
docker ps
```

Execute the command `mariadb` in an interactive terminal, connecting as `root` user. You can log in with the password set as `MARIADB_ROOT_PASSWORD` when the container was initialised.
```bash
docker exec -it <container name> mariadb -u root -p
```

Once connected to the database server, the application database and user the application will use need to be created.
```sql
CREATE DATABASE shopping_list_db;
SHOW DATABASES;
```
Create an application user and password for the client application, with restricted permissions.
```sql
CREATE USER 'shoppinglistapp'@'%' IDENTIFIED BY '<app client password>';
GRANT SELECT, INSERT, UPDATE, DELETE ON shopping_list_db.* TO 'shoppinglistapp'@'%';
FLUSH PRIVILEGES;
SELECT User FROM mysql.global_priv;
```

The new user has been [granted permission to connect remotely](https://mariadb.com/docs/server/mariadb-quickstart-guides/mariadb-remote-connection-guide) from all hosts (`%`). To restrict access, this can be a specific or range of IP addresses using the `%` wildcard.

We can see that the new `shoppinglistapp` user we just created does not have permissions to connect if the host is not `localhost`. 
```sql
SELECT User, Host FROM mysql.user
WHERE Host <> 'localhost' AND Host <> '127.0.0.1' AND Host <> '::1';
```

Exit the mariadb terminal and interactive docker session
```sql
exit
```

#### Test the new user

```bash
docker exec -it <container name> mariadb -u shoppinglistapp -p
```

```sql
SHOW DATABASES;
SELECT * FROM shopping_list_db.listItem;
exit
```

Should only list `information_schema` and `shopping_list_db` as avaialble databases and succeed to `SELECT` from the database table.

## Scripts

There are various folders within the (scripts)[./scripts] folder that can perform various actions on the database.

Run these by connecting to bash shell in the MariaDB container.
```bash
docker exec -it <container name> bash
```

Run a specific script from bash as below (note the use of the &lt; and &gt; characters) and clean up output file.
```bash
mariadb -u root -p shopping_list_db < ./scripts/<script name> > output
cat output # view output contents in shell
rm output
```

| Script name     | Purpose |
| --------------- | ------- |
| schema.sql      | Delete all existing shopping list database tables and initialise |
| seed.sql        | Create sample data within an initialised database                |

Creating a user table at this point is not required. The software will use the list of usernames in the shopper table and generate access tokens as required.

## Useful commands

Pause/restart Docker container
```bash
docker container ls
docker container pause <container id>
docker container unpause <container id> 
```

List created tables in MariaDB terminal 
```sql
USE shopping_list_db
SHOW TABLES;
```

Update host that a user can connect from
```sql
SELECT User, Host FROM mysql.user;
RENAME USER 'shoppinglistapp'@'<current host>' TO 'shoppinglistapp'@'<new host>';
```

Get MariaDB docker container logs
```bash
docker logs <container name>
```