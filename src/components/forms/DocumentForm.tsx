import styled from "styled-components";
import Input from "../ui/input";
import DropdownInput from "../ui/dropdown-input";
import Button from "../ui/button";
import FileUploader from "../FileUploader";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";
import config from "../../Config";
import axios, { AxiosError } from "axios";

const Wrapper = styled.div`
    height: fit-content;
    form {
        display: flex;
        flex-direction: column;
        gap: 24px; 
    }

    footer {
        margin-top: 40px;
    }
`
const types = [
    {name: "Tài liệu y tế", value: 0},
    {name: "Tài liệu hành chính", value: 1},
    {name: "Chứng minh thư", value: 2},
    {name: "Tài liệu khác", value: 3}
]
type Document = {
    documentType: 0 | 1 | 2 | 3,
    documentName: string,
    document: File
}
export default function DocumentForm({ profileId, onClick }: { profileId: string, onClick: () => void}) {
    const { handleSubmit, control, setValue } = useForm<Document>();
    const onSubmit = async (data: Document) => {
        try {
            const formData = new FormData();
            formData.append('DocumentType', data.documentType.toString());
            formData.append('DocumentName', data.documentName);
            formData.append('Document', data.document);
            const response = await axios.patch(`${config.apiUrl}/PatientProfile/${profileId}/documents`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                console.log(onClick)
                onClick();
            }
        }
        catch(error) {
            console.log((error as AxiosError).message)
        }
    }
    return (
        <Wrapper>
            <form>
                <DropdownInput type="Loại tài liệu" label="specialty" labelText="Loại tài liệu" placeholder="Chọn loại tài liệu" disabled={true} items={types} handlePick={(value: any) => {setValue("documentType", value)}}/>
                <Controller
                    name="documentName"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                        field: ControllerRenderProps<Document, 'documentName'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<Document>
                      }) => (
                        <Input {...field} label="DocumentName" labelText="Tên tài liệu" placeholder="Vd: Thẻ bảo hiểm y tế"/>
                      )}
                    />
                <label>
                    Tài liệu
                    <Controller
                    name="document"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <FileUploader {...field} description={"file có định dạng jpeg, png hoặc pdf"} onFileSelect={(file: File) => {onChange(file)}}/>)}
                    />   
                </label>
            </form>
            <footer>
                <Button onClick={handleSubmit(onSubmit)}>Thêm tài liệu</Button>
            </footer>
        </Wrapper>
    )
}