import React from 'react'
import Button from '@mui/material/Button'
import { auth, setFirestoreDoc, setFirestoreUser } from '../../firebase-config'

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from 'firebase/auth'
import { Divider, Grid, Hidden, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
// import "./Login.css";
// import "../../index.css";

const styles = {
  button: {
    // alignSelf: 'center',
  },
}

function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const isNewUser = getAdditionalUserInfo(result)
        console.log(isNewUser);

        if (isNewUser) {
          const userData = {
            uid: user.uid,
            userName: user.displayName,
            profilePic: user.photoURL,
          }
          // await setFirestoreUser(user.uid, userData)
        } else {
          console.log('User already exists')
        }

        navigate('/');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      // style={{ height: '100vh' }}
      textAlign="center"
    >
      <Box sx={{ flexDirection: 'column', marginTop: '10%' }}>
        <Typography variant="h1" component="h2" gutterBottom>
          Welcome to Abs-olutely!
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Enjoy delicous meal, with AI-generated recipes curated for your plan,
          diet, and preferences.
        </Typography>
      </Box>
      <Grid
        container
        direction={'row'}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: '10%' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              Let's authenticate first!
            </Typography>
          </Box>
        </Grid>
        <Hidden mdDown>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: "thick" }} color="primary" />
        </Hidden>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Button
            variant="outlined"
            color="primary"
            onClick={signInWithGoogle}
            style={styles.button}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Sign in with Google
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
