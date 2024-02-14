import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';
import { TextInput, Button, Divider } from 'react-native-paper';
import { toast } from 'toastify-js';

const VehicleIncomeExpenses = ({ route }) => {
  // Extracting vehicleDetailsId from the route params
  const { vehicleDetailsId } = route.params;
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [expenses, setExpenses] = useState([{ expense: '', amount: '' }]);
  const [income, setIncome] = useState([{ income: '', amount: '' }]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!vehicleDetailsId) {
        console.log('Vehicle Id not defined');
        return;
      }
      try {
        const response = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getvehicleDetails/${vehicleDetailsId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }
        const vehicleData = await response.json();
        setVehicleDetails(vehicleData);
      } catch (error) {
        console.log('Error occurred while fetching vehicle details:', error);
      }
    };
    fetchVehicleDetails();
  }, [vehicleDetailsId]); 

  const handleAddExpense = () => {
    setExpenses([...expenses, { expense: '', amount: '' }]);
  };

  const handleAddIncome = () => {
    setIncome([...income, { income: '', amount: '' }]);
  };

  // Function to calculate total expenses
  useEffect(() => {
    const expensesTotal = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
    setTotalExpenses(expensesTotal);
  }, [expenses]);

  // Function to calculate total income
  useEffect(() => {
    const incomeTotal = income.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
    setTotalIncome(incomeTotal);
  }, [income]);

  const handleSubmit = async () => {
    try {
      // Create JSON objects for expenses and income data
      const expenses_data = expenses.map((expense) => ({
        description: expense.expense,
        amount: parseFloat(expense.amount),
      }));
  
      const income_data = income.map((item) => ({
        description: item.income,
        amount: parseFloat(item.amount),
      }));
  
      // Calculate total expenses and total income
      const total_expenses_amount = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
      const total_income_amount = income.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  
      // Get the current timestamp
      const created_at = new Date().toISOString();
  
      // Get the vehicleDetails_id
      const vehicleDetails_id = vehicleDetailsId;
  
      // Prepare the data object to send to the server
      const data = {
        expenses_data,
        income_data,
        total_expenses_amount,
        total_income_amount,
        created_at,
        vehicleDetails_id,
      };
  
      // Send the data to the backend
      const response = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/storevehicleincomeexpenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      // Handle success response from the server
      console.log('Data submitted successfully!');
      setVehicleDetails("");
      setExpenses([]);
      setIncome([]);
      setTotalExpenses(null);
      setTotalIncome(null);
    // Show toast message
toast('Data submitted successfully!', {
    duration: 3000, // Display duration in milliseconds
    gravity: 'top', // Position of the toast message
    position: 'left', // Position of the toast message
    backgroundColor: '#4CAF50', // Background color of the toast message
  });
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle errors here
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>
      Manage income and expenses for {vehicleDetails ? `${vehicleDetails[0].vehicle_company}, ${vehicleDetails[0].vehicle_model}, ${vehicleDetails[0].vehicle_number}` : ''}
    </Text>
    <View style={styles.expensesSection}>
      <Text style={styles.sectionTitle}>Add expenses:</Text>
      <View style={styles.inputRow}>
        <Text style={[styles.textGroupTitle, { flex: 0.8 }]}>Expense Description</Text>
        <Text style={[styles.textGroupTitle, { flex: 0.4 }]}>Amount</Text>
      </View>
      {expenses.map((expense, index) => (
        <View key={index} style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 0.8 }]}>
            <TextInput
              style={styles.input}
              label="Expense Description"
              value={expense.expense}
              onChangeText={(text) => {
                const updatedExpenses = [...expenses];
                updatedExpenses[index].expense = text;
                setExpenses(updatedExpenses);
              }}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 0.4 }]}>
            <TextInput
              style={styles.input}
              label="Amount"
              value={expense.amount}
              onChangeText={(text) => {
                const updatedExpenses = [...expenses];
                updatedExpenses[index].amount = text;
                setExpenses(updatedExpenses);
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}
      <Button style={styles.button} onPress={handleAddExpense}>Add Expense</Button>
    </View>
    <Divider />
    <View style={styles.incomeSection}>
      <Text style={styles.sectionTitle}>Add income:</Text>
      <View style={styles.inputRow}>
        <Text style={[styles.textGroupTitle, { flex: 0.8 }]}>Income Description</Text>
        <Text style={[styles.textGroupTitle, { flex: 0.4 }]}>Amount</Text>
      </View>
      {income.map((item, index) => (
        <View key={index} style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 0.8 }]}>
            <TextInput
              label="Income Description"
              value={item.income}
              onChangeText={(text) => {
                const updatedIncome = [...income];
                updatedIncome[index].income = text;
                setIncome(updatedIncome);
              }}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 0.4 }]}>
            <TextInput
              label="Amount"
              value={item.amount}
              onChangeText={(text) => {
                const updatedIncome = [...income];
                updatedIncome[index].amount = text;
                setIncome(updatedIncome);
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}
      <Button onPress={handleAddIncome}>Add Income</Button>
    </View>
    <View style={styles.summary}>
      <Text style={styles.thirdTitle}>Summary:</Text>
      <Text>Total expenses: {totalExpenses}</Text>
      <Text>Total income: {totalIncome}</Text>
      <Text>Created at: {new Date().toISOString()}</Text>
    </View>
    <Button
            style={styles.button2}
            mode="contained"
            onPress={handleSubmit}
            labelStyle={styles.buttonText}
          >
            Submit
          </Button>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop : 40,
  },
  expensesSection: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thirdTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  incomeSection: {
    marginBottom: 20,
    marginTop : 20,
  },
  summary: {
    marginTop: 20,
  },
  textGroupTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  button2: {
    marginVertical: 20,
    backgroundColor: '#e1ad21',
    boxShadowColor: '#000',
    boxShadowOffset: {width: 10, height: 12},
    boxShadowOpacity: 0.8,
    boxShadowRadius: 2,
    elevation: 15, // for Android
  },
  buttonText: {
    color: 'white',
  },
  textinput: {
    height:45,
    backgroundColor: "transparent",
    width: "100%",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    paddingLeft:30,
    marginTop: 10,
  },
});

export default VehicleIncomeExpenses;
