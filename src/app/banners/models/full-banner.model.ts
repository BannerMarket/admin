export interface FullBanner {
  lat: number | string;
  lng: number | string;
  directionsGe: string;
  directionsEn: string;
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

export const EmptyBanner: FullBanner = {
  lat: '',
  lng: '',
  directionsGe: '',
  directionsEn: '',
  categories: [],
  titleGe: '',
  titleEn: '',
  shortDescriptionGe: '',
  shortDescriptionEn: '',
  fullDescriptionGe: '',
  fullDescriptionEn: '',
  images: []
};
