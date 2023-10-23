import * as React from 'react';
import {AutoFocus, Camera, CameraType} from 'expo-camera';

const cameraRef = React.useRef(null);
const [cameraType, setCameraType] = React.useState(CameraType.back);

const Cameracom = ({navigation}: {navigation: any}) => {
  return <Camera ref={cameraRef} type={cameraType} autoFocus={AutoFocus.on} />;
};
