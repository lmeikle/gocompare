import React from 'react';
import styled from 'styled-components';
import { formatDate, formatPrice } from '../../../../utils/formatters';
import { ProductType } from '../Results';

const LIGHT_GREY = '#f4f4f4';
const GREEN = '#2fa38d';

/**
 * This is the breakpoint at which the item starts to look squashed, to switch it to a vertical layout
 */
const VERTICAL_LAYOUT_BREAKPOINT = `(max-width: 600px)`;

const QuoteItemContainer = styled.div`
  width: 100%;
  max-width: 60em;
  margin-bottom: 1em;
  cursor: default;
  position: relative;

  @media only screen and ${VERTICAL_LAYOUT_BREAKPOINT} {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    margin-bottom: 2.5em;
  }
`;

const Header = styled.div`
  display: inline-block;
  height: 1.5em;
  line-height: 1.5em;
  min-width: 8em;
  max-width: 80%;
  border: 0.125em solid ${GREEN};
  border-bottom: none;
  background: ${LIGHT_GREY};
  padding: 0.2em 0.3em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;

  @media only screen and ${VERTICAL_LAYOUT_BREAKPOINT} {
    position: absolute;
    top: -0.5em;
    left: 0;
    right: 0;
    width: 16em;
    margin: auto;
    border: 0.125em solid ${GREEN};
    text-align: center;
  }
`;

const Body = styled.div`
  display: flex;
  border: 0.125em solid ${GREEN};
  background: ${LIGHT_GREY};
  width: 100%;

  @media only screen and ${VERTICAL_LAYOUT_BREAKPOINT} {
    flex-direction: column;
    margin-top: 0.6em;
    padding-top: 0.6em;
  }
`;

const BodyColumn = styled.div<{ align?: string; padding?: string; flexBasis?: string; textAlign?: string }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ flexBasis }) => flexBasis || 'inherit'};
  align-items: ${({ align }) => align || 'center'};
  padding: ${({ padding }) => padding || 0};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  justify-content: center;
  flex-grow: 1;
  margin: 0.6em 0;
  position: relative;
  line-height: 1.5em;

  &:not(:last-child) {
    border-right: 0.125em solid ${GREEN};
  }

  @media only screen and ${VERTICAL_LAYOUT_BREAKPOINT} {
    margin: 0 0.6em;
    padding: 0.6em 0;
    flex-basis: inherit;

    &:not(:last-child) {
      border-right: none;
    }

    &:first-child {
      border-right: none;
      border-bottom: 0.125em solid ${GREEN};
    }
  }
`;

const SelectButton = styled.button`
  background-color: ${GREEN};
  font-weight: bold;
  font-size: 1em;
  color: #ffffff;
  height: 2.5em;
  padding: 0.3em 0.6em;
  border-radius: 1.7em;
  cursor: pointer;
  border: none;
  outline: 0;

  &:hover {
    background-color: #083025;
  }

  @media only screen and ${VERTICAL_LAYOUT_BREAKPOINT} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 10em;
    margin: auto;
  }
`;

const Details = ({ quote }: { quote: Quote }) => {
  let details;

  if (quote.product === ProductType.Car) {
    const features = quote.features as CarFeatures;
    details = (
      <>
        <div>Cover Type: {features['cover-type']}</div>
        <div>Claims: {features['claims']}</div>
        <div>Excess: {features['excess']}</div>
        <div>Protected No Claims Bonus: {features['protected-ncb'] ? 'Yes' : 'No'}</div>
        <div>Additional Drivers: {features['additional-drivers']}</div>
        <div>Cover Start Date: {formatDate(features['cover-start-date'])}</div>
      </>
    );
  }

  if (quote.product === ProductType.Pet) {
    const features = quote.features as PetFeatures;
    details = (
      <>
        <div>Breed: {features['breed']}</div>
        <div>Cover Start Date: {formatDate(features['cover-start-date'])}</div>
      </>
    );
  }

  return (
    <BodyColumn align={'flex-start'} padding={'0 0 0 0.6em'} flexBasis={'50%'}>
      {details}
    </BodyColumn>
  );
};

const Price = ({ quote }: { quote: Quote }) => {
  return (
    <BodyColumn flexBasis={'25%'} textAlign={'center'}>
      Price: {quote.price ? formatPrice(quote.price) : '?'}
    </BodyColumn>
  );
};

const Select = ({ quote, selectPolicy }: { quote: Quote; selectPolicy: (id: number) => void }) => {
  return (
    <BodyColumn flexBasis={'25%'}>
      <SelectButton onClick={() => selectPolicy(quote.id)}>Select Policy</SelectButton>
    </BodyColumn>
  );
};

interface Props {
  quote: Quote;
  selectPolicy: (id: number) => void;
}

const QuoteItem = ({ quote, selectPolicy }: Props) => {
  return (
    <QuoteItemContainer>
      <Header title={quote.name}>{quote.name}</Header>
      <Body>
        <Details quote={quote} />
        <Price quote={quote} />
        <Select quote={quote} selectPolicy={selectPolicy} />
      </Body>
    </QuoteItemContainer>
  );
};

export default QuoteItem;
