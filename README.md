# Backoff

Retry promise execution implememting exponential backoff.

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

const randomError = await backOff(() => randomError('Error message');
```