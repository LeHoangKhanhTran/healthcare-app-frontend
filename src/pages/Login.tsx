import LoginForm from "../components/forms/LoginForm"
import styled from "styled-components";
import Image from "../assets/images/onboarding-img.png";
import { useUserContext } from "../UserContextProvider";
import { LoginInput, User } from "../types";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../Config";
import { useNavigate } from "react-router-dom";
export const Container = styled.div`
    #main-img {
      width: 40%;
    }

    .form {
      position: absolute;
      top: 140px;
      left: 260px;
      width: 30%;
    }
`
export default function Login({ setRole }: {setRole: React.Dispatch<React.SetStateAction<string | undefined>>}) {
  const { control, handleSubmit } =  useForm<LoginInput>();
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await axios.post(`${config.apiUrl}/User/login`, data, {withCredentials: true, headers: { "Content-Type": "application/json" }});
      if (response.status === 200) {
        const userResponse = await axios.get(`${config.apiUrl}/User/me`, {withCredentials: true});
        if (userResponse.status === 200) {
          const user = userResponse.data as User
          setUser(user);
          setRole(user.role);
          if (user.role === "Patient") navigate("/history");
          else if (user.role === "Admin") navigate("/admin/appointments")
        }
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="form">
        <LoginForm control={control} onClick={handleSubmit(onSubmit)}/>
      </div>
      <img id="main-img" src={Image}/>
    </Container>
  )
}