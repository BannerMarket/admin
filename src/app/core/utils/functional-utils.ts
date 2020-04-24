export class FunctionalUtils {

  public static any(...fns) {
    return (...args) => {
      return fns.some(fn => !!fn(...args));
    };
  }

}
