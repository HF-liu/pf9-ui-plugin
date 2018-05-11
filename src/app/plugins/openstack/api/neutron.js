import { getBaseUrl, makeRequest } from './helpers'

const baseUrl = () => {
  const url = getBaseUrl('neutron', 'internal')
  return `${url}/v2.0`
}

export const createNetwork = (network) => {
  const body = {
    network: {
      name: network.name,
    }
  }
  return makeRequest(baseUrl(), '/networks', 'post', body).then(json => json.network.id)
}

export const deleteNetwork = (networkId) => makeRequest(baseUrl(), `/networks/${networkId}`, 'delete')

export const getNetworks = () => makeRequest(baseUrl(), '/networks', 'get').then(x => x.networks)
