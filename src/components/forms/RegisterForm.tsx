import { Wrapper } from "./LoginForm";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import PasswordIcon from "../../assets/icons/password.svg"
import Input from "../ui/input";
import Button from "../ui/button";
import { Control, Controller, ControllerFieldState, ControllerRenderProps, FormState, UseFormHandleSubmit, UseFormStateReturn } from "react-hook-form";
import { RegisterInput } from "../../types";
import { validateEmail, validatePhoneNumber } from "../../Utils";

interface RegisterFormProps {
  control: Control<RegisterInput>;
  onClick: () => void;
  formState: FormState<RegisterInput>;
  handleSubmit: UseFormHandleSubmit<RegisterInput>;
}
export default function RegisterForm({ control, onClick, formState, handleSubmit }: RegisterFormProps) {
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
                    rules={{validate: validateEmail}}
                    render={({
                        field,                                   
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
                          error={formState.errors.email?.message}
                        />
                      )}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    rules={{validate: validatePhoneNumber}}
                    render={({
                        field,                                
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
                          error={formState.errors.phoneNumber?.message}
                        />
                      )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Mật khẩu phải được cung cấp' }}
                    render={({
                        field,                                  
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
                          error={formState.errors.password?.message}
                        />
                      )}
                />
            </form>
            <footer>
                <Button onClick={handleSubmit(onClick)}>Đăng ký</Button>
            </footer>
        </Wrapper>
            
    )
}