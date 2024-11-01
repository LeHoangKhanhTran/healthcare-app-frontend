import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UploadIcon from "../assets/icons/upload.svg";
import { useCallback, useState } from "react";
import PdfImage from "../assets/images/pdf.png";
const Wrapper = styled.section`
  width: 100%;
  min-width: 390px;
  padding: 22px 24px;
  background: var(--input-bg-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--input-holder-color);
  border: 1px dashed var(--grey-border-color);
  border-radius: 8px;
  p {
    width: 330px;
    text-align: center;
    font-weight: 400;
    line-height: 20px;
  }
  span {
    color: var(--green);
  }
  .file-img {
    border-radius: 5px;
    width: 70px;
  }
`;
export default function FileUploader({
  description,
  onFileSelect,
  defaultImg,
}: {
  onFileSelect: (file: File) => void;
  defaultImg?: string;
  description?: string;
}) {
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps } = useDropzone({ onDrop, multiple: false });

  return (
    <Wrapper {...getRootProps()}>
      {!file && !defaultImg && <img src={UploadIcon} alt="upload icon" />}
      {!file && defaultImg && <img className="file-img" src={defaultImg} />}
      {file && file.type.startsWith("image/") && (
        <img className="file-img" src={URL.createObjectURL(file)} />
      )}
      {file && !file.type.startsWith("image/") && (
        <img className="file-img" src={PdfImage} />
      )}
      <p>
        <span>Nhấn để đăng tải</span> hoặc kéo thả {description}
      </p>
    </Wrapper>
  );
}
