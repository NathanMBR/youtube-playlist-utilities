export type DataPagination<T> = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  items: Array<T>;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
