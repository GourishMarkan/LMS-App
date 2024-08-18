import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import {
  useFonts,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { router } from "expo-router";
import { Image } from "expo-image";
import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Button from "@/components/button/button";


const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
];


export default function ProfileScreen() {
  const { user, loading, setRefetch } = useUser();




 
  const [image, setImage] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(user?.name);
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [show, setShow] = useState(false);


  useEffect(() => {
    // Set the default value of the phoneNumber property
    if(user){

      setMobileNo(user?.phoneNumber)
    }
  }, [user]);

  const onChange = (event:any, selectedDate: any) => {
    const currentDate = selectedDate || dob;
    setShow(false);
    setDob(currentDate);
  };
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refresh_token");
    router.push("/(routes)/login");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLoader(true);
      const base64Image = `data:image/jpeg;base64,${base64}`;
      setImage(base64Image);

      const accessToken = await AsyncStorage.getItem("token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      try {
        const response = await axios.put(
          `${SERVER_URI}/update-user-avatar`,
          {
            avatar: base64Image,
          },
          {
            headers: {
              "access-token": accessToken,
              "refresh-token": refreshToken,
            },
          }
        );
        if (response.data) {
          setRefetch(true);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  const handleUpdateAdditionalDetails = async () => {
    try {
      const response = await axios.post(`${SERVER_URI}/additionalDetails/${user?._id}`, {
        dob,
        state,
        city,
      });

      if (response.status === 200) {
        alert('Additional details updated successfully!');
      } else {
        alert('Error updating additional details!');
      }
    } catch (error) {
      console.error('Error updating additional details:', error);
      alert('Internal server error!');
    }
  };

  console.log(user?.phoneNumber)
  if(!user){
    return <Text>laoding</Text>
  }
  return (
    <>
      {loader || loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={{ flex: 1, paddingTop: 80 }}
        >
          <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ position: "relative" }}>
              
                <Image
                  source={{ uri: "https://api.dicebear.com/5.x/initials/svg?seed=Harsh" }}


                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 8,
                    borderRadius: 100,
                  }}
                />


              </View>
            </View>
      
            <View
            style={{marginTop:36, paddingHorizontal: 16, gap:8}}
            >
  <Text style={{fontSize:16}}>Name:</Text>
  <TextInput
  style={{borderWidth:1, borderRadius:5, paddingHorizontal:4, borderColor: '#c4c4c4', fontSize:16, paddingVertical:3}}
    value={user.name}
    editable={false}
    placeholder="Name"
  />

  <Text style={{fontSize:16}}>Mobile No:</Text>
  <TextInput
  style={{borderWidth:1, borderRadius:5, paddingHorizontal:4, borderColor: '#c4c4c4', fontSize:16, paddingVertical:3}}
    value={`${user.phoneNumber}`}
    editable={false}
    placeholder="Mobile Number"
    keyboardType="numeric"
  />

  <Text style={{fontSize:16}}>Email:</Text>
  <TextInput
  style={{borderWidth:1, borderRadius:5, paddingHorizontal:4, borderColor: '#c4c4c4', fontSize:16, paddingVertical:3}}
    value={user.email}
    editable={false}
    placeholder="Email"
    keyboardType="email-address"
  />

  <Text style={{fontSize:16}}>DOB:</Text>
  <View>
    <View style={{ flexDirection: 'row', alignItems: 'center' , borderRadius: 5, borderWidth:1, paddingVertical:12, paddingHorizontal: 4, borderColor: '#c4c4c4'}}>
      <Text style={{ flex: 1, color: 'gray' }}>{dob.toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={{ color: 'black' }}>Select date</Text>
      </TouchableOpacity>
    </View>
    {show && (
      <DateTimePicker
        testID="dateTimePicker"
        value={dob}
        mode="date"
        display="default"
        onChange={onChange}
      />
    )}
  </View>

  <Text style={{fontSize:16}}>State:</Text>
  <View
  style={{borderWidth:1, borderRadius:5, paddingHorizontal:4, borderColor: '#c4c4c4', fontSize:16, paddingVertical:0}}
  
  >
  <Picker
    selectedValue={state}
    // enabled={false}
  >
    <Picker.Item label="Select a state" value="" />
    {states.map((state : any) => (
      <Picker.Item label={state} value={state} key={state} />
    ))}
  </Picker>
  </View>
  

  <Text style={{fontSize:16}}>City:</Text>
  <TextInput
  style={{borderWidth:1, borderRadius:5, paddingHorizontal:4, borderColor: '#c4c4c4', fontSize:16, paddingVertical:3}}
    value={user.city}
    editable={false}
    placeholder="City"
  />
</View>
<View style={{paddingVertical: 24}}>

<Button title="Update" onPress={handleUpdateAdditionalDetails} />
</View>
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
}
