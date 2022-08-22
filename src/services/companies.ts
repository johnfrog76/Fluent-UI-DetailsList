import { iCompanyItem } from "../models/company/company";
import { recordStatusEnum } from "../models/company/company";

export const getCompanies = (num: number) => {
  const companies = ['Contoso', 'ACME', 'AAA Test Co.', 'Green Inc.', 'Dot.com Inc.', 'ZZZ Test'];
  const ceos = ['Bob Smith', 'Tim Smith', 'Zeek Smith', 'Ron Smith', 'Fred Smith', 'Aaron Smith'];
  const salaries = [500000, 1000000, 10000000, 6000000, 3000000, 200000];
  const daysAgo = [10, 100, 600, 800, 1500, 30];
  const status: recordStatusEnum[] = [1, 2, 3, 4, 5, 6];
  const getRandom = () => {
    return Math.floor(Math.random() * companies.length);
  };
  let ret:iCompanyItem[] = [];
  
  for (let i = 0; i < num; i++) {
     ret.push({
       "column1": companies[getRandom()],
       "column2": ceos[getRandom()], 
       "column3": salaries[getRandom()],
       "column4": new Date().getTime() - (1000 * 60 * 60 * 24 * daysAgo[getRandom()]),
       "column5": status[getRandom()],
       "id": `item-${i}`,
       
     })   
  }
  
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ret);
    }, 3000);
  });

  return myPromise;
}