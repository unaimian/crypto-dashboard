# Crypto Dashboard

## Overview
Crypto Dashboard is a React & TypeScript application that provides real-time monitoring of cryptocurrency orders and alerts based on specific trading rules. The application connects to the CryptoCompare WebSocket API to stream live data from Binance for BTC/USDT trading pairs.

## Getting Started

### Installation

Install the dependencies:
```sh
npm install
```

### Running the App

To start the development server, run:
```sh
npm start
```

### Building the App

To build the app for production, run:
```sh
npm run build
```
The production-ready files will be generated in the `build` directory.

## Project Structure
```
crypto-alerts
├── public
├── src
│   ├── components
│   ├── constants
│   ├── contexts
│   ├── enums
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── types
│   ├── App.tsx
├── package.json
├── tsconfig.json
```

## Testing

### Running Tests

To run all tests once:
```sh
npm test
```

To run tests with coverage report:
```sh
npm test -- --coverage
```

## Available Scripts

- `npm run build` for building the app for production
- `npm run test` for running all tests
- `npm run lint` for eslint checks
- `npm run format` for running prettier to format code
- `npm run tsc` or `npx tsc` for typechecking
