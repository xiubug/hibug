import { init, config } from './init';

describe('Hibug.init', () => {
  test('has $HibugAuth and $HibugConfig', () => {
    init();
    const $auth = window.$HibugAuth;
    const $config = window.$HibugConfig;
    expect($auth).toBe(true);
    expect($config).toMatchObject(config);
  });
});
