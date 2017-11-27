import React from 'react';
import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import Geocoder from 'react-native-geocoding';

class MiniMap extends React.Component {
	constructor(props) {
		super(props);
		Geocoder.setApiKey('AIzaSyCq6nFHd98u1FgWCwivJDeBUAUNEhvB7Gw');
		this.state = {
			markers: [],
			currentEvent: [],
			locationLatitude: 0,
			locationLongitude: 0,
		};
	}
	
	componentDidMount() {
		this.setState({ currentEvent: this.props.event});
		if(this.props.event.hasOwnProperty('group')) {
			this.geocodeAddress(this.props.event.location);
		} else {
			this.geocodeAddress(this.props.event.location);
		}
	}

	geocodeAddress = (location) => {
		Geocoder.getFromLocation(location).then(
			json => {
				var location = json.results[0].geometry.location;
				console.log(location.lat);
				this.setState({ locationLatitude: location.lat });
				this.setState({ locationLongitude: location.lng });
			}),
			error => {
				alert(error);
			};
	}
	
	render () {
		return (
			<GoogleMapsWrapper
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq6nFHd98u1FgWCwivJDeBUAUNEhvB7Gw&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `300px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				defaultZoom={13}
				defaultCenter={{ lat: this.state.locationLatitude, lng: this.state.locationLongitude }}>
				<MarkerClusterer
					averageCenter
					enableRetinaIcons
					gridSize={60}
				>
					<Marker
						position={{ lat: this.state.locationLatitude, lng: this.state.locationLongitude }}
					/>
				</MarkerClusterer>
			</GoogleMapsWrapper>
		);
	}
}

export default MiniMap;