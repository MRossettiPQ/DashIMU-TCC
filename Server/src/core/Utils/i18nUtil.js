const { I18n } = require('i18n')
const path = require('path')

const i18n = new I18n({
  locales: ['pt-br', 'en-us'],
  directory: path.join(__dirname, 'locales'),
})

async function setLocale(locale) {
  i18n.setLocale(locale)
}

module.exports = {
  i18n,
  setLocale,
}
