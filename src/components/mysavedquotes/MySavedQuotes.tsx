import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import Results from './results/Results';

const MySavedQuotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
`;

const MySavedQuotes = () => {
  const [quotes, updateQuotes] = useState<Quote[]>();
  const [error, updateError] = useState();

  useEffect(() => {
    axios
      .get('https://gc-frontendchallenge-2019.azurewebsites.net/api/EasyMode')
      .then(function (response: AxiosResponse<QuotesJson>) {
        const { data } = response;
        updateQuotes(data.quotes);
        updateError(undefined);
      })
      .catch(function (error) {
        updateQuotes([]);
        updateError(error);
      });
  }, []);

  return (
    <MySavedQuotesContainer>
      <h1>My Saved Quotes</h1>
      <Results quotes={quotes} error={error} />
    </MySavedQuotesContainer>
  );
};

export default MySavedQuotes;
