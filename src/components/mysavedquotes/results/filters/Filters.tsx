import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2em;

  &:not(:last-child) {
    margin-right: 1.2em;
  }
`;

const SORT_OPTIONS = [
  {
    label: 'Price - Low to High',
    value: 'PriceAsc',
  },
  {
    label: 'Price - High to Low',
    value: 'PriceDesc',
  },
  {
    label: 'Name',
    value: 'Name',
  },
];

const filterByPrice = (filteredQuotes: Quote[], asc: boolean = true) => {
  const quotesWithPrices = filteredQuotes.filter((quote) => quote.price !== undefined);
  const quotesWithoutPrices = filteredQuotes.filter((quote) => quote.price === undefined);

  let sortedQuotes = quotesWithPrices.sort((a, b) => {
    if (a.price && b.price) {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      }
    }

    return 0;
  });

  if (!asc) {
    sortedQuotes = sortedQuotes.reverse();
  }

  return [...sortedQuotes, ...quotesWithoutPrices];
};

interface Props {
  quotes: Quote[];
  updateQuotes: React.Dispatch<SetStateAction<Quote[]>>;
}

const Filters = ({ quotes, updateQuotes }: Props) => {
  const [sortBy, updateSortBy] = useState(SORT_OPTIONS[0]);
  const [availableProductTypes, updateAvailableProductTypes] = useState<{ label: string; value: string }[]>([]);
  const [productTypes, updateProductTypes] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const products = quotes ? quotes.map((type) => type.product) : [];
    const uniqueProducts = Array.from(new Set(products));

    const availProdTypes = uniqueProducts.map((prod) => {
      return {
        label: prod,
        value: prod,
      };
    });

    updateAvailableProductTypes(availProdTypes);
    updateProductTypes(availProdTypes);
  }, [quotes]);

  useEffect(() => {
    // filter by product types
    const types = productTypes ? productTypes.map((type) => type.value) : [];
    const filteredQuotes = quotes.filter((quote) => types.includes(quote.product));

    // now sort
    let sortedQuotes;
    switch (sortBy.value) {
      case 'Name': {
        sortedQuotes = filteredQuotes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      case 'PriceAsc': {
        sortedQuotes = filterByPrice(filteredQuotes);
        break;
      }
      case 'PriceDesc': {
        sortedQuotes = filterByPrice(filteredQuotes, false);
        break;
      }
      default: {
        sortedQuotes = filteredQuotes;
        break;
      }
    }

    updateQuotes(sortedQuotes);
  }, [updateQuotes, quotes, sortBy, productTypes]);

  return (
    <FiltersContainer>
      <SortContainer>
        <div>Sort By:</div>
        <Select
          value={sortBy}
          classNamePrefix={'sort-by-drop-down'}
          onChange={(val) => {
            if (val) {
              updateSortBy(val as any);
            }
          }}
          options={SORT_OPTIONS}
          name={'sort-by-drop-down'}
          styles={{
            container: () => {
              return {
                width: '12em',
                marginLeft: '0.3em',
              };
            },
          }}
          aria-label={`sort by drop down`}
          menuPortalTarget={document.body}
        />
      </SortContainer>
      <SortContainer>
        <div>Product Types:</div>
        <Select
          value={productTypes}
          classNamePrefix={'product-types-drop-down'}
          onChange={(val) => {
            updateProductTypes(val as any);
          }}
          options={availableProductTypes}
          name={'product-types-drop-down'}
          isMulti={true}
          styles={{
            container: () => {
              return {
                width: '15em',
                marginLeft: '0.3em',
              };
            },
          }}
          aria-label={`product types drop down`}
          menuPortalTarget={document.body}
        />
      </SortContainer>
    </FiltersContainer>
  );
};

export default Filters;
