import {
  SET_SERVICE_CATALOG
} from '../actions/serviceCatalog'

const initialState = {
  serviceCatalogLoaded: false,
  serviceCatalog: [],
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action // eslint-disable-line no-unused-vars

  switch (type) {
    case SET_SERVICE_CATALOG:
      return {
        ...state,
        serviceCatalog: payload,
        serviceCatalogLoaded: true,
      }

    default:
      return state
  }
}

export default reducer
