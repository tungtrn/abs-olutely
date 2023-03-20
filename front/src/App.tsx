import "./App.css";

import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./app/routes/routes";
import { logout, setUser } from "./app/reducer/authSlice";
import { useAppDispatch } from "./app/hooks/hooks";
import { auth } from "./app/firebase-config";
import { User } from "./app/models/User";
import theme from "./app/theme/theme";
import { RootState } from "./app/stores/store";
import { connect, ConnectedProps } from "react-redux";

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
