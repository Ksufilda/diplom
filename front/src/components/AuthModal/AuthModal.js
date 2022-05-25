import React, { useState } from "react";
import { loginUser, registerUser } from "../../api/queries";
import "./AuthModal.css";

export default function AuthModal({ finishAuth }) {
  const [authState, setAuthState] = useState("login");

  function switchLogin(params) {
    setAuthState(authState === "login" ? "register" : "login");
  }

  function login(event) {
    event.preventDefault();
    const login = event.target[0].value;
    const password = event.target[1].value;
    loginUser({
      password,
      login,
    })
      .then((res) => {
        document.cookie = "timeKey=" + res.rows[0];
        finishAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function register(event) {
    event.preventDefault();

    const cookie = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    document.cookie = "timeKey=" + cookie;
    const login = event.target[1].value;
    const password = event.target[2].value;
    const name = event.target[0].value;

    registerUser({
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      name,
      login: login,
      password: password,
      timeKey: cookie,
    })
      .then((res) => {
        finishAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="auth-modal-container">
      <div className="auth-modal">
        <div className="form-container">
          {authState === "register" ? (
            <form onSubmit={register} class="card-form">
              <div class="input">
                <input type="text" class="input-field" required />
                <label class="input-label">Ваше имя</label>
              </div>
              <div class="input">
                <input type="text" class="input-field" required />
                <label class="input-label">Email</label>
              </div>
              <div class="input">
                <input type="password" class="input-field" required />
                <label class="input-label">Пароль</label>
              </div>
              <div class="action">
                <button class="action-button">Регистрация</button>
              </div>
            </form>
          ) : (
            <form onSubmit={login} class="card-form">
              <div class="input">
                <input type="text" class="input-field" required />
                <label class="input-label">Email</label>
              </div>
              <div class="input">
                <input type="password" class="input-field" required />
                <label class="input-label">Пароль</label>
              </div>
              <div class="action">
                <button class="action-button">Логин</button>
              </div>
            </form>
          )}

          <div class="card-info">
            <p>
              При регистрации вы соглашаетесь с нашими условиями{" "}
              <a href="#">а их у нас и нет</a>
            </p>
            <a className="link-button" onClick={switchLogin}>
              {authState === "login" ? "Регистрация" : "Логин"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
