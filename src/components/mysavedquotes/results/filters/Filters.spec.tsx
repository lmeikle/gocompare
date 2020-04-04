import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filters from './Filters';

const QUOTES: any = [
  {
    product: 'car',
    name: 'carB',
    price: 1000,
  },
  {
    product: 'car',
    name: 'carC',
    price: 500,
  },
  {
    product: 'pet',
    name: 'petB',
  },
  {
    product: 'pet',
    name: 'petA',
  },
  {
    product: 'car',
    name: 'carA',
    price: 600,
  },
];

describe('Filters', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Filters quotes={QUOTES} updateQuotes={jest.fn()} />);

    expect(getByText('Sort By:')).toBeInTheDocument();
    expect(getByText('Price - Low to High')).toBeInTheDocument();
    expect(getByText('Product Types:')).toBeInTheDocument();
    expect(getByText('car')).toBeInTheDocument();
    expect(getByText('pet')).toBeInTheDocument();
  });

  it('sorts by price ascending when initialized', () => {
    const updateQuotesMock = jest.fn();

    render(<Filters quotes={QUOTES} updateQuotes={updateQuotesMock} />);

    expect(updateQuotesMock).toHaveBeenCalledWith([
      {
        product: 'car',
        name: 'carC',
        price: 500,
      },
      {
        product: 'car',
        name: 'carA',
        price: 600,
      },
      {
        product: 'car',
        name: 'carB',
        price: 1000,
      },
      {
        product: 'pet',
        name: 'petB',
      },
      {
        product: 'pet',
        name: 'petA',
      },
    ]);
  });

  it('sorts by price descending correctly', () => {
    const updateQuotesMock = jest.fn();

    const { container } = render(<Filters quotes={QUOTES} updateQuotes={updateQuotesMock} />);

    const sortByDropDownEl = container.querySelector('.sort-by-drop-down__input input')!;
    fireEvent.change(sortByDropDownEl, { target: { value: 'Price - High to Low' } });
    fireEvent.keyDown(sortByDropDownEl, {
      key: 'Enter',
      code: 13,
    });

    expect(updateQuotesMock).toHaveBeenCalledWith([
      {
        product: 'car',
        name: 'carB',
        price: 1000,
      },
      {
        product: 'car',
        name: 'carA',
        price: 600,
      },
      {
        product: 'car',
        name: 'carC',
        price: 500,
      },
      {
        product: 'pet',
        name: 'petB',
      },
      {
        product: 'pet',
        name: 'petA',
      },
    ]);
  });

  it('sorts by name correctly', () => {
    const updateQuotesMock = jest.fn();

    const { container } = render(<Filters quotes={QUOTES} updateQuotes={updateQuotesMock} />);

    const sortByDropDownEl = container.querySelector('.sort-by-drop-down__input input')!;
    fireEvent.change(sortByDropDownEl, { target: { value: 'Name' } });
    fireEvent.keyDown(sortByDropDownEl, {
      key: 'Enter',
      code: 13,
    });

    expect(updateQuotesMock).toHaveBeenCalledWith([
      {
        product: 'car',
        name: 'carA',
        price: 600,
      },
      {
        product: 'car',
        name: 'carB',
        price: 1000,
      },
      {
        product: 'car',
        name: 'carC',
        price: 500,
      },
      {
        product: 'pet',
        name: 'petA',
      },
      {
        product: 'pet',
        name: 'petB',
      },
    ]);
  });

  it('filters by product type correctly', () => {
    const updateQuotesMock = jest.fn();

    const { container } = render(<Filters quotes={QUOTES} updateQuotes={updateQuotesMock} />);

    const sortByDropDownEl = container.querySelector('.product-types-drop-down__input input')!;
    fireEvent.keyDown(sortByDropDownEl, {
      key: 'Delete',
      code: 46,
    });

    expect(updateQuotesMock).toHaveBeenCalledWith([
      {
        product: 'car',
        name: 'carC',
        price: 500,
      },
      {
        product: 'car',
        name: 'carA',
        price: 600,
      },
      {
        product: 'car',
        name: 'carB',
        price: 1000,
      },
    ]);

    fireEvent.keyDown(sortByDropDownEl, {
      key: 'Delete',
      code: 46,
    });

    expect(updateQuotesMock).toHaveBeenCalledWith([]);
  });
});
