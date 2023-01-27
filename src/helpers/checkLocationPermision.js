//@ts-check

import { Platform } from "react-native";
import { openSettings, PERMISSIONS, request } from "react-native-permissions";

export const checkLocationPermision = async () => {

    let permissionStatus;

    if(Platform.OS === 'ios'){
        permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    } else {
        permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    }

    if( permissionStatus === 'denied' ) return;

    if( permissionStatus === 'blocked' ){
        openSettings()
    }
}