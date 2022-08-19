import { recordStatusEnum } from '../../../models/company/company';

export const statusItems = Object.keys(recordStatusEnum).filter(k => !isNaN(Number(k))).map(item => {
  return {key: Number(item), text: recordStatusEnum[Number(item)]}
});

export const formatEarningsField = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
};

export const currencyStringToNumber = (currency: string) => {
  return Number(currency.replace(/[^0-9\.-]+/g,""));
}

export const formatDateField = (value: number) => {
  const d = new Date(value).toDateString();
  return d;
};