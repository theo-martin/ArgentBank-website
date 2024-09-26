import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../components/api";

const User = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [newUsername, setNewUsername] = useState("");
  const { data } = api.useGetProfileQuery();
  const { dataEdit, refetch } = api.useUpdateProfileMutation();
  const lastName = data?.body.lastName;
  const firstName = data?.body.firstName;
  const userName = data?.body.userName;
  //   const userNameEdit = dataEdit?.body.userName;
  console.log("data", data);
  console.log("Username:", firstName, lastName);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(
    dataEdit?.body?.userName || ""
  ); // Initialiser avec la valeur initiale
  // ...

  useEffect(() => {
    // Plus besoin de mettre à jour newUsername ici
  }, [data]);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUsername = () => {
    api
      .updateProfile({ userNameEdit: newUsername })
      .then(() => {
        setIsModalOpen(false);
        refetch(); // Refetch
      })
      .catch((error) => {
        console.error("erreur modification username:", error);
      });
  };

  return (
    <>
      <Header
        connexion="main-nav-item display-none "
        deconnexion="main-nav-item display-flex cursor"
        name={userName}
      />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <label htmlFor="new-username">New Username:</label>
                <input
                  type="text"
                  id="new-username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleUpdateUsername}>Save</button>  
                <button onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;
