import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import React from "react";
import { styled } from "styled-components";
import { useMemo } from "react";

function Map() {
  const center = useMemo(() => ({ lat: 37.340864, lng: 126.735699 }), []);

  return (
    <div>
      <p>maps</p>
      <Wrapper>
        <LoadScriptNext
          googleMapsApiKey={"AIzaSyBB-wLhUTOStCMyM-2nfPgA_5ddE_k8wOw"}
        >
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map-container"
          >
            <MarkerF position={center}></MarkerF>
          </GoogleMap>
        </LoadScriptNext>
      </Wrapper>
    </div>
  );
}

export default Map;

const Wrapper = styled.div`
  .map-container {
    width: 100%;
    height: 700px;
  }
`;
