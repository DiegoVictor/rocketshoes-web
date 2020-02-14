# About
A fake shoes web store
<br/><br/>
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-web/master/screenshots/dashboard.png" width="100%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-web/master/screenshots/cart.png" width="100%" />

# Install
```
$ yarn
```

# Dependencies
Was installed and configured the `eslint` and `prettier` to keep the code clean and patterned.

# Reactotron
This project is configured with [Reactotron](https://github.com/infinitered/reactotron), just open the Reactotron GUI before the app is up and running, after start the app Reactotron will identify new connections.

# .env
Rename the `.env.example` to `.env` then just update with yours settings.

# API
Start the server the fake server:
```
$ yarn json-server server.json -p 3333
```
> If any change in the fake api's port (the `-p` option) was made remember to update the `.env` too.

# Start up
```
$ yarn start
```

# Tests
```
$ yarn test
```
> And `yarn coverage` to run tests with coverage
