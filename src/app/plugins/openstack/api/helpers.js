import http from '../../../util/http'
import store from '../../../store'

const authHttp = http.authenticated.openstack

// service is the service name, eg. 'neutron', 'nova', 'glance', 'qbert'
// iface is one of 'public', 'internal', 'admin'
export const getBaseUrl = (service, iface) => {
  const catalog = store.getState().openstack.serviceCatalog.serviceCatalog
  const _service = catalog.find(s => { return s.name === service })
  const _endpoint = _service.endpoints.find(endpoint => { return endpoint.interface === iface })
  return _endpoint.url
}

// baseUrl is the function that returns
export const makeRequest = async (baseUrl, path, method, body) => {
  const fullPath = `${baseUrl}${path}`
  return body ? authHttp[method](fullPath, body) : authHttp[method](fullPath)
}
