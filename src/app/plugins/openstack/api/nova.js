import { getBaseUrl, makeRequest } from './helpers'

const baseUrl = () => {
  const url = getBaseUrl('nova', 'internal')
  let parts = url.split('/')
  parts.pop()
  return parts.join('/')
}

export const createFlavor = (flavor, tenantId) => {
  const body = {
    flavor: {
      name: flavor.name,
      ram: 1024,
      vcpus: 2,
      disk: 10,
    }
  }
  return makeRequest(baseUrl(), `/${tenantId}/flavors`, 'post', body).then(json => json.flavor.id)
}

export const deleteFlavor = (flavorId, tenantId) => makeRequest(baseUrl(), `/${tenantId}/flavors/${flavorId}`, 'delete')

export const getFlavors = (tenantId) => makeRequest(baseUrl(), `/${tenantId}/flavors/detail`, 'get').then(x => x.flavors)
