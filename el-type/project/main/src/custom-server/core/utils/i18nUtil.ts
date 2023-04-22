import { I18n } from 'i18n';
import path from 'path';

export const i18n = new I18n({
  defaultLocale: 'pt-br',
  locales: ['pt-br', 'en'],
  directory: path.resolve(__dirname, 'locales'),
});

export const translate = i18n.__;

export async function setLocale(locale = 'pt-br') {
  await i18n.setLocale(locale);
}
