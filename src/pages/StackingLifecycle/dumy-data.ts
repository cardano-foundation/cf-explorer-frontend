import { SavedReport } from '.';

export const getDumyData = (): SavedReport[] =>
  Array.from(Array(10).keys()).map((_, index) => ({
    timestamp: '10/24/2022 14:09:02',
    entity: `Company [${index}]`,
    status: index % 2,
    downloadUrl: 'https://test/url' + index
  }));

export function useDumyData() {
  const data = getDumyData();
  return {
    totalItems: 64,
    totalPage: 7,
    currentPage: 0,
    data
  };
}
