import React, { useEffect, useState } from "react";
import { getEmailCode, loginUser, registerUser } from "../../api/queries";
import "./AuthModal.css";
import logo from "../../assets/logo.svg";
export default function AuthModal({ finishAuth }) {
  const [authState, setAuthState] = useState("login");
  const [error, setError] = useState([]);
  const [emailCode, setEmailCode] = useState();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registartionEvent, setRegistartionEvent] = useState(false);

  function switchLogin() {
    setError([]);

    setAuthState(authState === "login" ? "register" : "login");
  }

  function checkField(type, value) {
    console.log(type, value);
    setError(error?.filter((el) => el.type !== type));
    if (!value.length) return true;
    const newErr = error?.filter((el) => el.type !== type);

    switch (type) {
      case "email":
        if (
          !String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          setError([...newErr, { msg: "Неверный э-мэйл", type }]);
          return false;
        }
        break;
      case "password":
        if (
          !String(value)
            .toLowerCase()
            .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ) {
          console.log(
            value.length > 16 || value.length < 6,
            value.search(/[a-z]/) < 0,
            value.search(/[0-9]/) < 0,
            value.search(/[!@#$%^&*]/) < 0
          );

          if (value.search(/[a-z]/) < 0)
            setError([
              ...newErr,
              { msg: "В пароле должна быть хоть одна буква", type },
            ]);
          else if (value.search(/[0-9]/) < 0)
            setError([
              ...newErr,
              { msg: "В пароле должна быть хоть одна цифра", type },
            ]);
          else if (value.search(/[!@#$%^&*]/) < 0)
            setError([
              ...newErr,
              { msg: "В пароле должен быть хоть один символ !@#$%^&*", type },
            ]);
          else if (value.length > 16 || value.length < 6)
            setError([
              ...newErr,
              {
                msg: "В пароле должно содержаться 6-16 символов",
                type,
              },
            ]);

          return false;
        }

        break;
      default:
        break;
    }

    return true;
  }

  function login(event) {
    event.preventDefault();
    if (!checkField("email", email) || !checkField("password", password))
      return;

    const loginLocal = event.target[0].value;
    const passwordLocal = event.target[1].value;
    loginUser({
      password: passwordLocal,
      login: loginLocal,
    })
      .then((res) => {
        const newErr = error?.filter((el) => el.type !== "email");
        if (res?.message)
          return setError([
            ...newErr,
            {
              msg: res?.message,
              type: "email",
            },
          ]);

        document.cookie = "timeKey=" + res.rows[0];
        finishAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCode() {
    if (
      !checkField("email", email) ||
      !checkField("password", password) ||
      !checkField("emailcode", "")
    )
      return;

    getEmailCode(email).then((res) => {
      console.log(res.key);
      setEmailCode(res.key);
    });

    setRegistartionEvent(true);
  }

  function register(event) {
    event.preventDefault();

    if (!registartionEvent) return getCode(event);
    const emailCodeInput = event.target[3].value;
    console.log(emailCode, Number(emailCodeInput));
    if (Number(emailCodeInput) !== emailCode) {
      const bufErr = error?.filter((el) => el.type !== "emailcode");
      setError([
        ...bufErr,
        {
          msg: "Неверный код",
          type: "emailcode",
        },
      ]);
      return;
    }

    setRegistartionEvent(false);

    const cookie = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    document.cookie = "timeKey=" + cookie;
    const loginLocal = event.target[1].value;
    const passwordLocal = event.target[2].value;
    const name = event.target[0].value;

    registerUser({
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      name,
      login: loginLocal,
      password: passwordLocal,
      timeKey: cookie,
    })
      .then((res) => {
        console.log(res);
        const newErr = error?.filter((el) => el.type !== "email");
        if (res?.message)
          return setError([
            ...newErr,
            {
              msg: res.message,
              type: "email",
            },
          ]);

        finishAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const emailError = error?.find((el) => el.type === "email")?.msg;
  const passwordError = error?.find((el) => el.type === "password")?.msg;
  const emailCodeError = error?.find((el) => el.type === "emailcode")?.msg;

  return (
    <div className="auth-modal-container">
      <div className="auth-modal">
        <div className="form-container">
          {authState === "register" ? (
            <>
              <form onSubmit={register} className="card-form">
                <div className="input">
                  <input type="text" className={`input-field`} required />
                  <label className="input-label">Ваше имя</label>
                </div>
                <div className="input">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => checkField("email", e.target.value)}
                    type="email"
                    placeholder=" "
                    className={`input-field${emailError ? " error" : ""}`}
                    required
                  />
                  <label className="input-label">Email</label>
                  {emailError && <p className="input-error">{emailError}</p>}
                </div>
                <div className="input">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    onBlur={(e) => checkField("password", e.target.value)}
                    type="password"
                    className={`input-field${passwordError ? " error" : ""}`}
                    required
                  />

                  <label className="input-label">Пароль</label>
                  {passwordError && (
                    <p className="input-error">{passwordError}</p>
                  )}
                </div>
                {!!registartionEvent && (
                  <div className="input">
                    <input type="text" className={`input-field`} required />
                    <label className="input-label">Код из email</label>
                    {emailCodeError && (
                      <p className="input-error">{emailCodeError}</p>
                    )}
                  </div>
                )}
                <div className="action">
                  <button className="action-button">
                    {!!registartionEvent ? "Регистрация" : "Отправить код"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={login} className="card-form">
              <div className="input">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => checkField("email", e.target.value)}
                  type="email"
                  className={`input-field${emailError ? " error" : ""}`}
                  required
                />
                <label className="input-label">Email</label>

                {emailError && <p className="input-error">{emailError}</p>}
              </div>
              <div className="input">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => checkField("password", e.target.value)}
                  type="password"
                  className={`input-field${passwordError ? " error" : ""}`}
                  required
                />
                <label className="input-label">Пароль</label>

                {passwordError && (
                  <p className="input-error">{passwordError}</p>
                )}
              </div>
              <div className="action">
                <button className="action-button">Логин</button>
              </div>
            </form>
          )}

          <div className="card-info">
            <a className="link-button" onClick={switchLogin}>
              {authState === "login" ? "Регистрация" : "Логин"}
            </a>
          </div>
        </div>
      </div>
      <div className="logo-animation">
        <img src={logo}></img>
      </div>
    </div>
  );
}
