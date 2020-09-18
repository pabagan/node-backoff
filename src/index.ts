export interface IBackoffConfig {
  runAt?: number;
  tryUntil?: BackoffTime;
  delay?: number;
}

export type BackoffTime =
  | '1sec'
  | '5sec'
  | '10sec'
  | '1min'
  | '5min'
  | '10min'
  | '15min'
  | '30min'
  | '1h'
  | '24h';

export const backoffIntervals = {
  '1sec': 1000,
  '5sec': 1000 * 5,
  '10sec': 1000 * 10,
  '1min': 1000 * 60,
  '5min': 1000 * 60 * 5,
  '10min': 1000 * 60 * 10,
  '15min': 1000 * 60 * 15,
  '30min': 1000 * 60 * 30,
  '1h': 1000 * 60 * 60,
  '24h': 1000 * 60 * 60 * 24,
};

/**
 * Exponential backoff
 * 
 * @param f 
 * @param config 
 */
export const backOff = async (
  f: Function,
  config: IBackoffConfig = {},
) => {
  config.tryUntil = config.tryUntil || '5sec';
  config.delay = config.delay || 100;
  config.runAt = config.runAt || Date.now();

  const backOffMaxTime = (
    config.runAt + backoffIntervals[config.tryUntil]
  );

  try {
    return f();
  } catch (error) {
    if (Date.now() < backOffMaxTime) {
      setTimeout(() => {
        console.debug(`Error ${error.message} on execution ${f.name}. Retrying at ${new Date().toISOString()}.`)
        config.delay = config.delay * 2;

        return backOff(f, config);
      }, config.delay);
    } else {
      throw error;
    }
  }
};


// (async () => {
//   function hola() {
//     return 'hola';
//   }

//   function randomError(message) {
//     if (Date.now() % 2 === 0) {
//       throw new Error(`Error ${message}`);
//     }

//     return `OK: ${message}`;
//   }

//   console.time('op');
//   const op = await backOff(() => randomError(100));
//   console.log(op);
//   console.timeEnd('op');

//   console.time('op2');
//   const op1 = hola();
//   console.log(op1);
//   console.timeEnd('op2');

// })();
export default backOff;