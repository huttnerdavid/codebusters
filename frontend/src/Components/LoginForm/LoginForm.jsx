import { useState } from "react";
import "./LoginForm.css";
import { setToken } from "../../Cookies/cookies";
import { useNavigate } from "react-router-dom";

export default function LoginForm({setIsLoggedIn}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);
    const navigate = useNavigate();

    let onSubmit = (e) => {
        e.preventDefault();

        let login = { email, password };

        fetch(`Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Invalid login credentials");
            }
        })
        .then(res => {
            setToken(res.token);
            setIsLoggedIn(true);
            navigate("/");
        })
        .catch(error => {
            setInvalidLogin(true);
            console.error("Login error:", error);
        });
    }

    return (
        <div className="login-container">
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email" 
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    minLength="6"
                    onChange={(e) => setPassword(e.target.value)}
                    required>
                    
                    </input>

                <button type="submit" className="login-s-btn">Login</button>
            </form>

            { invalidLogin && <p>Invalid e-mail address or password</p>}
        </div>
    );
}
