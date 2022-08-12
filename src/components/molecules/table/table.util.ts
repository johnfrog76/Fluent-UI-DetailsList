
export const copyAndSort = (items: any[], columnKey: string, isSortedDescending: boolean) => {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) => {
      let tempA = a[key];
      let tempB = b[key];

      if (isNaN(tempA)) {
        tempA = tempA.toLowerCase();
        tempB = tempB.toLowerCase();
      }
      return (isSortedDescending ? tempA < tempB : tempA > tempB) ? 1 : -1
    }
    );
};