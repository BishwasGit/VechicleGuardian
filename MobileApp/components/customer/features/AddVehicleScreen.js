import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput, Checkbox} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import * as ImagePicker from 'expo-image-picker';

const AddVehicleScreen = ({route}) => {
  const {customer_id} = route.params;
  const [vehicleType, setVehicleType] = useState ('Two Wheeler');
  const [vehicleNumber, setVehicleNumber] = useState ('');
  const [vehicleLot, setVehicleLot] = useState ('');
  const [vehicleCompany, setVehicleCompany] = useState ('');
  const [vehicleModel, setVehicleModel] = useState ('');
  const [createdDate, setCreatedDate] = useState ('');
  const [expiryDate, setExpiryDate] = useState ('');
  const [ownerName, setOwnerName] = useState ('');
  const [contactNumber, setContactNumber] = useState ('');
  const [message, setMessage] = useState (null);
  const [vehicleImage, setVehicleImage] = useState (null);
  const [billBookImage, setBillBookImage] = useState (null);
  const [isVehicleUsedForIncome, setIsVehicleUsedForIncome] = useState (false);
  const navigation = useNavigation ();

  const handleCloseForm = () => {
    if (route.name === 'AddVehicleScreen') {
      // Add your specific conditions or use navigate to go to a different screen
      navigation.navigate ('AddVehicleScreen');
    } else {
      navigation.goBack ();
    }
  };
  const handleVehicleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // Check if the user cancelled the image selection
      if (result.canceled) {
        console.log('Image selection cancelled');
        return;
      }

      // Access the selected asset from the assets array
      const selectedAsset = result.assets[0];

      // Create a FormData object
      const formData = new FormData();

      // Append the selected asset to the FormData object
      formData.append('image', {
        uri: selectedAsset.uri,
        type: 'image/jpeg', // Adjust the type based on the image type
        name: 'vehicle_image.jpg', // Adjust the name as needed
      });

      // Send the FormData object to the server using fetch or axios
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/vehicleImageupload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      // Parse the response
      const responseData = await response.json();

      // If you want to store the Cloudinary URL in the state
      setVehicleImage(responseData.secure_url);
    } catch (error) {
      console.error('Error handling vehicle image upload:', error);
    }
  };

  const handleBillBookImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync ({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {

      // Access the selected asset from the assets array
      const selectedAsset = result.assets[0];

        // Create a FormData object
        const formData = new FormData ();

        // Append the image file to the FormData object
        formData.append ('image', {
          uri: selectedAsset.uri,
          type: 'image/jpeg', // Adjust the type based on the image type
          name: 'bill_book_image.jpg', // Adjust the name as needed
        });

        // Send the FormData object to the server using fetch or axios
        const response = await fetch (
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/billBookImage`,
          {
            method: 'POST',
            body: formData,
          }
        );

        // Parse the response
        const responseData = await response.json ();

        // If you want to store the Cloudinary URL in the state
        setBillBookImage (responseData.secure_url);
      }
    } catch (error) {
      console.error ('Error handling bill book image upload:', error);
    }
  };

  const handleAddVehicle = async () => {
    if (
      !customer_id ||
      !vehicleType ||
      !vehicleNumber ||
      !vehicleLot ||
      !vehicleCompany ||
      !vehicleModel ||
      !ownerName ||
      !contactNumber
    ) {
      alert ('Error', 'Please fill in all the details.');
      return;
    }
    // Validate contactNumber
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test (contactNumber)) {
      setMessage ('Error: Contact number should be 10 digits');
      return;
    }

    try {
      // Construct the bill book details as a JSON object
      const billBookDetails = {
        createdDate,
        expiryDate,
        ownerName,
        contactNumber,
      };
      const images = {
        vehicleImage,
        billBookImage,
      };
      const response = await axios.post (
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/storeVehicleDetails`,
        {
          customer_id,
          vehicleType,
          vehicleNumber,
          vehicleLot,
          vehicleCompany,
          vehicleModel,
          billBookDetails, // Include the bill book details
          images,
          isVehicleUsedForIncome: isVehicleUsedForIncome ? 1 : 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log("Server Response:", response.data);
      if (response.data.message) {
        // Update the message state for success
        setMessage (response.data.message);
        setVehicleType ('Two Wheeler');
        setVehicleNumber ('');
        setVehicleLot ('');
        setVehicleCompany ('');
        setVehicleModel ('');
        setCreatedDate ('');
        setExpiryDate ('');
        setOwnerName ('');
        setContactNumber ('');
        setVehicleImage ('');
        setBillBookImage ('');
      } else {
        // Update the message state for error
        setMessage (response.data.error || 'Failed to store vehicle details.');
      }
    } catch (error) {
      console.error ('Error adding vehicle:', error);
      // Update the message state for error
      setMessage (
        'Something went wrong. Please try again. Maybe Vehicle Number already exists'
      );
    }
  };

  return (
    <ScrollView style={styles.card}>
      <Text style={styles.heading}>Add your vehicle details</Text>
      {/* Form for collecting vehicle details */}
      <View style={styles.container}>
        <IconButton
          icon="close"
          size={20}
          color="black"
          style={styles.closeIcon}
          onPress={handleCloseForm}
        />
        {/* Dropdown for selecting vehicle type */}
        <Picker
          selectedValue={vehicleType}
          label="vehicleType"
          style={styles.pickerContain}
          onValueChange={itemValue => setVehicleType (itemValue)}
        >
          <Picker.Item
            style={styles.contain}
            label="Two Wheeler"
            value="Two Wheeler"
          />
          <Picker.Item
            style={styles.contain}
            label="Four Wheeler"
            value="Four Wheeler"
          />
          <Picker.Item style={styles.contain} label="Cycle" value="Cycle" />
        </Picker>

        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={text => setVehicleNumber (text)}
          left={<TextInput.Icon icon="tag-outline" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Lot"
          value={vehicleLot}
          onChangeText={text => setVehicleLot (text)}
          left={<TextInput.Icon icon="bookmark-outline" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="vehicle Company"
          value={vehicleCompany}
          onChangeText={text => setVehicleCompany (text)}
          left={<TextInput.Icon icon="home-outline" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={text => setVehicleModel (text)}
          left={<TextInput.Icon icon="car-outline" color='gray' />}
        />
        {/* Bill Book details */}

        <Text style={styles.headingTo}>Bill Book Details</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Created Date : yyyy-mm-dd"
          value={createdDate}
          onChangeText={text => setCreatedDate (text)}
          left={<TextInput.Icon icon="calendar" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Expiry Date : yyyy-mm-dd"
          value={expiryDate}
          onChangeText={text => setExpiryDate (text)}
          left={<TextInput.Icon icon="calendar" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Owner Name"
          value={ownerName}
          onChangeText={text => setOwnerName (text)}
          left={<TextInput.Icon icon="account-outline" color='gray' />}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={text => setContactNumber (text)}
          left={<TextInput.Icon icon="phone-outline" color='gray' />}
        />
         <Checkbox.Item
          label="Is vehicle used for income?"
          status={isVehicleUsedForIncome ? 'checked' : 'unchecked'}
          onPress={() => setIsVehicleUsedForIncome (!isVehicleUsedForIncome)}
          color="#808000" // Set the checkbox color
          placeholderStyle={{color: '#808000'}} // Set the placeholder color
        />
        <TouchableOpacity
          onPress={handleVehicleImageUpload}
          style={{
            padding: 14,
            alignItems: 'center',
            marginTop: 8,
            borderRadius:20,
            backgroundColor: '#d4af37',
          }}
        >
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold',}}>
            Upload Vehicle Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBillBookImageUpload}
          style={{
            padding: 14,
            alignItems: 'center',

            borderRadius:20,
            backgroundColor: '#d4af37',
          }}
        >
          <Text style={{color: 'white', fontSize: 14,fontWeight: 'bold', }}>
            Upload Bill Book Image
          </Text>
        </TouchableOpacity>



<TouchableOpacity
          onPress={handleAddVehicle}
          style={{
            padding: 14,
            alignItems: 'center',
            marginTop: 35,
            borderRadius:20,
            backgroundColor: '#808000',
          }}
        >
          <Text style={{color: 'white', fontSize: 14, }}>
            Add Vehicle Details
          </Text>
        </TouchableOpacity>
              {/* Display message */}
      {message &&
        <Text
          style={
            message.startsWith ('Success')
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message}
        </Text>}
      </View>

      {/* Upload buttons */}

      {/* Display uploaded images */}
      {vehicleImage &&
        <Image
          source={{uri: vehicleImage}}
          style={{width: 100, height: 100}}
        />}

      {billBookImage &&
        <Image
          source={{uri: billBookImage}}
          style={{width: 100, height: 100}}
        />}
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  card: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  container: {
    padding: 35,
    gap: 20,
    marginBottom: 55,
  },
  pickerContain: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    color: 'white',
    backgroundColor: '#d4af37',
  },
  contain: {
    padding: 40,
    color: 'white',
  },
  closeIcon: {
    position: 'absolute',
    top: -36,
    right: 20,
    zIndex: 1,
  },
  heading: {
    marginTop: '10%',
    paddingLeft: '10%',
    alignItems: 'left',
    color: '#556b2f',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headingTo: {
    marginTop: '10%',
    alignItems: 'left',
    color: '#556b2f',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textinput: {
    height: 45,
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    paddingLeft: 30,
    marginTop: 10,
  },

  successMessage: {
    color: 'green',
    marginVertical: 10,
  },
  errorMessage: {
    color: 'red',
    marginVertical: 10,
  },
});

export default AddVehicleScreen;
