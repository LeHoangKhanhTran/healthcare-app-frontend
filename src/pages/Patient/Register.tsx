import RegisterForm from "../../components/forms/RegisterForm";
import { Container } from "../Login";
import Image from "../..//assets/images/register.png";
import { useState } from "react";
import OtpModal from "../../components/modals/OtpModal";
import { RegisterInput } from "../../types";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../Config";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { control, handleSubmit, getValues, formState } =
    useForm<RegisterInput>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await axios.post(`${config.apiUrl}/User/register`, data);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const activateOtp = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/verify-otp?PhoneNumber=${getValues("phoneNumber")}`
      );
      if (response.status === 200) {
        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="form">
        <RegisterForm
          control={control}
          onClick={activateOtp}
          formState={formState}
          handleSubmit={handleSubmit}
        />
      </div>
      <img id="main-img" src={Image} />
      {openModal && (
        <OtpModal
          phoneNumber={getValues("phoneNumber")}
          onClick={handleSubmit(onSubmit)}
        />
      )}
    </Container>
  );
}
