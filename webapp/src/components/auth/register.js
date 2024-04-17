import React, { useState } from 'react'
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import background3 from '../../assets/images/background-3.png'
import background2 from '../../assets/images/background-1.jpg'

const RegisterPage = () => {
	const [currentImage, setCurrentImage] = useState(0)
	const images = [background3, background2]
  
	const goToImage = index => {
	  setCurrentImage(index)
	}
  
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
	<Grid container justifyContent='center' alignItems='center'>
	  <Grid item lg={8} sm={12}>
		<div className='left-content'>
		  <div className='carousel'>
			<div className='image-container'>
			  <div className='text'>
				<h1>Welcome To</h1>
				<h1>Vehicle Guardian</h1>
				<p>
				  This app is a comprehensive solution bridging the gap
				  <br />
				  between vehicle owners and repair centers, streamlining the
				  entire repair and maintenance process
				</p>
			  </div>
			  <img
                  className='image-contain'
                  src={images[currentImage]}
                  alt={`${currentImage + 1}`}
                />
                <div className='buttons'>
                  {images.map((_, index) => (
                    <button
                      id='button'
                      key={index}
                      className={index === currentImage ? 'active' : ''}
                      onClick={() => goToImage(index)}
                    ></button>
                  ))}
                </div>
			</div>
		  </div>
		</div>
	  </Grid>
	  <Grid item lg={4} sm={12}>
		<Card className='new-card'>
		  <div className='right-content'>
			<CardContent className='second-column-cardcontents'>
			<h2>Registration</h2>
            {alertMessage && (
              <Alert
                icon={<i class='fa-solid fa-check'></i>}
                severity='success'
              >
                {alertMessage}
              </Alert>
            )}
            {registrationStatus && (
              <Alert
                icon={<i class='fa-solid fa-check'></i>}
                severity='success'
              >
                {registrationStatus}
              </Alert>
            )}
            <FormControl fullWidth className='form-contain'>
              <TextField
                required
                id='username'
                label='Username'
                variant='outlined'
                className='form-field'
                margin='normal'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                required
                id='phone'
                label='Phone Number'
                variant='outlined'
                className='form-field'
                margin='normal'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <TextField
                required
                id='email'
                label='Email'
                variant='outlined'
                className='form-field'
                margin='normal'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                required
                id='password'
                label='Password'
                variant='outlined'
                type='password'
                className='form-field'
                margin='normal'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
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
              <Button variant='contained' onClick={handleRegistration}>
                Register
              </Button>
              <h3
                style={{
                  paddingLeft: '20px'
                }}
              >
                Already have an account? <a href='/login'>Sign in</a>
              </h3>
            </FormControl>
			</CardContent>
		  </div>
		</Card>
	  </Grid>
	</Grid>
  </div>
  )
}

export default RegisterPage
