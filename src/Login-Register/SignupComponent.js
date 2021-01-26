import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function SignupComponent(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    setEmailError,
    passError,
    setPassError,
    accountDetails,
    adminPass,
    setAdminPass,
    username,
    setUsername,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <label color="grey">Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
      </div>
      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="errorMsg">{passError}</p>

      <div className="SignupContainer">
        {hasAccount ? (
          <>
            <button onClick={handleLogin}>Sign In</button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
            </p>
          </>
        ) : (
          <>
            <label>Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <p />

            <label>Admin</label>
            <input type="text" onChange={(e) => setAdminPass(e.target.value)} />
            <p className="admin">
              If you require an admin account, enter the extra password given to
              you by your IT technician. Else ignore this input.
            </p>

            <button onClick={handleSignup}>Sign Up</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default SignupComponent;
