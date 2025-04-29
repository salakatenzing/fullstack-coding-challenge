import React from "react";
import { useHistory, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"; // Import the Dashboard component

export const ProtectedRoute = ({ token }) => {
    const navigate = useHistory();

    if (!token) {
        // Redirect to login if no token is found
        navigate.push('/login');
    }

    // If token exists, render the children components
    return (
        <>
            <Route path="/dashboard" >
                <Dashboard token={token} />
            </Route>
        </>
    );
}