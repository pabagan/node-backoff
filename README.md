# Backoff

Retry inplementing exponential backoff based on error throwing or result containing `status > 500`.

Usage: 

```ts
import backoff from '@pabagan/backoff';

const opErrorEstatusCode = await backOff(() => randomErrorRest());
const opFunction = await backOff(() => randomError('message'));
const opWithConf = await backOff(() => randomErrorRest(), {
  tryUntil: '10min',
  delay: 1000,
  runAt: Date.now()
});
```