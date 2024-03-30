declare interface PromiseConstructor {
  withResolvers<T>(): { promise: Promise<T>; resolve: Promise['resolve']; reject: Promise['reject'] };
}
