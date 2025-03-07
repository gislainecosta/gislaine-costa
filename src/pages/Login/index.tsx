import LoginImage from "@assets/Example.png";
import Logo from "@assets/logo.png";
import { Alert, Button } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { IUserLogin } from "../../redux/store/users/types";
import { fetchUser } from "../../redux/store/users/userSlice";
import LoginField from "../../shared/components/fields/loginField";
import * as St from "./styles";

export default function Login() {
  const navigate = useNavigate();
  const formHook = useForm<IUserLogin>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLogged, error } = useSelector((state: RootState) => state.user);

  const userLogin: SubmitHandler<IUserLogin> = async ({ email, password }) => {
    await dispatch(fetchUser({ email, password }));
  };

  useEffect(() => {
    isLogged && navigate("/monitoring");
  }, [navigate, isLogged]);

  return (
    <St.Container>
      <St.Login>
        <St.Logo src={Logo} alt="Logo" />
        <St.Title>DynaPredict</St.Title>
        <St.Form autoComplete="off" onSubmit={formHook.handleSubmit(userLogin)}>
          <section>
            <LoginField label="E-mail" formRef={{ name: "email", formHook }} />
          </section>
          <section>
            <LoginField
              label="Senha"
              formRef={{ name: "password", formHook }}
            />
          </section>
          <Button type="submit">Entrar</Button>
        </St.Form>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </St.Login>

      {window.innerWidth >= 1024 && (
        <St.LoginImage src={LoginImage} alt="Imagem modelo do sistema" />
      )}
    </St.Container>
  );
}
