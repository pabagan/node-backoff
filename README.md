# Backoff

Retry promise execution implememting exponential backoff. Run backoff is result contains `status` > `500`.

Usage: 

```ts
import backoff from '@pabagan/backoff';

function hola() {
  return 'hola';
}

function randomError(message) {
  if (Date.now() % 2 === 0) {
    throw new Error(`Error ${message}`);
  }

  return `OK: ${message}`;
}

function randomErrorRest() {
  if (Date.now() % 2 === 0) {
    return {
      status: 500
    };
  }

  return {
    status: 200
  };
}

const opErrorEstatusCode = await backOff(() => randomErrorRest());
const opFunction = await backOff(() => randomError());
const opWithConf = await backOff(() => randomErrorRest(), {
  tryUntil: '10min',
  delay: 1000,
  runAt: Date.now()
});
```