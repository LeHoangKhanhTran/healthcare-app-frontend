import styled from "styled-components";
import Input from "../ui/input";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import Button from "../ui/button";
import PasswordIcon from "../../assets/icons/password.svg"
import { Control, Controller, ControllerFieldState, ControllerRenderProps, FormState, UseFormGetValues, UseFormStateReturn } from "react-hook-form";
import { LoginInput } from "../../types";
import { validateEmail, validatePhoneNumber } from "../../Utils";

export const Wrapper = styled.div`
    header {
        margin-bottom: 35px;
    }

    h2 {
        font-size: 1.6rem;
        margin-block-end: 12px;
        color: var(--white-text-color);
    }

    #description {
        font-size: .9rem;
        color: var(--grey-text-color)
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    footer {
        margin-top: 40px;
    }
`
interface LoginFormProps {
  control: Control<LoginInput>;
  onClick: () => void;
  formState: FormState<LoginInput>;
  getValues: UseFormGetValues<LoginInput>;
}
export default function LoginForm({control, onClick, formState, getValues}: LoginFormProps) {
  const validateOptionalEmail = (value: string) => {
    if (value) validateEmail(value)
    if (!value && !getValues("phoneNumber")) return "Phải cung cấp email hoặc số điện thoại"
  }
  const validateOptionalPhoneNumber = (value: string) => {
    if (value) validatePhoneNumber(value)
    if (!value && !getValues("email")) return "Phải cung cấp email hoặc số điện thoại"
    return true;
  }
  return (
        <Wrapper>
            <header>
                <h2>Xin chào,</h2>
                <span id="description">Xin hãy đăng nhập trước khi tiếp tục.</span>
            </header>
            <form>
            <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{validate: validateOptionalEmail}}
                    render={({
                        field                
                      }: {
                        field: ControllerRenderProps<LoginInput, 'email'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<LoginInput>
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
                    rules={{validate: validateOptionalPhoneNumber}}
                    render={({
                        field           
                      }: {
                        field: ControllerRenderProps<LoginInput, 'phoneNumber'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<LoginInput>
                      }) => (
                        <Input
                          {...field}
                          type="tel"
                          label="phoneNumber"
                          labelText="Hoặc số điện thoại"
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
                        field              
                      }: {
                        field: ControllerRenderProps<LoginInput, 'password'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<LoginInput>
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
                <Button onClick={onClick}>Đăng nhập</Button>
            </footer>
        </Wrapper>
    )
}