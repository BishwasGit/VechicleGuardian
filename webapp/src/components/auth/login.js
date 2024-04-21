import React, { useState } from 'react'
import './css/login.css'
import { FormControl, FormControlLabel, Checkbox } from '@mui/material'
import TextField from '@material-ui/core/TextField'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [dialogVisible, setDialogVisible] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/login`,
        { username, password },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = response.data
      console.log('data after login success', data)
      if (response.status === 200) {
        localStorage.setItem('userToken', data.token)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('userType', data.userType)
        if (
          (data.userType === 'customer') | (data.userType === 'repaircenter') ||
          data.userType === 'repaircenter_workers'
        ) {
          // Navigate based on userType
          setTimeout(() => {
            navigate(
              data.userType === 'customer'
                ? `/customerDashboard/${data.userId}`
                : data.userType === 'repaircenter'
                ? `/repairCenterDashboard/${data.userId}`
                : `/workerDashboard/${data.userId}`,
              { [`${data.userType}_id`]: data.userId }
            )
          }, 1000)
        } else if (data.userType === 'admin') {
          // Navigate to AdminDashboard
          setDialogVisible(true)
          setTimeout(() => {
            setDialogVisible(false)
            navigate(`/adminDashboard/${data.userId}`, {
              admin_id: data.userId
            })
          }, 1000)
        } else if (data.userType === 'seller') {
          setTimeout(() => {
            setDialogVisible(false)
            const userId = data.userId
            const redirectUrl = `http://127.0.0.1:8000/dashboard/${userId}`
            window.location.href = redirectUrl
          }, 1000)
        }
      } else {
        setMessage(data.error)
      }
    } catch (error) {
      console.error('Error during login:', error)
      setMessage('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='main'>
        <div className='form'>
          <div>
            <FormControl fullWidth className='form'>
              <p>
                <span style={{ fontSize: 30, fontWeight: 'bold' }}>
                  Welcome Back !!!
                </span>
              </p>
              <TextField
                required
                id='username'
                label='Enter your Username'
                variant='standard'
                className='form-field'
                margin='normal'
                value={username}
                onChange={e => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: '#dcdcdc' } }} // Adjust the color as needed
              />

              <TextField
                required
                id='password'
                label='Enter your Password'
                variant='standard'
                type='password'
                className='form-field'
                margin='normal'
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: '#dcdcdc' } }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='Remember Me'
                style={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}
              />
              <Button
                className='submit'
                variant='contained'
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
              <h4>or you can sign up with</h4>
              <div className='iconDiv'>
                <Button
                  variant='contained'
                  onClick={handleLogin}
                  className='submitAnother'
                  sx={{
                    '& .MuiButton-startIcon': {
                      minWidth: 0,
                      marginRight: '-5px',

                    }
                  }}
                  startIcon={
                    <i class='fa fa-facebook' style={{ fontSize: '25px' }} />
                  }
                ></Button>

                <Button
                  variant='contained'
                  onClick={handleLogin}
                  className='submitAnother'
                  sx={{
                    '& .MuiButton-startIcon': {
                      minWidth: 0,
                      marginRight: '-5px',

                    }
                  }}
                  startIcon={
                    <i class='fa fa-google' style={{ fontSize: '25px' }} />
                  }
                ></Button>
                <Button
                  variant='contained'
                  onClick={handleLogin}
                  className='submitAnother'
                  sx={{
                    '& .MuiButton-startIcon': {
                      minWidth: 0,
                      marginRight: '-5px',

                    }
                  }}
                  startIcon={
                    <i class='fa fa-apple' style={{ fontSize: '25px' }} />
                  }
                ></Button>
              </div>
              <h4
                style={{
                  paddingLeft: '20px'
                }}
              >
                Don't have a account? <a href='/register'>Register Here</a>
              </h4>

              {message && <p>{message}</p>}
              {dialogVisible && <CircularProgress />}
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
