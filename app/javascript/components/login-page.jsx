import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../graphql/login-mutation.ts";
import toaster from "toasted-notes";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginToApp] = useMutation(login);

  const handleLogin = () => {
    loginToApp({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((mutationReturn) => {
        if (mutationReturn.data.login.error) {
          toaster.notify(
            () => (
              <div
                style={{
                  marginTop: 15,
                  borderRadius: 20,
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#45D0C1",
                    display: "flex",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: "20px 20px 0px 0px",
                  }}
                >
                  <img
                    src={require("../../assets/images/horizontal_logo.png")}
                  />
                </div>
                <center
                  style={{
                    padding: "17px",
                    background: "#FFFFFF",
                    borderRadius: "0px 0px 20px 20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Ops... Algo deu errado
                  </div>
                  <div style={{ fontSize: 15 }}>Sua senha está incorreta</div>
                </center>
              </div>
            ),
            {
              position: "top",
              duration: 2000,
            }
          );
        } else {
          window.location.href = "../";
        }
      })
      .catch(() => {
        toaster.notify(
          () => (
            <div
              style={{
                marginTop: 15,
                borderRadius: 20,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#45D0C1",
                  display: "flex",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: "20px 20px 0px 0px",
                }}
              >
                <img src={require("../../assets/images/horizontal_logo.png")} />
              </div>
              <center
                style={{
                  padding: "17px",
                  background: "#FFFFFF",
                  borderRadius: "0px 0px 20px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Ops... Algo deu errado
                </div>
                <div style={{ fontSize: 15 }}>
                  Esse usuário não foi encontrado.
                </div>
              </center>
            </div>
          ),
          {
            position: "top",
            duration: 2000,
          }
        );
      });
  };

  return (
    <center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "50px",
          width: "50%",
        }}
      >
        <img src={require("../../assets/images/logo_verde.svg")} />
        <div
          style={{
            marginTop: 100,
            marginBottom: 8,
            textAlign: "initial",
          }}
        >
          E-mail
        </div>
        <input
          style={{
            borderRadius: 5,
            border: "1px solid rgb(223, 226, 231)",
            minHeight: 45,
            marginBottom: 20,
          }}
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target?.value);
          }}
          placeholder="Insira seu e-mail"
        />
        <div
          style={{
            marginBottom: 8,
            textAlign: "initial",
          }}
        >
          Senha
        </div>
        <input
          style={{
            borderRadius: 5,
            border: "1px solid rgb(223, 226, 231)",
            minHeight: 45,
            marginBottom: 20,
          }}
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target?.value);
          }}
          placeholder="Insira sua senha"
        />
        <button
          style={{
            background: "rgb(67, 208, 194)",
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            border: 0,
            minHeight: 45,
            cursor: email === "" || password === "" ? "not-allowed" : "pointer",
          }}
          disabled={email === "" || password === ""}
          onClick={handleLogin}
        >
          <b>Acessar</b>
        </button>
        <Link
          to="/signup"
          style={{
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          Primeiro acesso?
        </Link>
      </div>
    </center>
  );
};

export default LoginPage;
