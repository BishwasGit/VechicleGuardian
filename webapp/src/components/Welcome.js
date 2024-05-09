import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import './css/welcome.css'
import background3 from '../assets/images/bg7.jpg'
import background2 from '../assets/images/bg4.jpg'
import LoginPage from './auth/login'
import RegisterPage from './auth/register'
import { Button } from '@mui/material'


const Welcome = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [background3, background2]
  const goToImage = index => {
    setCurrentImage(index)
  }
  const [showRegisterCard, setShowRegisterCard] = useState(false)
  const [showLoginCard, setShowLoginCard] = useState(true)
  return (
    <div className='container' maxWidth='lg'>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid
          item
          lg={8}
          sm={12}
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className='left-content' style={{ zIndex: 1 }}>
            {' '}
            {/* Adjusted z-index */}
            <div className='carousel'>
              <div className='image-container'>
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
            <div
              className='overlay'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(18, 0, 128, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
            ></div>
            <div className='text'>
              <h1>Vehicle Guardian</h1>
              <h3>
                This app is a comprehensive solution bridging the gap
                <br />
                between vehicle owners and repair centers, streamlining the
                entire repair and maintenance process
              </h3>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Card className='new-card'>
            <div className='right-content'>
              <CardContent className='card'>
                {showLoginCard && <LoginPage />}
                {showRegisterCard && <RegisterPage />}
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Welcome
