export interface IBackoffConfig {
  runAt?: number;           // action timestamp 
  tryUntil?: BackoffTime;   // time when action will be stop
  delay?: number;           // delay between attemps receiving
}

export type BackoffTime =
  | '100ms'
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
  '100ms': 1000,
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
  config.tryUntil = config.tryUntil || '1min';
  config.delay = config.delay || 100;
  config.runAt = config.runAt || Date.now();

  const maxTime = config.runAt + backoffIntervals[config.tryUntil];

  try {
    const run = await f();

    if (
      run
      && run.status >= 500
    ) {
      throw new Error(
        `${new Date().toISOString()} Error: status ${run.status} querying`
      );
    }

    return run;
  } catch (error) {
    if (Date.now() < maxTime) {
      return new Promise((resolve) => {
        console.debug('queuing retry');
        setTimeout(async () => {
          console.debug(`Retry ${new Date().toISOString()}: ${error.message}`);
          config.delay = config.delay * 2;

          resolve(backOff(f, config));
        }, config.delay);

      });
    } else {
      throw error;
    }
  }
};

export default backOff;