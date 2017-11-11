import React from 'react';
import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyDdM27qBjlwOnDpVgCeirjuufa1OIgXmaw');

class MiniMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			currentEvent: "",
			locationLatitude: "",
			locationLongitude: "",
		};
	}
	// componentWillMount() {
	// 	this.setState({ 
	// 		markers: [],
	// 		currentEvent: ""

	// 	 })
	// }
	
	componentDidMount() {
		this.setState({ currentEvent: this.props.event});
		this.geocodeAddress(this.state.currentEvent.location);
	}

	geocodeAddress = (location) => {
		Geocoder.getFromLocation("Colosseum").then( /////set real location lol
			json => {
				var location = json.results[0].geometry.location;
				this.setState({ locationLatitude: location.lat });
				this.setState({ locationLongitude: location.lng });
				console.log(location.lat);
				console.log(location.lng);
			}),
			error => {
				console.log(error);
		};
	}
	
	render () {
		console.log(this.state.currentEvent.location);
		
		return (
			<GoogleMapsWrapper
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				defaultZoom={10}
				//defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
				defaultCenter={{ lat: this.state.locationLatitude, lng: this.state.locationLongitude }}>
				<MarkerClusterer
					averageCenter
					enableRetinaIcons
					gridSize={60}
					>
					{this.state.markers.map(marker => (
						<Marker
							key={marker.photo_id}
							position={{ lat: marker.latitude, lng: marker.longitude }}
							/>
					))}
				</MarkerClusterer>
			</GoogleMapsWrapper>
		);
	}
}

export default MiniMap;