import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockAxios from 'jest-mock-axios';
import MySavedQuotes from './MySavedQuotes';

const QUOTES_RESPONSE = {
  quotes: [
    {
      id: 0,
      product: 'car',
      name: 'BMW 330ci Sport Coupe 2979cc',
      price: 41033,
      features: {
        'cover-type': 'Comprehensive',
        claims: 'No previous claims',
        excess: 0,
        'protected-ncb': false,
        'additional-drivers': 'No additional drivers',
        'cover-start-date': '2018-10-23T00:00:00',
      },
    },
    {
      id: 1,
      product: 'pet',
      name: 'Benji',
      features: {
        breed: 'Dog',
        'cover-start-date': '2018-09-01T00:00:00',
      },
    },
  ],
};

describe('MySavedQuotes', () => {
  afterEach(async () => {
    mockAxios.reset();
  });

  it('requests quotes and displays them', async () => {
    const { getByText, getByTestId } = render(<MySavedQuotes />);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    act(() => {
      mockAxios.mockResponse({
        data: QUOTES_RESPONSE,
      });
    });

    expect(getByText(QUOTES_RESPONSE.quotes[0].name)).toBeInTheDocument();
    expect(getByText(QUOTES_RESPONSE.quotes[1].name)).toBeInTheDocument();
  });

  it('handles and displays any errors', () => {
    const { getByText, getByTestId } = render(<MySavedQuotes />);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    act(() => {
      mockAxios.mockError('something went wrong');
    });

    expect(getByText('something went wrong')).toBeInTheDocument();
  });
});
