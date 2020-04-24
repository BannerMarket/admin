export class Utils {

  public static unique<T>(arr: Array<T>): Array<T> {
    return Array.from(new Set(arr));
  }

  static safeStr(str: any): string {
    return typeof str === 'string' ? str : '';
  }
}
