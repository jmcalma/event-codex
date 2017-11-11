import React from 'react';
import { GoogleMap,withGoogleMap,withScriptjs } from 'react-google-maps';

class GoogleMapsWrapper extends React.Component {}

export default GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
  return <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>
}));