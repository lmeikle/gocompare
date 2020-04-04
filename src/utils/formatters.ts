const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

export const formatDate = (date?: string) => {
  if (!date) {
    return '';
  }

  return new Date(date).toDateString();
};

export const formatPrice = (price?: number) => {
  if (!price) {
    price = 0;
  }

  return formatter.format(price);
};
