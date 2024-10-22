import styled from "styled-components";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Control, Controller } from "react-hook-form";
import { PatientProfileForm } from "../../pages/Patient/PatientProfile";

const Wrapper = styled.div`
    h2 {
        font-size: 1.6rem;
        color: var(--white-text-color);
        margin-bottom: 20px;
    }

    form {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 18px;
    }
`

export default function MedicalInfoForm({ control }: { control: Control<PatientProfileForm> }) {
    return (
        <Wrapper>
            <h2>Thông tin y tế</h2>
            <form>
                <Controller
                    name="insuranceNumber"
                    control={control}
                    defaultValue=""
                    render={({
                        field               
                      }) => (
                        <Input 
                            {...field}
                            label="InsuranceNumber" 
                            labelText="Số bảo hiểm y tế" 
                            placeholder="HS4010120878843"/>
                      )}
                />
                <div className="flex-container">
                    <Controller
                    name="allergies"
                    control={control}
                    defaultValue=""
                    render={({
                        field}) => (
                            <Textarea value={field.value} onChange={field.onChange} name="Allergies" labelText="Dị ứng"/>
                        )}
                    />
                    <Controller
                    name="currentMedications"
                    control={control}
                    defaultValue=""
                    render={({
                        field}) => (
                            <Textarea value={field.value} onChange={field.onChange} name="CurrentMedications" labelText="Các loại thuốc đang sử dụng"/>
                        )}
                    />
                </div>
                    <Controller
                    name="pastMedicalHistory"
                    control={control}
                    defaultValue=""
                    render={({
                        field}) => (
                            <Textarea value={field.value} onChange={field.onChange} name="PastMedicalHistory" labelText="Tiền sử bệnh lý"/>
                        )}
                    />
            </form>
        </Wrapper>
    )
}