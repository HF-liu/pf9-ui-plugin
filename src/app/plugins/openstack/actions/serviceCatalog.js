import {
  getServiceCatalog,
} from '../api/keystone'

export const SET_SERVICE_CATALOG = 'SET_SERVICE_CATALOG'

export const setServiceCatalog = catalog => ({ type: SET_SERVICE_CATALOG, payload: catalog })

export const fetchServiceCatalog = () => async dispatch => {
  const catalog = await getServiceCatalog()
  console.log(catalog)
  dispatch(setServiceCatalog(catalog))
}
