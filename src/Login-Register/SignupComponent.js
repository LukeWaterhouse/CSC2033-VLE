import React from 'react';

const login = (props) => {

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
        setEmailError
    } = props;

    return(
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
            </div>
            <label>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="errorMsg">{passError}</p>
            <div className="btnContainer">
                {hasAccount ? (
                    <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignup}>Sign Up</button>
                        <p>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </>
                )}
            </div>

        </section>
    )

}

export default login;
