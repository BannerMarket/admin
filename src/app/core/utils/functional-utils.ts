export class FunctionalUtils {

  public static any(...fns) {
    return (...args) => {
      return fns.some(fn => !!fn(...args));
    };
  }

  public static flatten<T>(acc: Array<T>, curr: Array<T>): Array<T> {
    return acc.concat(curr);
  }

}
