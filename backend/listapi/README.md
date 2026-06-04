# listapi

Lightweight node backend for managing a shopping list.

## Dependencies

### node package manager

Install `npm` using your system's package manager. e.g. for `apt`
```bash
sudo apt get npm
```

Then install the source dependencies using `npm`.

```bash
npm i
```

### Node v24.9+

For testing mixed ESM and ECMA/CommonJS with Jest, version v24.9+ needs to be installed. This can be done using node version manager.

Install [nvm from GitHub](https://github.com/nvm-sh/nvm#installing-and-updating) using the install script and pipe directly to bash shell.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Reset the current shell environment.
```bash
source ~/.bashrc
```

Check available node versions.
```bash
nvm list-remote
```

Install required version.
```bash
nvm install <version>
```

To list installed versions and switch between desired versions.
```bash
nvm list
nvm use <version>
```

## Configuration

The following environment variables can be used to configure the server.

| Variable | Default | Description |
| -------- | ------- | ----------- |
| SHOPPING_LIST_PORT        | 3000             | Port to listen on for frontend connections |
| SHOPPING_LIST_DB_HOST     | 127.0.0.1        | IP address / hostname of the DB server to connect to |
| SHOPPING_LIST_DB_PORT     | 3306             | Port number of the DB server |
| SHOPPING_LIST_DB_NAME     | shopping_list_db | Database name on the server |
| SHOPPING_LIST_DB_USER     | shoppinglistapp  | Username to connect as of the DB server |
| SHOPPING_LIST_DB_PASSWORD | N/A              | Password for the user, if not set ommitted |

## Running the server

The server will run by default on port 3000. Start it using the following command.
```bash
npm start
```

### Testing server is running
To test the server is running, check the `/status` endpoint on port 3000.
```bash
wget -qO- http://localhost:3000/status
```

This should return
```json
{
  "statusCode":200,
  "message":"listapi server running",
  "timestamp":"<server timestamp>"
}
```

### Testing specific endpoint examples

```bash
# Login as username alice_wonder and set AUTH_TOKEN variable
AUTH_TOKEN=$(curl -X POST -H "Content-Type: application/json" -d "{ \"username\": \"alice_wonder\" }" http://localhost:3000/login | jq -r '.token')

# Get list id 1
curl -H "Authorization: $AUTH_TOKEN" http://localhost:3000/list/1

# Update list id 1
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: $AUTH_TOKEN" \
  -d "{ \"listId\": 1, \"list\": [{\"order\":1,\"price\":1.49,\"title\":\"Sourdough Bread\"},{\"order\":2,\"price\":3.29,\"title\":\"Whole Milk (2 L)\"},{\"order\":3,\"price\":2.75,\"title\":\"Free-Range Eggs (6)\"},{\"order\":4,\"price\":4.99,\"title\":\"Cheddar Cheese (400 g)\"},{\"order\":5,\"price\":0.89,\"title\":\"Bananas (x6)\"}] }" \
  http://localhost:3000/list
```

## Running unit tests

```bash
npm test
```

## API Documentation

Please refer to the [swagger documenation](./openapi.yaml).