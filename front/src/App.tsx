import './App.css';

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './app/routes/routes';
import { RootState } from './app/stores/store';

const mapStateToProps = (state: RootState) => ({
	token: state.auth.token || null,
  });
  
  const connector = connect(mapStateToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;
  
  function App({token}: PropsFromRedux) {
	// Attach token to axios header
// 	useEffect(()=>{
// 	  axios.defaults.headers['Authorization'] = "Bearer " + token;
//   },[ token ] );

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default connector(App);
