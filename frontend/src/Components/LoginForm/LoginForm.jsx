import { useState } from "react";
import { setToken } from "../../Cookies/cookies";
import { Link, useNavigate } from "react-router-dom";

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
            localStorage.setItem("role", res.role);
            localStorage.setItem("email", res.email);
            console.log(res);
            console.log(res.role);
            navigate("/");
        })
        .catch(error => {
            setInvalidLogin(true);
            console.error("Login error:", error);
        });
    }

    return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
              At Codebusters, we're revolutionizing project management with our cutting-edge
              Constructor Manager app, putting the user in control. Streamline your construction projects
              effortlessly, ensuring efficiency and collaboration every step of the way.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={onSubmit}>

                    <div className="form-outline mb-4">
                      <input 
                        type="email"
                        id="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="example@example.com"
                        />
                      <label className="form-label" htmlFor="email">Email address</label>
                    </div>
            
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        minLength="6"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>
        
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Sign in
                    </button>
              
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" defaultChecked />
                      <label className="form-check-label" htmlFor="form2Example33">
                        Subscribe to our newsletter
                      </label>
                    </div>
      
                    <div className="text-center">
                      <p>or register here:</p>
                      <Link to="/registration">
                        <button type="button" className="btn btn-primary btn-floating mb-4">
                          Register
                        </button>
                      </Link>    
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
