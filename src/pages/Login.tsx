import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Button, Input, useToaster, Notification, Message } from "rsuite";
import {Axios} from '../utils/axios'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  // UseStates
  const [values, setValues]:any = useState({});
  const navigate = useNavigate()

  // FunctionSetValues
  const setValuesOnchange = (field: string, value: any) => {
    return setValues({ ...values, [`${field}`]: value });
  };

  const validateEmail = (email: string) => {
    const validate = /\S+@\S+\.\S+/;

    return validate.test(email)
  }

  const isAuthLogged = () => {
    if(validateEmail(values.user_email) == false){
      toast.error('Email invalido!',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        theme: 'colored'
      })
      return;
    }
    if(!values.user_password){
      toast.error('Ops.... Faltou a senha!',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        theme: 'colored'
      })
      return;
    }

    Axios
      .post('/api/auth/authenticated',{
        data: {...values}
      })
      .then((res) =>{
        localStorage.setItem('token', res.data.response.token);
        localStorage.setItem('menu', JSON.stringify(res.data.response.menus))
        // setUserAuth({user: res.data.response.user, menu: res.data.response.menu, isAuth: true})
        toast.success(res.data.success,{
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          theme: 'colored'
        })
        setTimeout(() => {
          navigate('/dashboard')
        },2500)
      })
      .catch((e) => {
        if(e.response.data.error){
          const error = e.response.data.error
          for(const message of error) {
            toast.error(message,{
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              theme: 'colored'
            })
          }
        }
      })


  };
  return (
    <>
      <div className="main-login">
        <div className="left-login">
          <h1>Faça o Login</h1>
          <img
            src="/astronauta.svg"
            className="left-image"
            alt="astronauta animacao"
          ></img>
        </div>
        <div className="right-login">
          <div className="card-login">
            <h2>Login</h2>
            <div className="text-field">
              <label>Usuário</label>
              <Input
                placeholder="Digite seu email"
                type="email"
                onChange={(value) => setValuesOnchange("user_email", value)}
              />
            </div>
            <div className="text-field">
              <label>Senha</label>
              <Input
                placeholder="Senha"
                type="password"
                onChange={(value) => setValuesOnchange("user_password", value)}
              />
            </div>
            <Button
              color="green"
              appearance="primary"
              block
              onClick={() => isAuthLogged()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
export default Login;
