const { I18n } = require('i18n')
const path = require('path')

const i18n = new I18n({
  defaultLocale: 'pt-br',
  locales: ['pt-br', 'en-us'],
  directory: path.join(__dirname, 'locales'),
})

async function setLocale(locale = 'pt-br') {
  i18n.setLocale(locale.toLowerCase())
}

const translate = i18n.__

module.exports = {
  i18n,
  setLocale,
  translate,
}
