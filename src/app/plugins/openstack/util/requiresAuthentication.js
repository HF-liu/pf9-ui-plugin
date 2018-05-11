import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Session from '../actions/session'
import { fetchServiceCatalog } from '../actions/serviceCatalog'
const { restoreSession } = Session()

// import { getStorage } from '../../../core/common/pf9-storage'

// Wraps a component class to make it require authentication.
const requiresAuthentication = WrappedComponent => {
  const mapState = state => ({ session: state.openstack.session, serviceCatalogLoaded: state.openstack.serviceCatalog.serviceCatalogLoaded })

  return (
    @withRouter
    @connect(mapState)
    class AuthenticatedComponent extends React.Component {
      async componentDidMount () {
        const { session, history, dispatch, serviceCatalogLoaded } = this.props
        if (!(session && session.user)) {
          // Check first to see if there is a session we can recover from LocalStorage
          const restored = await dispatch(restoreSession)

          // Otherwise force the user to log in
          if (!restored) {
            history.push('/ui/openstack/login')
          }
        }

        if (!serviceCatalogLoaded) {
          dispatch(fetchServiceCatalog())
        }
      }

      render () {
        // We need to delay rendering authenticated components until
        // authentication is completed.  Otherwise components will attempt
        // to make API calls (componentDidMount) before authentication / session
        // restore has the chance to finish.
        const { session, serviceCatalogLoaded } = this.props
        const shouldRender = session && session.user && serviceCatalogLoaded
        return shouldRender ? <WrappedComponent {...this.props} /> : null
      }
    }
  )
}

export default requiresAuthentication
