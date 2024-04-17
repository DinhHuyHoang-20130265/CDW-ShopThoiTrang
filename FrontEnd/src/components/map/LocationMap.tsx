import React from "react";
import {Map, GoogleApiWrapper, Marker} from "google-maps-react";

const FooterMap = (props: any) => {
    const mapStyles = {
        width: "100%",
        height: "100%"
    };

    return (
        // @ts-ignore
        <Map google={props.google} zoom={10} style={mapStyles}
             initialCenter={{lat: props.latitude, lng: props.longitude}}>
            {/* @ts-ignore */}
            <Marker position={{lat: props.latitude, lng: props.longitude}}
                    icon={{
                        url: `/assets/img/2.png`
                    }}
                    animation={props.google.maps.Animation.BOUNCE}
            />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: ""
})(FooterMap);
