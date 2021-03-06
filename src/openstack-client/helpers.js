import config from '../../config'
import OpenstackClient from './OpenstackClient'

export const keystoneEndpoint = `${config.host}/keystone`
export const makeClient = () => new OpenstackClient({ keystoneEndpoint })

export const getUserPass = () => {
  const { username, password } = config.simulator
  if (!username || !password) {
    throw new Error('username and/or password not specified in config.js')
  }
  return { username, password }
}

export const makeUnscopedClient = async () => {
  const { username, password } = getUserPass()
  const client = makeClient()
  await client.keystone.authenticate(username, password)
  return client
}

export const makeScopedClient = async () => {
  const client = await makeUnscopedClient()
  const projects = await client.keystone.getProjects()
  await client.keystone.changeProjectScope(projects[0].id)
  return client
}

export const makeRegionedClient = async () => {
  const client = await makeScopedClient()
  const regions = await client.keystone.getRegions()
  client.setActiveRegion(regions[0].id)
  await client.keystone.getServicesForActiveRegion()
  return client
}

export const waitUntil = async ({ condition, delay, maxRetries }) =>
  new Promise(async (resolve, reject) => {
    let done = await condition()
    let retry = 0
    while (!done && retry++ < maxRetries) {
      await sleep(delay)
      done = await condition()
    }
    done ? resolve() : reject(new Error('Task not done within time.'))
  })

export const sleep = (delay) =>
  new Promise(resolve => setTimeout(resolve, delay))
