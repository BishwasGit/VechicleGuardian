import React, { useState } from 'react'
import { TextField, Button,} from '@mui/material'
import { FormControl,FormControlLabel,Checkbox} from '@mui/material';
import axios from 'axios'
import Alert from '@mui/material/Alert'
import LoginPage from './login'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userTypes, setUserTypes] = useState({
    customer: false,
    repairCenter: false,
    repairPartsSeller: false
  })
  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [showLoginCard, setShowLoginCard] = useState(false)
  const [showRegisterCard, setShowRegisterCard] = useState(true)
  const handleLoginClick = () => {
    setShowRegisterCard(false)
    setShowLoginCard(true)
  }
  const handleRegistration = async () => {
    const formData = {
      userTypes,
      username,
      phone,
      email,
      password
    }
    console.log(formData)
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/register`,
        {
          userTypes,
          username,
          phone,
          email,
          password
        }
      )

      console.log(response.data)
      setRegistrationStatus(`Registered as ${userTypes.join(', ')}`)
      setAlertMessage(
        `Registered as ${Object.keys(userTypes)
          .filter(type => userTypes[type])
          .join(', ')}`
      )
    } catch (error) {
      console.error('Error registering:', error)
      console.error('Error registering:', error.response.data.error)
      setRegistrationStatus(`Registration failed: ${error.response.data.error}`)
      setAlertMessage(
        `Registered as ${Object.keys(userTypes)
          .filter(type => userTypes[type])
          .join(', ')}`
      )
    }
  }

  const handleUserTypeChange = type => {
    setUserTypes({ ...userTypes, [type]: !userTypes[type] })
  }

  return (
    <div className='container' maxWidth='lg'>
      <div className='right-content'>
        {showRegisterCard && 
        <CardContent className='second-column-cardcontents'>
          {alertMessage && (
            <Alert icon={<i class='fa-solid fa-check'></i>} severity='success'>
              {alertMessage}
            </Alert>
          )}
          {registrationStatus && (
            <Alert icon={<i class='fa-solid fa-check'></i>} severity='success'>
              {registrationStatus}
            </Alert>
          )}
          <FormControl fullWidth className='form'>
          <Typography variant="h4" gutterBottom><span style={{ fontSize: 24, fontWeight: 'bold' }}>Register Here</span>
          <ArrowBackIcon fontSize="large" onClick={handleLoginClick} style={{float:'right'}}/> 
          </Typography>
            <TextField
              required
              id='username'
              label='Username'
              variant='standard'
              className='form-field'
              margin='normal'
              value={username}
              onChange={e => setUsername(e.target.value)}
              InputLabelProps={{ style: { color: '#dcdcdc' } }}
            />
            <TextField
              required
              id='phone'
              label='Phone Number'
              variant='standard'
              className='form-field'
              margin='normal'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              InputLabelProps={{ style: { color: '#dcdcdc' } }}
            />
            <TextField
              required
              id='email'
              label='Email'
              variant='standard'
              className='form-field'
              margin='normal'
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: '#dcdcdc' } }}
            />
            <TextField
              required
              id='password'
              label='Password'
              variant='standard'
              type='password'
              className='form-field'
              margin='normal'
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#dcdcdc' } }}
            />
             <FormControl>
             <FormControlLabel
              control={
                <Checkbox
                  checked={userTypes.customer}
                  onChange={() => handleUserTypeChange('customer')}
                />
              }
              label='Customer'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={userTypes.repairCenter}
                  onChange={() => handleUserTypeChange('repairCenter')}
                />
              }
              label='Repair Center'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={userTypes.repairPartsSeller}
                  onChange={() => handleUserTypeChange('repairPartsSeller')}
                />
              }
              label='Repair Parts Seller'
            />
            </FormControl>
            <Button
              className='submit'
              variant='contained'
              onClick={handleRegistration}
            >
              Register
            </Button>
          </FormControl>
        </CardContent>
      }
       {showLoginCard && <LoginPage/> }
      </div>
    </div>
  )
}

export default RegisterPage
