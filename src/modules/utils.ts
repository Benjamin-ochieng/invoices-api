export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);



export const trytm = async <T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (throwable) {
    if (throwable instanceof Error) return [null, throwable];

    throw throwable;
  }
};

export async function tryToCatch(fn, ...args) {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err];
  }
}