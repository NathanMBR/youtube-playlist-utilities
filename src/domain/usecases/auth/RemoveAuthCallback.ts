export namespace RemoveAuthCallback {
  export type Response = boolean;
}

export interface RemoveAuthCallback {
  execute(): RemoveAuthCallback.Response;
}
