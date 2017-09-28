import React from 'react'
import PropTypes from 'prop-types'
import { clearInitialization } from 'firekit'
import { initConnection, unsubscribeConnection } from 'firekit'
import { watchAuth, authStateChanged, authError} from 'firekit'
import { watchList, unwatchList, destroyList, unwatchAllLists } from 'firekit'
import { watchPath, unwatchPath, destroyPath, unwatchAllPaths } from 'firekit'
import { initMessaging, clearMessage } from 'firekit'

const withFirebase = (Component) => {
  const ChildComponent = (props, context) => {
    const {firebaseApp, store} = context
    const {dispatch} = store

    return <Component
      dispatch={dispatch}
      firebaseApp={firebaseApp}

      watchAuth={(onAuthStateChanged, onAuthError) => {
        dispatch(watchAuth(firebaseApp, onAuthStateChanged, onAuthError))
      }}

      clearInitialization={() => { dispatch(clearInitialization()) }}

      authStateChanged={(user) => { dispatch(authStateChanged(user)) }}
      authError={(error) => { dispatch(authError(error)) }}

      watchConnection={() => { dispatch(initConnection(firebaseApp)) }}
      unwatchConnection={() => { dispatch(unsubscribeConnection(firebaseApp)) }}

      watchList={(path, alias, append) => { dispatch(watchList(firebaseApp, path, alias, append)) }}
      unwatchList={(path, alias) => { dispatch(unwatchList(firebaseApp, path, alias)) }}
      destroyList={(path, alias) => { dispatch(destroyList(firebaseApp, path, alias)) }}
      unwatchAllLists={() => { dispatch(unwatchAllLists(firebaseApp)) }}

      watchPath={(path, alias) => { dispatch(watchPath(firebaseApp, path, alias)) }}
      unwatchPath={(path, alias) => { dispatch(unwatchPath(firebaseApp, path, alias)) }}
      destroyPath={(path, alias) => { dispatch(destroyPath(firebaseApp, path, alias)) }}
      unwatchAllPaths={() => { dispatch(unwatchAllPaths(firebaseApp)) }}

      clearApp={() => {
        dispatch(unwatchAllLists(firebaseApp))
        dispatch(unwatchAllPaths(firebaseApp))
        dispatch(unsubscribeConnection(firebaseApp))
      }}

      initMessaging={(handleTokenChange, onMessageReceieved) => { dispatch(initMessaging(firebaseApp, handleTokenChange, onMessageReceieved)) }}
      clearMessage={() => { dispatch(clearMessage()) }}

      {...props}
    />
  }

  ChildComponent.contextTypes = {
    firebaseApp: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  return ChildComponent
}

export default withFirebase
