export namespace SetAuthCallback {
  export type Response = boolean;
}

export interface SetAuthCallback {
  execute(): SetAuthCallback.Response;
}
