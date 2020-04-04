import React from 'react';
import { render } from '@testing-library/react';
import Results from './Results';

const QUOTES = [
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
];

describe('Results', () => {
  it('renders the loading spinner when no quotes and no error', () => {
    const { getByTestId, queryByText } = render(<Results />);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    expect(queryByText('No quotes found')).not.toBeInTheDocument();
  });

  it('renders the error if provided', () => {
    const { getByText, queryByTestId, queryByText } = render(<Results error={'foo'} />);

    expect(getByText('foo')).toBeInTheDocument();

    expect(queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(queryByText('No quotes found')).not.toBeInTheDocument();
  });

  it('renders a message when no results are found', () => {
    const { getByText, queryByTestId } = render(<Results quotes={[]} />);

    expect(getByText('No quotes found')).toBeInTheDocument();

    expect(queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('renders the list of quotes', () => {
    const { getByText, queryByText, queryByTestId } = render(<Results quotes={QUOTES} />);

    expect(getByText('Showing 2 Quotes')).toBeInTheDocument();
    expect(getByText(QUOTES[0].name)).toBeInTheDocument();
    expect(getByText(QUOTES[1].name)).toBeInTheDocument();

    expect(queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(queryByText('No quotes found')).not.toBeInTheDocument();
  });
});
