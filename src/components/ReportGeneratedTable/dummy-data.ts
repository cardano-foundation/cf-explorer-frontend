export function getDummyData() {
  return Array.from(Array(10)).map(() => ({
    column1: `Row 1 Column 1`,
    column2: `Row 1 Column 2`,
    column3: `Row 1 Column 3`,
    column4: `Row 1 Column 4`
  }));
}
