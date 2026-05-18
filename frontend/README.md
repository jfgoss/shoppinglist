# shopping list frontend

Shopping list frontend built on [React Router JavaScript template](https://github.com/remix-run/react-router-templates/tree/main/javascript).

Note that some sections of this document are from the original React Router template readme.

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

The server can be started locally using the command

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Running unit tests

```bash
npm test
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```
