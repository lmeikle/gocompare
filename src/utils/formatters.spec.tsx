import { formatDate, formatPrice } from './formatters';

describe('formatDate', () => {
  it('returns an empty string for null values', () => {
    // @ts-ignore
    const result = formatDate(null);

    expect(result).toEqual('');
  });

  it('returns an empty string for undefined values', () => {
    const result = formatDate();

    expect(result).toEqual('');
  });

  it('returns an empty string for empty string values', () => {
    const result = formatDate('');

    expect(result).toEqual('');
  });

  it('formats date correctly', () => {
    const result = formatDate('2018-10-23T00:00:00');

    expect(result).toEqual('Tue Oct 23 2018');
  });
});

describe('formatPrice', () => {
  it('returns 0 for null values', () => {
    // @ts-ignore
    const result = formatPrice(null);

    expect(result).toEqual('£0.00');
  });

  it('returns 0 for undefined values', () => {
    const result = formatPrice();

    expect(result).toEqual('£0.00');
  });

  it('returns 0 for empty string values', () => {
    // @ts-ignore
    const result = formatPrice('');

    expect(result).toEqual('£0.00');
  });

  it('formats small values correctly', () => {
    const result = formatPrice(1.1);

    expect(result).toEqual('£1.10');
  });

  it('formats whole values correctly', () => {
    const result = formatPrice(1000);

    expect(result).toEqual('£1,000.00');
  });

  it('formats values with pence correctly', () => {
    const result = formatPrice(1000.5);

    expect(result).toEqual('£1,000.50');
  });

  it('formats negative values correctly', () => {
    const result = formatPrice(-1000.5);

    expect(result).toEqual('-£1,000.50');
  });
});
