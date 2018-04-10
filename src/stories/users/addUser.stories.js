import React from 'react'
import { jsonDetailLogger, addStories } from '../helpers'

import AddUserForm from '../../app/plugins/openstack/components/users/AddUserForm'

addStories('User Management/Adding a user', {
  'Add a user': () => (
    <AddUserForm onSubmit={jsonDetailLogger('AddUserForm#submit')} />
  )
})