import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

const api ={
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

const Weather = (props) => {
    const [temp,setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon,setIcon] = useState('')

    useEffect(() => {
        const url = api.url +
        'lat=' + props.latitude +
        '&lon=' + props.longitude +
        '&units=metric' +
        '&appid=' + api.key

        console.log(url)

        fetch(url)
        .then(res => res.json())
        .then((json) =>{
            console.log(json)
            setTemp(json.main.temp)
            setDescription(json.weather[0].description)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
            // console.log('Icon address is:', icon)
        })
        .catch((error) =>{
            setDescription('Error retrieving weather information.')
            console.log('Error in fetch:'+ error)
        })
    }, []);

  return (

    <View>
      <Text style={styles.temp}>Temperature: {temp}</Text>
      {icon && 
        <Image source={{uri: icon}} style={{width: 100, height: 100}}></Image>
        }

        <Text>Description: {description}</Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({})