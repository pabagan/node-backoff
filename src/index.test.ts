import test from 'ava';
import { createSandbox, restore, stub } from 'sinon';
import * as backoff from './index';

const hola = () => {
  return 'hola';
};

const error = () => {
  throw new Error('Error');
};

const okRest = () => {
  return {
    status: 200
  };
};
const errorRest = () => {
  return {
    status: 500
  };
};


let consoleDebug;

test.before(() => {
  createSandbox();
  // stubs
  consoleDebug = stub(console, 'debug');
});

test.after(() => {
  consoleDebug.restore();
  restore;
});

test('should test backoff intervals', async (t) => {
  const op = await backoff.backoffIntervals['1min'];

  t.is(op, 1000 * 60);
});

test('should test backoff sucess', async (t) => {
  const op = await backoff.backOff(hola);

  t.is(op, 'hola');
});

test('should test backoff sucess: REST', async (t) => {
  const op = await backoff.backOff(okRest);

  t.is(op.status, 200);
});

test('should test backoff error', async (t) => {
  const backoffConf: backoff.IBackoffConfig = {
    tryUntil: '1sec'
  };

  await t.throwsAsync(() => backoff.backOff(error, backoffConf));
  t.true(consoleDebug.calledWith('queuing retry'));
});

test('should test backoff error: REST', async (t) => {
  const backoffConf: backoff.IBackoffConfig = {
    tryUntil: '1sec'
  };

  await t.throwsAsync(() => backoff.backOff(errorRest, backoffConf));
  t.true(consoleDebug.calledWith('queuing retry'));
});


