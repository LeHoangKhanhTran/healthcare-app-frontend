import styled from "styled-components";
import CheckIcon from "../../assets/icons/check.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import CancelledIcon from "../../assets/icons/cancelled.svg";

const map = {
  scheduled: {
    color: "green",
    img: CheckIcon,
    text: "Đã duyệt",
  },
  pending: {
    color: "blue",
    img: PendingIcon,
    text: "Chờ duyệt",
  },
  cancelled: {
    color: "red",
    img: CancelledIcon,
    text: "Đã hủy",
  },
} as { [key: string]: { color: string; img: string; text: string } };

const Wrapper = styled.div<{ type: Status["type"] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  width: 100px;
  max-height: fit-content;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 16px;
  color: ${(props) => `var(--${map[props.type].color})`};
  background: ${(props) => `var(--bg-${map[props.type].color})`};
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`;

interface Status {
  type: string;
}

export default function StatusBadge({ type }: Status) {
  return (
    <Wrapper type={type}>
      <img width="12px" height="12px" src={map[type].img} alt="status-icon" />
      <span>{map[type].text}</span>
    </Wrapper>
  );
}
