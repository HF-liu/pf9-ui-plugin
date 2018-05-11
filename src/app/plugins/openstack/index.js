import React from 'react'
import { combineReducers } from 'redux'

import DashboardPage from './components/DashboardPage'
import LoginPage from './components/LoginPage'

import AddTenantPage from './components/tenants/AddTenantPage'
import TenantsPage from './components/TenantsPage'

import UsersPage from './components/UsersPage'
import AddUserPage from './components/users/AddUserPage'

import FlavorsPage from './components/FlavorsPage'
import AddFlavorPage from './components/flavors/AddFlavorPage'

import NetworksPage from './components/NetworksPage'
import AddNetworkPage from './components/networks/AddNetworkPage'

import loginReducer from './reducers/login'
import sessionReducer from './reducers/session'
import tenantsReducer from './reducers/tenants'
import usersReducer from './reducers/users'
import flavorsReducer from './reducers/flavors'
import networksReducer from './reducers/networks'
import serviceCatalogReducer from './reducers/serviceCatalog'

class OpenStack extends React.Component {
  render () {
    return (
      <h1>OpenStack Plugin</h1>
    )
  }
}

OpenStack.__name__ = 'openstack'

OpenStack.registerPlugin = pluginManager => {
  pluginManager.registerRoutes(
    '/ui/openstack',
    [
      {
        name: 'Dashboard',
        link: { path: '/', exact: true, default: true },
        component: DashboardPage
      },
      {
        name: 'Login',
        link: { path: '/login' },
        component: LoginPage
      },
      {
        name: 'Tenants',
        link: { path: '/tenants', exact: true },
        component: TenantsPage
      },
      {
        name: 'AddTenant',
        link: { path: '/tenants/add' },
        component: AddTenantPage
      },
      {
        name: 'Users',
        link: { path: '/users', exact: true },
        component: UsersPage
      },
      {
        name: 'AddUser',
        link: { path: '/users/add' },
        component: AddUserPage
      },
      {
        name: 'Flavors',
        link: { path: '/flavors', exact: true },
        component: FlavorsPage
      },
      {
        name: 'AddFlavor',
        link: { path: '/flavors/add' },
        component: AddFlavorPage
      },
      {
        name: 'Networks',
        link: { path: '/networks', exact: true },
        component: NetworksPage
      },
      {
        name: 'AddNetwork',
        link: { path: '/networks/add' },
        component: AddNetworkPage
      },
    ]
  )

  pluginManager.registerNavItems(
    '/ui/openstack',
    [
      {
        name: 'Dashboard',
        link: { path: '/' }
      },
      {
        name: 'Tenants',
        link: { path: '/tenants' }
      },
      {
        name: 'Users',
        link: { path: '/users' }
      },
      {
        name: 'Flavors',
        link: { path: '/flavors' }
      },
      {
        name: 'Networks',
        link: { path: '/networks' }
      },
    ]
  )
}

OpenStack.reducer = combineReducers({
  login: loginReducer,
  session: sessionReducer,
  tenants: tenantsReducer,
  users: usersReducer,
  flavors: flavorsReducer,
  networks: networksReducer,
  serviceCatalog: serviceCatalogReducer
})

export default OpenStack
