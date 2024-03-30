import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet,Text,TextInput,View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";




export default function App(){

  

const [data,setData]=useState("");
const[text,setText]=useState("");
  const add=async()=>{
    try{
await AsyncStorage.setItem('note',text);
    }catch(e){
      console.error(e)
    }
}
const fetchData=()=>{
  axios.get("https://jsonplaceholder.typicode.com/users").then(Response=>console.log("response",Response))
}

const OnPress=()=>{
  console.log("hii")
}

const get=async()=>{
  try{
const value=await AsyncStorage.getItem('note');

if(value!=null){
setData(value);
}
  }catch(e){
    console.error(e)
  }
}
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data}</Text>
      <StatusBar style="auto"/>
      <View style={styles.button}>
<TextInput style={{height:40}}
placeholder="enter the value"
onChangeText={text=>setText(text)}
defaultValue={text}>

</TextInput>
      </View>
    
    <View style={styles.button}>
<Button
title="ADD"
onPress={add}>

</Button>

    </View>

    <View style={styles.button}>
<Button
title="get"
onPress={get}>

</Button>

    </View>
    <View style={styles.button}>
<Button
title="fetch Api"
onPress={()=>fetchData()}>

</Button>
<Button
title="press"
onPress={OnPress}/>



    </View>

    </View>
  )
}

const styles=StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'

  },
  textStyle:{
    fontSize:40,
    marginBottom:30
  },
  button:{
    margin:20,
    width:250,
  }

})

  
