import getUV from '../src/lib/info/getUV';

describe('getUV', () => {
  test('match uuid', () => {
    const uv = getUV();
    expect(uv).toMatch(/\w{8}(-\w{4}){3}-\w{12}/);
  });
});
