export class Utils {

  public static unique<T>(arr: Array<T>): Array<T> {
    return Array.from(new Set(arr));
  }

  static safeStr(str: any): string {
    return typeof str === 'string' ? str : '';
  }

  public static concatReducer<T>(acc: Array<T>, curr: Array<T>): Array<T> {
    return acc.concat(curr);
  }

  static getFileName(fileUrl: string): string {
    const tokens = fileUrl.split('/');
    return tokens[tokens.length - 1];
  }
}
