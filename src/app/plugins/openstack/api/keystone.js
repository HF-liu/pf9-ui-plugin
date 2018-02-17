import {
  authOpenstackHttp,
  bareJson,
  makeApi,
  memoize,
} from '../util'

const bareHttp = makeApi(bareJson, '/keystone/v3')
const v3 = makeApi(authOpenstackHttp, '/keystone/v3') // baseUrl
const admin = makeApi(authOpenstackHttp, '/keystone_admin/v2.0') // adminUrl

const constructUrlQuery = (...parts) => parts.join('&')
const constructTokenBody = method => (tenantId, unscopedToken) => ({
  auth: {
    identity: {
      methods: [method],
      [method]: { id: unscopedToken },
    },
    scope: { project: { id: tenantId } }
  }
})

let endpointsPromise

export const getUsers = () => v3.getReq('/users')
export const getUser = userId => v3.getReq(`/users/${userId}`)
export const getTenants = () => admin.getReq('/PF9-KSADM/all_tenants_all_users')
export const getScopedProjects = () => v3.getReq('/auth/projects')

export function createTenant (project) {
  const body = {
    project: {
      enabled: project.enabled,
      name: project.name,
      description: project.description,
      domain_id: 'default',
      is_domain: false
    }
  }
  return v3.postReq('/projects', body)
}

export function updateTenant (project) {
  const body = {
    project: {
      enabled: project.enabled,
      name: project.name,
      description: project.description,
      domain_id: 'default',
      is_domain: false
    }
  }
  return v3.patchReq(`/projects/${project.id}`, body)
}

export const deleteTenant = (id) => v3.deleteReq(`/projects/${id}`)
export const getRoles = (success, error) => v3.getReq('/roles')
export const getUsersFor = tenantId => admin.getReq(`/tenants/${tenantId}/users`)
export const removeUser = (userId) => v3.deleteReq(`/users/${userId}`)

export function getUserRoles (tenantId, userId) {
  const url = constructUrlQuery(
    `/role_assignments?user.id=${userId}`,
    `scope.project.id=${tenantId}`,
    `effective&include_names`
  )
  return v3.getReq(url)
}

export function addUser (user) {
  const body = {
    user: {
      name: user.name,
      email: user.name,
      password: user.password,
      default_project_id: user.tenantId
    }
  }
  body.user.displayname = user.displayName || null
  return v3.postReq('/users', body)
}

export function updateUser (user) {
  const body = {
    user: {
      name: user.name,
      email: user.name
    }
  }
  body.user.displayname = user.displayname ? user.displayname : null
  if (user.password) {
    body.user.password = user.password
  }
  return v3.patchReq(`/users/${user.id}`, body)
}

export function addUserRole (tenantId, userId, roleId) {
  const url = `/projects/${tenantId}/users/${userId}/roles/${roleId}`
  return v3.putReq(url)
}

export function removeUserRole (tenantId, userId, roleId) {
  const url = `/projects/${tenantId}/users/${userId}/roles/${roleId}`
  return v3.deleteReq(url)
}

export function updateGlanceEndpoint (endpointId, endpointUrl) {
  const body = {
    endpoint: { url: `http://${endpointUrl}:9292` }
  }
  return v3.patchReq(`/endpoints/${endpointId}`, body)
}

export function addGlanceEndpoint (regionId, endpointUrl, serviceId) {
  const body = {
    endpoint: {
      'interface': 'public',
      region_id: regionId,
      service_id: serviceId,
      url: `http://${endpointUrl}:9292`
    }
  }
  return v3.postReq('/endpoints', body)
}

export const deleteGlanceEndpoint = endpointId => v3.deleteReq(`/endpoints/${endpointId}`)

export const getGroups = () => v3.getReq('/groups')
export const createGroup = group => v3.post('/groups', { group })
export const updateGroup = (group, groupId) => v3.patchReq(`/groups/${groupId}`, { group })

export const getGroupRoles = (tenantId, groupId) => v3.getReq(`/projects/${tenantId}/groups/${groupId}/roles`)

export const addGroupRole = (tenantId, groupId, roleId) =>
  v3.putReq(`/projects/${tenantId}/groups/${groupId}/roles/${roleId}`)

export const removeGroupRole = (tenantId, groupId, roleId) =>
  v3.deleteReq(`/projects/${tenantId}/groups/${groupId}/roles/${roleId}`)

export const deleteGroup = groupId => v3.deleteReq(`/groups/${groupId}`)

export function getUnscopedToken (username, password) {
  const body = {
    auth: {
      identity: {
        methods: ['password'],
        password: {
          user: {
            name: username,
            domain: { id: 'default' },
            password: password
          }
        }
      }
    }
  }
  return bareHttp.postReq('/auth/tokens?nocatalog', body)
}

export const getUnscopedTokenSso = () => v3.getReq('/OS-FEDERATION/identity_providers/IDP1/protocols/saml2/auth')

export function getScopedToken (tenantId, unscopedToken) {
  const body = constructTokenBody('token')(tenantId, unscopedToken)
  return bareHttp.postReq('/auth/tokens?nocatalog', body)
}

export function getScopedTokenWithCatalog (tenantId, unscopedToken) {
  const body = constructTokenBody('token')(tenantId, unscopedToken)
  return bareHttp.postReq('/auth/tokens', body)
}

export function getScopedTokenSso (tenantId, unscopedToken) {
  const body = constructTokenBody('saml2')(tenantId, unscopedToken)
  return bareHttp.postReq('/auth/tokens?nocatalog', body)
}

export function getScopedTokenWithCatalogSso (tenantId, unscopedToken) {
  const body = constructTokenBody('saml2')(tenantId, unscopedToken)
  return bareHttp.postReq('/auth/tokens', body)
}

export const getServiceCatalog = () => v3.getReq('/auth/catalog')

export const getServices = () => memoize('keystone-services', () => v3.getReq('/services'))
export const getRegions = () => memoize('keystone-regions', () => v3.getReq('/regions'))

export function getEndpoints (refresh) {
  if (endpointsPromise && !refresh) {
    return endpointsPromise
  }
  endpointsPromise = v3.getReq('/endpoints')
  return endpointsPromise
}

export const isMfaEnabled = (userId) => admin.getReq(`/PF9-KSADM/users/${userId}/mfa`)

export function enableMfa (userId, secret) {
  const body = {
    mfa: { enabled: true, secret: secret }
  }
  return admin.putReq(`/PF9-KSADM/users/${userId}/mfa`, body)
}

export function disableMfa (userId) {
  const body = {
    mfa: { enabled: false }
  }
  return admin.putReq(`/PF9-KSADM/users/${userId}/mfa`, body)
}

export const getIdentityProviders = () => v3.getReq('/OS-FEDERATION/identity_providers')
export const getGroupMappings = () => v3.getReq('/OS-FEDERATION/mappings')
export const getMappingById = mappingId => v3.getReq(`/OS-FEDERATION/mappings/${mappingId}`)
export const createGroupMapping = (mappingId, mapping) => v3.putReq(`/OS-FEDERATION/mappings/${mappingId}`, { mapping })
export const editGroupMapping = (mappingId, mapping) => v3.patchReq(`/OS-FEDERATION/mappings/${mappingId}`, { mapping })
export const deleteGroupMapping = mappingId => v3.deleteReq(`/OS-FEDERATION/mappings/${mappingId}`)
export const getIdpProtocols = identityProviderId => v3.getReq(`/OS-FEDERATION/identity_providers/${identityProviderId}/protocols`)

export function addIdpProtocol (identityProviderId, mappingId) {
  const body = {
    protocol: { mapping_id: mappingId }
  }
  return v3.putReq(`/OS-FEDERATION/identity_providers/${identityProviderId}/protocols/saml2`, body)
}

export const deleteIdpProtocol = identityProviderId =>
  v3.deleteReq(`/OS-FEDERATION/identity_providers/${identityProviderId}/protocols/saml2`)

export const getServiceProviders = () => v3.getReq('/OS-FEDERATION/service_providers')