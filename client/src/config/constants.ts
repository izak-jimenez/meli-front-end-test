export const baseUrl = 'http://localhost:3001/api'
export const itemsApiEndpoint = '/items?q={query}'
export const itemDetailsEndpoint = '/items/{id}'

export const routePaths = {
  home: '/',
  items: '/items',
  itemDetails: '/items/:id',
}

export const itemConditionLabels = {
  new: {
    i18n: {
      es: 'Nuevo',
      en: 'New'
    }
  },
  used: {
    i18n: {
      es: 'Usado',
      en: 'Used'
    }
  }
}