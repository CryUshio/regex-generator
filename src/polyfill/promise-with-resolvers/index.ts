Promise.withResolvers ||
  (Promise.withResolvers = function withResolvers<T>() {
    var a;
    var b;
    var c = new this<T>(function (resolve, reject) {
      a = resolve;
      b = reject;
    });

    return { resolve: a, reject: b, promise: c };
  });
