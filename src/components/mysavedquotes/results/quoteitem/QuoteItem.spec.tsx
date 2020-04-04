import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuoteItem from './QuoteItem';
import { formatDate, formatPrice } from '../../../../utils/formatters';

const CAR_QUOTE = {
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
};

const PET_QUOTE = {
  id: 3,
  product: 'pet',
  name: 'Benji',
  features: {
    breed: 'Dog',
    'cover-start-date': '2018-09-01T00:00:00',
  },
};

describe('QuoteItem', () => {
  it('renders correctly for car quotes', () => {
    const { getByText, queryByText } = render(<QuoteItem quote={CAR_QUOTE} selectPolicy={jest.fn()} />);

    expect(getByText(CAR_QUOTE.name)).toBeInTheDocument();

    expect(getByText('Cover Type: ' + CAR_QUOTE.features['cover-type'])).toBeInTheDocument();
    expect(getByText('Claims: ' + CAR_QUOTE.features['claims'])).toBeInTheDocument();
    expect(getByText('Excess: ' + CAR_QUOTE.features['excess'])).toBeInTheDocument();
    expect(getByText('Protected No Claims Bonus: No')).toBeInTheDocument();
    expect(getByText('Additional Drivers: ' + CAR_QUOTE.features['additional-drivers'])).toBeInTheDocument();
    expect(getByText('Cover Start Date: ' + formatDate(CAR_QUOTE.features['cover-start-date']))).toBeInTheDocument();

    expect(getByText('Price: ' + formatPrice(CAR_QUOTE.price))).toBeInTheDocument();

    expect(getByText('Select Policy')).toBeInTheDocument();

    // check pet details do not exist
    expect(queryByText(/Breed:/)).not.toBeInTheDocument();
  });

  it('renders the correctly for pet quotes', () => {
    const { getByText, queryByText } = render(<QuoteItem quote={PET_QUOTE} selectPolicy={jest.fn()} />);

    expect(getByText(PET_QUOTE.name)).toBeInTheDocument();

    expect(getByText('Breed: ' + PET_QUOTE.features['breed'])).toBeInTheDocument();
    expect(getByText('Cover Start Date: ' + formatDate(PET_QUOTE.features['cover-start-date']))).toBeInTheDocument();

    expect(getByText('Price: ?')).toBeInTheDocument();

    expect(getByText('Select Policy')).toBeInTheDocument();

    // check car details do not exist
    expect(queryByText(/Cover Type:/)).not.toBeInTheDocument();
    expect(queryByText(/Claims:/)).not.toBeInTheDocument();
    expect(queryByText(/Excess:/)).not.toBeInTheDocument();
    expect(queryByText(/Protected No Claims:/)).not.toBeInTheDocument();
    expect(queryByText(/Additional Drivers:/)).not.toBeInTheDocument();
  });

  it('clicking the select button calls the selectPolicy prop', () => {
    const selectPolicyMock = jest.fn();
    const { getByText } = render(<QuoteItem quote={CAR_QUOTE} selectPolicy={selectPolicyMock} />);

    fireEvent.click(getByText('Select Policy'));

    expect(selectPolicyMock).toHaveBeenCalledWith(CAR_QUOTE.id);
  });
});
