import React from 'react';
import { useHistory } from 'react-router-dom';

export const Logout = () => {
    const history = useHistory();
    function onClick() {
        history.push("/");
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Council Member Login</h2>
                <form className="login-form">
                    <h3 className="login-title">You are loggged out.</h3>
                    <button type="button" onClick={onClick} className="login-button">Log back in</button>
                </form>
            </div>
        </div>
    )
}