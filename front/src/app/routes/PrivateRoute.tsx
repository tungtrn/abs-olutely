import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../stores/store";

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.auth.isLoggedIn || false,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PrivateRoute({ isLoggedIn, children }: PropsFromRedux & { children: React.ReactNode }) {
  return isLoggedIn ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <React.Fragment>
      <Navigate to="/login" />
    </React.Fragment>
  );
}

export default connector(PrivateRoute);