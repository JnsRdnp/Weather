import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import Weather from './Weather'

const Position = () => {
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] = useState(0)
    const [message,setMessage] = useState('Retrieving location...')
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        (async() =>{
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try{
                if(status !== 'granted'){
                    setMessage('Location not permitted.')

                } else{
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved.')
                }
            }catch(error){
                setMessage('Error retrieving location.')
                console.log(error)
        }
        setIsLoading(false)
        })()
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
      <Text style={styles.message}>{message}</Text>

      {isLoading === false &&
        <Weather latitude={latitude} longitude={longitude}></Weather>}
    </View>
  )
}

export default Position

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    coords: {
        // flex: 1,
        alignSelf: 'center',
        fontSize: 25,
        backgroundColor:'lightblue'
    },
    message:{
        alignSelf:'center'

    }

})