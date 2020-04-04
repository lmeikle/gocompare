import React, { useState } from 'react';
import QuoteItem from './quoteitem/QuoteItem';
import LoadingSpinner from '../../loading/LoadingSpinner';
import styled from 'styled-components';
import Filters from './filters/Filters';

export enum ProductType {
  Car = 'car',
  Pet = 'pet',
}

const Title = styled.div`
  width: 100%;
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1.2em;
  text-align: center;
`;

interface Props {
  quotes?: Quote[];
  error?: string;
}

const Results = ({ quotes, error }: Props) => {
  const [sortedAndFilteredQuotes, updateSortedAndFilteredQuotes] = useState<Quote[]>([]);

  if (error) {
    return <>{error}</>;
  }

  if (quotes) {
    return (
      <>
        <Filters quotes={quotes} updateQuotes={updateSortedAndFilteredQuotes} />
        <Title data-testid={'quotes-results-title'}>
          {sortedAndFilteredQuotes.length > 0 ? `Showing ${sortedAndFilteredQuotes.length} Quotes` : `No quotes found`}
        </Title>
        {sortedAndFilteredQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            quote={quote}
            selectPolicy={(id: number) => {
              alert('You selected Policy id: ' + id);
            }}
          />
        ))}
      </>
    );
  }

  return <LoadingSpinner />;
};

export default Results;
