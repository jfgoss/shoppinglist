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

## Running unit tests

```bash
npm test
```

## API Documentation

Please refer to the [swagger documenation](./openapi.yaml).