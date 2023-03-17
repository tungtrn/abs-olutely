import "./App.css";

import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./app/routes/routes";
import { logout, setUser } from "./app/reducer/authSlice";
import { useAppDispatch } from "./app/hooks/hooks";
import { auth } from "./app/firebase-config";
import { User } from "./app/models/User";
import theme from "./app/theme/theme";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const loggedInUser: User = {
					name: user?.displayName || "",
				};

				dispatch(setUser(loggedInUser));
			} else {
				dispatch(logout);
			}
		});
		return unsubscribe;
	}, [dispatch]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
