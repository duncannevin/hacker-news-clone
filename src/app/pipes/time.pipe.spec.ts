import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(1561820407).includes('ago')).toBe(true);
  });
});
