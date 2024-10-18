import { Wrapper } from "./LoginForm";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import PasswordIcon from "../../assets/icons/password.svg"
import Input from "../ui/input";
import Button from "../ui/button";
import { Control, Controller, ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from "react-hook-form";
import { RegisterInput } from "../../types";


export default function RegisterForm({control, onClick}: {control: Control<RegisterInput>, onClick: () => void}) {
    return (
        <Wrapper>
            <header>
                    <h2>Xin chào,</h2>
                    <span id="description">Xin hãy cung cấp một số thông tin để tạo tài khoản.</span>
            </header>
            <form>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({
                        field,                    
                        fieldState: { error },   
                        formState                
                      }: {
                        field: ControllerRenderProps<RegisterInput, 'email'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<RegisterInput>
                      }) => (
                        <Input
                          {...field}
                          type="email"
                          label="email"
                          labelText="Email"
                          placeholder="john_wales@gmail.com"
                          icon={EmailIcon}
                        />
                      )}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({
                        field,                    
                        fieldState: { error },   
                        formState                
                      }: {
                        field: ControllerRenderProps<RegisterInput, 'phoneNumber'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<RegisterInput>
                      }) => (
                        <Input
                          {...field}
                          type="tel"
                          label="phoneNumber"
                          labelText="Số điện thoại"
                          placeholder="0342 045 334"
                          icon={PhoneIcon}
                        />
                      )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({
                        field,                    
                        fieldState: { error },   
                        formState                
                      }: {
                        field: ControllerRenderProps<RegisterInput, 'password'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<RegisterInput>
                      }) => (
                        <Input
                          {...field}
                          type="password"
                          label="password"
                          labelText="Mật khẩu"
                          icon={PasswordIcon}
                        />
                      )}
                />
            </form>
            <footer>
                <Button onClick={onClick}>Đăng ký</Button>
            </footer>
        </Wrapper>
            
    )
}