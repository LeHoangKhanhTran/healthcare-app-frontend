import styled from "styled-components";
import PendingBg from "../assets/images/pending-bg.png";
import ScheduledBg from "../assets/images/appointments-bg.png";
import CancelledBg from "../assets/images/cancelled-bg.png";
const background = {
  scheduled: ScheduledBg,
  pending: PendingBg,
  cancelled: CancelledBg,
} as { [key: string]: string };
const Wrapper = styled.div<{ type: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 152px;
  padding: 24px;
  border: 1px 0 0 0;
  border-radius: 12px;
  letter-spacing: 0.15px;
  background: url(${(props) => background[props.type]});
  background-repeat: no-repeat;
  background-size: cover;
  .stat-container {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 32px;

    span {
      line-height: 40px;
      font-weight: 700;
    }
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    line-height: 24px;
  }
`;
interface StatCardProps {
  type: "scheduled" | "pending" | "cancelled";
  stat: number;
  label: string;
  icon: string;
}
export default function StatCard({ type, stat, label, icon }: StatCardProps) {
  return (
    <Wrapper type={type}>
      <div className="stat-container">
        <img src={icon} alt="" />
        <span>{stat}</span>
      </div>
      <p className="stat-label">{label}</p>
    </Wrapper>
  );
}
