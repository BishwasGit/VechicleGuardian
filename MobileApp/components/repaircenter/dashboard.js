import React, {useState, useEffect,useCallback} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import DashboardContent from './dashboardContent.js';
import { IconButton } from "react-native-paper";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator ();
const DashboardScreen = () => {
  return <DashboardContent />;
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
        const customerCheckData = await customerCheckResponse.json ();
          console.log(data.repairCenterDetails[0].username);
        if (customerCheckData.exists) {
          setCustomerProfile ({
            customer_id: customerCheckData.customer_id,
          });
        }
        const repairCenterSellerCheckResponse = await fetch (
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.repairCenterDetails[0].username}`
        );
        const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json ();

        if (repairCenterSellerCheckData.exists) {
          setRepairCenterSellerProfile ({
            repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
          });
        }
      } catch (error) {
        console.error("Error fetching Repair Center details:", error);
      }
    };

      fetchRepairCenterDetails ();
    },
    [route.params.repaircenter_id]
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
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test (newDetails.contact)) {
      alert ('Invalid contact number. Please enter a 10-digit number.');
      return;
    }

    try {
      const response = await fetch (
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addRepairCenterDetails`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
            repaircenter_id,
            fname: newDetails.fullname,
            address: newDetails.address,
            map: newDetails.address,
            contact: newDetails.contact,
            documents: documentsImage,
          }),
        }
      );

      const data = await response.json ();
      if (data.success) {
        alert (data.message);
        setNewDetails('');
      } else {
        alert (`Error: ${data.message}`);
      }
      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }
    } catch (error) {
      console.error ('Error adding Repair Center details:', error);
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
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menus"
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
           />
        )}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="menu" size={size} color={color} />
          ),
        }}
      />
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
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="logout" size={size} color={color} />
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
  setNewDetails
}) {

  return (
    <View style={styles.menuContainer}>

        <TouchableOpacity
        style={styles.button}
          onPress={() => setShowForm (true)}
        >
              <Ionicons name="clipboard-outline" size={30} color="#556b2f" />
          <Text style={styles.buttonText}>
            Add Repair Center Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
          onPress={() => setShowVacancyForm (true)}
        >
             <Ionicons name="people-outline" size={30} color="#556b2f" />
          <Text style={styles.buttonText}>Add Vacancy</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.button}
  onPress={() => handleRepairHistory()}
>
  <Ionicons name="timer-outline" size={30} color="#556b2f" />
  <Text style={styles.buttonText}>Repair History</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => handleParts('PartsManagement')}
>
  <Ionicons name="car-sport-outline" size={30} color="#556b2f" />
  <Text style={styles.buttonText}>Parts Management</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => handleStartRepairing('AddWorkersScreen')}
>
  <Ionicons name="person-circle-outline" size={30} color="#556b2f" />
  <Text style={styles.buttonText}>Add Workers</Text>
</TouchableOpacity>

      {showForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              paddingTop: 10,
              paddingLeft: 20,
              paddingBottom: 60,
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
              label="Full name"
              underlineColor="transparent"
              value={newDetails.fullname}
              onChangeText={text =>
                setNewDetails ({...newDetails, fullname: text})}
            />
            <TextInput
              style={styles.field}
              label="Address"
              underlineColor="transparent"
              value={newDetails.address}
              onChangeText={text =>
                setNewDetails ({...newDetails, address: text})}
            />
            <TextInput
              style={styles.field}
              label="Contact"
              underlineColor="transparent"
              value={newDetails.contact}
              onChangeText={text =>
                setNewDetails ({...newDetails, contact: text})}
            />
            <TextInput
              style={styles.field}
              label="Map Link"
              underlineColor="transparent"
              value={newDetails.map}
              placeholder="27.68899461302774, 85.28788243117607"
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
                backgroundColor: "#0d5563",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
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
              <Text style={{color: 'white'}}>Add Details </Text>
            </Button>
          </Card.Content>
        </Card>}
      {showVacancyForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 17,
              paddingTop: 130,
              paddingLeft: 20,
              paddingBottom: 20,
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
    </View>
  );
}
function ProfileScreen({
  customerProfile,
  repairCenterSellerProfile,
  handleButtonPress,
}) {
  return (
    <View style={styles.container}>
      <Text>Profile Settings</Text>
      <View style={styles.buttonRow}>
        {customerProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() => handleButtonPress ('switchToCustomerProfile')}
          >
            <Text style={styles.buttonText}>Switch to Customer Profile</Text>
          </TouchableOpacity>}
        {repairCenterSellerProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
          >
            <Text style={styles.buttonText}>Switch to Seller Profile</Text>
          </TouchableOpacity>}
      </View>
    </View>
  );
}
function LogoutScreen ({ navigation }) {
  const handleLogout = () =>{
    navigation.navigate('Login');
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchprofilebutton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    marginLeft: 30, // Space between icon and text
    marginRight: 20,
  },
  menuContainer: {
    flex: 1,
    paddingTop:80,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    paddingTop:16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
  },
  card: {
    paddingTop:90,
    flex:1,
    height: '200%',
    width: '100%',
    padding: 30,
    position: 'absolute',
    top: 1,
    backgroundColor: 'white',

  },
  field: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#1e6091',
    marginVertical: 10,
    textDecorationLine: 'none',
    backgroundColor: '#edf2f4',
  },
  addButton: {
    padding: 5,
    color: 'white',
    alignItems: 'center',
    marginTop: '13%',
    backgroundColor: '#c1121f',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1,
  },
  switchprofilebutton: {
    flex: 1, // Add this line
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1ad21',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Add this line for spacing between buttons
  },
});

export default RepairCenterDashboard;
