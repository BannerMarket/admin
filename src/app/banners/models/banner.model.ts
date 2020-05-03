export interface Banner {
  lat: number | string;
  lng: number | string;
  categories: Array<string>;
  titleGe: string;
  titleEn: string;
  shortDescriptionGe: string;
  shortDescriptionEn: string;
  fullDescriptionGe: string;
  fullDescriptionEn: string;
  images: Array<string>;
  _id?: string;
}

export const EmptyBanner: Banner = {
  lat: '',
  lng: '',
  categories: [],
  titleGe: '',
  titleEn: '',
  shortDescriptionGe: '',
  shortDescriptionEn: '',
  fullDescriptionGe: '',
  fullDescriptionEn: '',
  images: []
};
