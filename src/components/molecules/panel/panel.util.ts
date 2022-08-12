import { recordStatusEnum } from '../../../models/company/company';

// export const statusItems = [
//   {key: 1, text: recordStatusEnum[1]},
//   {key: 2, text: recordStatusEnum[2]},
//   {key: 3, text: recordStatusEnum[3]},
//   {key: 4, text: recordStatusEnum[4]},
//   {key: 5, text: recordStatusEnum[5]},
//   {key: 6, text: recordStatusEnum[6]}
// ];

export const statusItems = Object.keys(recordStatusEnum).filter(k => !isNaN(Number(k))).map(item => {
  return {key: Number(item), text: recordStatusEnum[Number(item)]}
})


export const formatEarningsField = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
};

export const formatDateField = (value: number) => {
  const d = new Date(value).toDateString();
  return d;
};