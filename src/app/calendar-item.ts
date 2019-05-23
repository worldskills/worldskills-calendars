import { I18nString } from './i18n-string';
import { Country } from './country';

export class CalendarItem {
  id: number;
  name: I18nString;
  country?: Country;
  location: I18nString;
  description: I18nString;
}
