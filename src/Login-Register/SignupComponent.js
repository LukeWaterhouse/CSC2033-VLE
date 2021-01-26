import React from "react";
import "./Login.css";

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
    passError,
    setAdminPass,
    setUsername,
  } = props;

  return (
    <section className="login" style={{ backgroundColor: "#212121" }}>
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
              <button className="buttonLogin" onClick={handleLogin}>
                Sign In
              </button>
              <p style={{ marginTop: "10px" }}>
                Don't have an account?{" "}
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    marginLeft: "5px",
                    color: "yellow",
                    transition: "all 400ms ease-in-out",
                  }}
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <label>Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p />

              <label>Admin</label>
              <input
                type="text"
                onChange={(e) => setAdminPass(e.target.value)}
              />
              <p className="admin">
                If you require an admin account, enter the extra password given
                to you by your IT technician. Else ignore this input.
              </p>

              <button className="buttonLogin" onClick={handleSignup}>
                Sign Up
              </button>
              <p style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    marginLeft: "5px",
                    color: "yellow",
                    transition: "all 400ms ease-in-out",
                  }}
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default SignupComponent;
