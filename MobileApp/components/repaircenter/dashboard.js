import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, {useState, useEffect,useCallback} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import ChatContent from "./ChatContent.js";
import { IconButton } from "react-native-paper";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyList from "./MyList";
import MyStatistics from "./MyStatistics";

const Tab = createBottomTabNavigator ();

const ChatScreen = ({repaircenterId}) => {
  return <ChatContent repaircenterId={repaircenterId}/>;
};

const RepairCenterDashboard = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [repairCenterDetails, setRepairCenterDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();
  const [documentsImage, setDocumentsImage] = useState(null);
  const [customerProfile, setCustomerProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] =
  useState(null);

  const [newDetails, setNewDetails] = useState ({
    fullname: '',
    address: '',
    contact: '',
    map: '',
  });
  const [vacancyDetails, setNewVacancyDetails] = useState ({
    position: '',
    noOfPerson: '',
    salary: '',
  });
  const handleCloseForm = () => {
    setShowForm (false);
    setNewDetails ({fullname: '', address: '', contact: '', map: ''});
  };
  const handleCloseVacancyForm = () => {
    setShowVacancyForm (false);
    setNewVacancyDetails ({position: '', noOfPerson: '', salary: ''});
  };
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/RepairCenterDetails/${repaircenter_id}`
        );
        const data = await response.json();

        setRepairCenterDetails(data.repairCenterDetails);

        const customerCheckResponse = await fetch (
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkCustomerUsername/${data.repairCenterDetails[0].username}`
        );
        if(customerCheckResponse.ok){
        const customerCheckData = await customerCheckResponse.json ();
        if (customerCheckData.exists) {
          setCustomerProfile ({
            customer_id: customerCheckData.customer_id,
          });
        }
      }
        const repairCenterSellerCheckResponse = await fetch (
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.repairCenterDetails[0].username}`
        );
        if(repairCenterSellerCheckResponse.ok){
        const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json ();

        if (repairCenterSellerCheckData.exists) {
          setRepairCenterSellerProfile ({
            repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
          });
        }
      }
      } catch (error) {
        console.error("Error fetching Repair Center details:", error);
      }
    };

      fetchRepairCenterDetails ();
    },
    []
  );

  useEffect (
    () => {
      const checkVerificationStatus = async () => {
        try {
          const response = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkVerificationStatus/${repaircenter_id}`
          );
          const data = await response.json ();
          setIsVerified (Boolean (data.verified));
        } catch (error) {
          console.error ('Error fetching verification status:', error);
        }
      };

      checkVerificationStatus ();
    },
    [route.params.repaircenter_id]
  );
  const handleDocumentsImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        // Create a FormData object
        const formData = new FormData();

        // Append the image file to the FormData object
        formData.append("documents", {
          uri: result.uri,
          type: "image/jpeg",
          name: "documents.jpg",
        });

        console.log(formData);
        // Send the FormData object to the server using fetch or axios
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repaircenterDocuments`,
          {
            method: "POST",
            body: formData,
          }
        );

        // Parse the response
        const responseData = await response.json();

        // If you want to store the Cloudinary URL in the state
        setDocumentsImage(responseData.secure_url);
      }
    } catch (error) {
      console.error("Error handling Documents image upload:", error);
    }
  };

  const handleAddDetails = async () => {
    const validateCoordinates = (coordinates) => {
      // Regular expression to match latitude and longitude separated by a comma
      const coordinatePattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},\s*-?([1]?[0-7]?[0-9]|[1-9]?[0-9])\.{1}\d{1,6}$/;

      return coordinatePattern.test(coordinates);
    };

    // Regular expression to validate contact number
    const contactRegex = /^\d{10}$/;

    // Validate contact number
    if (!contactRegex.test(newDetails.contact)) {
      alert('Invalid contact number. Please enter a 10-digit number.');
      return;
    }

    // Validate map coordinates
    const { map } = newDetails;
    if (validateCoordinates(map)) {
      // Coordinates are valid, proceed with saving
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addRepairCenterDetails`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              repaircenter_id,
              fname: newDetails.fullname,
              address: newDetails.address,
              map: newDetails.map, // Ensure you're sending the correct value for map
              contact: newDetails.contact,
              documents: documentsImage,
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          alert(data.message);
          setNewDetails(''); // Reset newDetails after successful submission
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error adding repair center details:', error);
        alert('Error adding repair center details. Please try again.');
      }
    } else {
      // Invalid coordinates
      alert('Please enter valid coordinates (latitude, longitude).');
    }
  };

  const handleAddVacancyDetails = async () => {
    const noOfPersonRegex = /^\d+$/;
    if (!noOfPersonRegex.test (vacancyDetails.noOfPerson)) {
      alert ('Invalid number of persons. Please enter a valid number.');
      return;
    }

    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addVacancyDetails`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
            repaircenter_id,
            vacancy: {
              position: vacancyDetails.position,
              noOfPerson: vacancyDetails.noOfPerson,
              salary: vacancyDetails.salary,
            },
          }),
        }
      );

      const data = await response.json ();
      if (data.success) {
        alert (data.message);
      } else {
        alert (`Error: ${data.message}`);
      }
      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }
    } catch (error) {
      console.error ('Error adding Vacancy details:', error);
    }
  };
  const handleButtonPress = (buttonType) => {
    switch (buttonType) {
      case "switchToCustomerProfile":
        navigation.navigate("CustomerDashboard", {
          customer_id: customerProfile?.customer_id,
        });
        break;
      case "switchToRepairCenterSellerProfile":
        navigation.navigate("RepairCenterPartsSeller", {
          repaircenter_id:
            repairCenterSellerProfile?.repair_parts_seller_users_id,
        });
        break;
    }
  };
  const handleStartRepairing = (screen) => {
    if (isVerified) {
      navigation.navigate (screen, {repaircenter_id});
    } else {
      alert ('Repair Center Verification Pending');
    }
  };
  const handleParts = (screen) => {
      navigation.navigate (screen, {repaircenter_id});
  };
  const handleMenuNavigation = useCallback((screen) => {
    navigation.navigate(screen, repaircenter_id);
  }, [navigation, repaircenter_id]);

  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };


  const handleRepairHistory = useCallback((screen) => {
    navigation.navigate ('RepairHistoryScreen',repaircenter_id);
  },[navigation, repaircenter_id]);

  return (

       <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#d4af37',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        children={() => (
          <MenusScreen
          handleMenuNavigation={handleMenuNavigation}
          handleRepairHistory={handleRepairHistory}
          handleStartRepairing={handleStartRepairing}
          handleParts={handleParts}
          setShowForm={setShowForm} // Pass setShowForm as prop
          setShowVacancyForm={setShowVacancyForm} // Pass setShowVacancyForm as prop
          showForm={showForm}
          showVacancyForm={showVacancyForm}
          handleCloseForm={handleCloseForm}
          handleCloseVacancyForm={handleCloseVacancyForm}
          vacancyDetails={vacancyDetails}
          newDetails={newDetails}
          documentsImage={documentsImage}
          handleAddDetails={handleAddDetails}
          handleAddVacancyDetails={handleAddVacancyDetails}
          handleDocumentsImageUpload={handleDocumentsImageUpload}
          setNewDetails={setNewDetails}
          repairCenterDetails={repairCenterDetails}
          handleNotificationPress={handleNotificationPress}
           />
        )}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="List"
        component={MyList}
        initialParams={{ repaircenter_id: repaircenter_id }}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="menu" size={size} color={color} />
          ),
        }}
      />

       <Tab.Screen
        name="ChatContent"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="chat" size={size} color={color} />
          ),
        }}
      >
        {() => <ChatScreen repaircenterId={repaircenter_id} />}
        </Tab.Screen>
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileScreen
          customerProfile={customerProfile}
            repairCenterSellerProfile={repairCenterSellerProfile}
            handleButtonPress={handleButtonPress}
          />
        )}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>


  );
};
function MenusScreen({
  handleRepairHistory,
  handleStartRepairing,
  handleParts,
  setShowForm,
  setShowVacancyForm,
  showForm,
  showVacancyForm,
  handleCloseForm,
  handleCloseVacancyForm,
  vacancyDetails,
  newDetails,
  documentsImage,
  handleAddDetails,
  handleAddVacancyDetails,
  handleDocumentsImageUpload,
  setNewDetails,
  repairCenterDetails,
  handleNotificationPress,
}) {
  return (
    <ScrollView style={styles.MainContainer}>

      <View style={{marginTop:60,}}>
      <Text  style={{marginLeft: 2,marginBottom: 3, fontSize : 24, fontWeight:"bold"}} >Hello,&nbsp;{repairCenterDetails && repairCenterDetails[0].username }</Text>
      <Text  style={{marginLeft: 2,marginBottom: 15, fontSize : 14}} >Lets explore.</Text>
      </View>
      <TouchableOpacity style={styles.bell}  onPress={handleNotificationPress}>
        <Ionicons name="notifications" size={20
        } color="white" />
      </TouchableOpacity>
      <MyStatistics />

      <View>
        <Text style={{ fontSize: 14,paddingBottom:10,paddingTop:25,fontWeight:'bold' }}>Services</Text>
        <View style={styles.scrollContainer}>
      <View style={styles.gridContainer}>

        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => setShowForm(true)}
        >
          <Ionicons name="calendar-outline" size={30} color="white" />
          <Text style={{ paddingTop:10,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                          }}>
                            Add Repair Center</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowVacancyForm(true)}
        >
          <Ionicons name="people" size={25} color="#808000" />
          <Text style={styles.buttonText}>Add Vacancy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRepairHistory()}
        >
          <Ionicons name="timer" size={25} color="#808000" />
          <Text style={styles.buttonText}>Repair History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParts('PartsManagement')}
        >
          <Ionicons name="car-sport" size={25} color="#808000" />
          <Text style={styles.buttonText}>Parts Management</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStartRepairing('AddWorkersScreen')}
        >
          <Ionicons name="person-circle" size={25} color="#808000" />
          <Text style={styles.buttonText}>Add Workers</Text>
        </TouchableOpacity>
      </View>
    </View>
        </View>

      {showForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              paddingTop: 10,
              paddingLeft: 20,
              paddingBottom: 60,
              fontWeight:"bold",
            }}
          >
            Repair Center Form
          </Title>
          <IconButton
            icon="close"
            size={20}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseForm}
          />
          <Card.Content>
            <TextInput
              style={styles.field}
              placeholder="Full name"
              underlineColor="transparent"
              value={newDetails.fullname}
              onChangeText={text =>
                setNewDetails ({...newDetails, fullname: text})}
            />
            <TextInput
              style={styles.field}
              placeholder="Address"
              underlineColor="transparent"
              value={newDetails.address}
              onChangeText={text =>
                setNewDetails ({...newDetails, address: text})}
            />
            <TextInput
              style={styles.field}
              placeholder="Contact"
              underlineColor="transparent"
              value={newDetails.contact}
              onChangeText={text =>
                setNewDetails ({...newDetails, contact: text})}
            />
            <TextInput
              style={styles.field}
              underlineColor="transparent"
              value={newDetails.map}
              placeholder="Enter map coordinates"
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, map: text })
              }
            />
            <TouchableOpacity
              onPress={handleDocumentsImageUpload}
              style={{
                padding: 15,
                alignItems: "center",
                marginTop: 20,
                borderRadius: 20,
                backgroundColor: "#8a9a5b",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15,  }}
              >
                Upload Document Image
              </Text>
            </TouchableOpacity>
            {documentsImage && (
              <Image
                source={{ uri: documentsImage }}
                style={{ width: 100, height: 100, marginTop : 30 }}
              />
            )}
            <Button style={styles.addButton} onPress={handleAddDetails}>
              <Text style={{color: 'white',fontWeight:'bold'}}>Add Details </Text>
            </Button>
          </Card.Content>
        </Card>}
      {showVacancyForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              paddingTop: 10,
              paddingLeft: 20,
              paddingBottom: 60,
              fontWeight:"bold",
            }}
          >
            Add Vacancy Form
          </Title>
          <IconButton
            icon="close"
            size={20}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseVacancyForm}
          />

          <TextInput
            style={styles.field}
            label="Position"
            underlineColor="transparent"
            value={vacancyDetails.position}
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, position: text})}
          />
          <TextInput
            style={styles.field}
            label="Number of person"
            underlineColor="transparent"
            value={vacancyDetails.noOfPerson}
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, noOfPerson: text})}
          />
          <TextInput
            style={styles.field}
            label="Salary"
            underlineColor="transparent"
            value={vacancyDetails.salary}
            placeholder="10k-20k"
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, salary: text})}
          />
          <Button
            style={styles.addButton}
            mode="contained"
            onPress={handleAddVacancyDetails}
          >
            <Text style={{color: 'white'}}>Add Vacancy</Text>
          </Button>
        </Card>}
    </ScrollView>
  );
}
function ProfileScreen({
  customerProfile,
  repairCenterSellerProfile,
  handleButtonPress,
})  {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.profileContainer}>

    <Text style={styles.profileTitle}>Account</Text>

      <Text style={styles.profileSubTitle}>Services</Text>

      <View  style={styles.switchprofilebutton}>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>Payments</Text>
          </TouchableOpacity>
      </View>

      <Text style={styles.profileSubTitle}>Profile Settings</Text>

      <View  style={styles.switchprofilebutton}>
      {customerProfile &&
          <TouchableOpacity
          style={styles.profilebutton}
            onPress={() => handleButtonPress ('switchToCustomerProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Customer Profile</Text>
          </TouchableOpacity>}
          {repairCenterSellerProfile &&
          <TouchableOpacity
          style={styles.profilebutton}
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Seller Profile</Text>
          </TouchableOpacity>}

      </View>
      <Text style={styles.profileSubTitle}>Support</Text>
      <View  style={styles.switchprofilebutton}>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>App Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>Help Center</Text>
          </TouchableOpacity>

      </View>

      <View style={styles.buttonRow}>

<TouchableOpacity
style={styles.switchprofileLogbutton}
onPress={handleLogout}
>
<Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Log Out</Text>
</TouchableOpacity>
</View>
</View>



  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  bell:{
    top:65,
    right:10,
    position:'absolute',
    backgroundColor: "#808000",
    padding:8,
    borderRadius:10,
  },
  MainContainer:{
    flex: 1,
    padding:20,
  },
ScrollView:{
  flex:1,
},
  buttonContainer: {
    width: '100%',
  },
  heading: {
    paddingTop: 30,
    paddingLeft: 45,
    alignItems: 'left',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#c1121f',
    marginVertical: 20,
    fontSize: 25,
    paddingBottom: -60,
  },

  icon: {
    marginLeft: 30,
    marginRight: 20,
  },
  scrollContainer: {
    flex: 1,

  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonMain:{
    width: '48%', // Adjust this value according to your preference
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#808000',
    elevation: 2, // Android
  },
  button: {
    width: '48%', // Adjust this value according to your preference
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    paddingTop:10,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
  },

  card: {
    paddingTop:90,
    height: '200%',
    width: '100%',
    padding: 30,
    position: 'absolute',
    backgroundColor:"#f5f5f5",

  },
  field: {
    marginBottom: 15,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 10,
    textDecorationLine: 'none',
    backgroundColor: 'white',
    elevation:2,
  },
  addButton: {
    padding: 8,
    color: 'white',
    alignItems: 'center',
    marginTop: '13%',
    backgroundColor: '#808000',

  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1,
  },
  profileContainer:{
    flex: 1,
    alignItems: 'left',
    paddingTop:"25%",
    paddingLeft:"5%",
  },
  profileTitle:{
    fontSize:25,
    fontWeight:'bold',
  },
  profileSubTitle:{
    paddingTop:"8%",
    fontWeight:'medium',
    fontSize:14,
    paddingBottom:10,
  },
  buttonRow: {
    height:300,
    width:"60%",
  },
  buttonProfileText:{
    color:'black',
    fontWeight:"medium",
    fontSize:15,
  },
  switchprofilebutton: {
    backgroundColor: 'white',
    width:'94%',
    justifyContent: 'center',
    alignItems: 'left',
    elevation: 2,
    borderRadius:10,
  },
  profilebutton:{
    padding:24,
    borderWidth:0.2,
    borderColor:'#e5e4e2',
  },
  switchprofileLogbutton:{
    backgroundColor:"#96a53c",
    padding: 15,
    borderRadius: 50,
    width:'60%',
    alignItems : 'center',
    marginVertical : 20,
    marginLeft : '50%',
    marginRight : '50%'
  },
});

export default RepairCenterDashboard;
