import * as types from './types';

export function onTokenChanged(token) {
  return {
    type: types.TOKEN_CHANGED,
    payload: {token}
  };
}

export function onPermissionChanged(hasPermission, onMessage) {
  return {
    type: types.PERMISSION_CHANGED,
    payload: {hasPermission}
  };
}

export function onMessage(message) {
  return {
    type: types.ON_MESSAGE,
    payload: {message}
  };
}

export function onMessagingError(error) {
  return {
    type: types.MESSAGING_ERROR,
    payload: {error}
  };
}


export function initMessaging(firebaseApp, onMessageReceieved) {

  return dispatch => {
    const messaging=firebaseApp.messaging();

    try{
      messaging.requestPermission()
      .then(()=>{
        return messaging.getToken();
      })
      .then(token=>{
        dispatch(onTokenChanged(token));
      })
      .catch(error=>{
        dispatch(onPermissionChanged(false));
      })
    }catch(e){
      dispatch(onTokenChanged(token));
    }

    messaging.onMessage(payload => {

      if(onMessageReceieved!==undefined && onMessageReceieved instanceof Function){
        onMessageReceieved(payload);
      }

      dispatch(onMessage(payload));

    });
  }




}
