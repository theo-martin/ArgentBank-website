import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducer/UserSlice"; //
import { useLoginMutation } from "../components/api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setToken } from "../reducer/authSlice";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();

    /*   const newToken = sessionStorage.getItem("token");
    dispatch(setToken(newToken)); // Mise à jour du token dans l'état
 */
    try {
      const response = await login({ email, password });
      const { token, userName, firstName, lastName } = response.data;
      console.log(response.data, "response.data");

      // Mettre à jour le token dans le sessionStorage
      sessionStorage.setItem("token", token);

      // Mettre à jour l'état de l'utilisateur dans Redux
      dispatch(
        setUser({
          token,
          userName,
          firstName,
          lastName,
        })
      );
      if (response.data.body && response.data.body.token) {
        window.sessionStorage.setItem("token", response.data.body.token);
        navigate("/user");
      }
    } catch (error) {
      console.error("Identifiant ou mots de pass incorrect"); // Gérer les erreurs de connexion de manière appropriée
      console.log(error);
    }
  };
  return (
    <>
      <Header
        connexion="main-nav-item display-flex "
        deconnexion="main-nav-item display-none"
      />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Connexion</h1>
          <form onSubmit={handleSignIn}>
            {" "}
             
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Mot   de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>{" "}
             
            <button
              className="sign-in-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Connexion"}
            </button>
            {isError && (
              <p className="error-message">
                {error.message || "Identifiant ou mots de pass incorrect"}
              </p>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
