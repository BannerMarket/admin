export class Urls {

  public static readonly ROOT = 'http://localhost:3000/api/v1/';

  public static readonly DICTIONARY = 'dictionary/by-language';
  public static readonly TRANSLATION  = 'dictionary/by-key';

  public static readonly CATEGORIES  = 'categories';
  public static readonly CATEGORY = 'categories/category';

  public static readonly BANNER_IMAGES = 'banners/full/images';
  public static readonly BANNER_REMOVE_IMAGES = 'banner/full/images/delete';
  public static readonly BANNERS = 'banners/full';
  public static readonly BANNER = 'banners/full/banner';

  public static readonly PRICE_REQUESTS = 'price-request/requests';

  public static readonly HERO_IMAGES = 'hero-images';
  public static readonly HERO_IMAGES_UPLOAD = 'hero-images/upload';
  public static readonly HERO_IMAGES_DELETE = 'hero-images/delete';

  public static readonly PROMOTED_BANNERS = 'promoted-banners';
  public static readonly LOGIN = 'auth/login';
  public static readonly REGISTER = 'auth/register';
  public static readonly IS_AUTHENTICATED = 'auth/is-authenticated';
}
