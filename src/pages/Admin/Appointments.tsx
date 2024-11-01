import styled from "styled-components";
import PendingIcon from "../../assets/icons/pending.svg";
import ScheduledIcon from "../../assets/icons/appointments.svg";
import CancelledIcon from "../../assets/icons/cancelled.svg";
import StatCard from "../../components/StatCard";
import { Table } from "../../components/ui/table";
import StatusBadge from "../../components/ui/status-badge";
import DropdownInput from "../../components/ui/dropdown-input";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config";
import { Appointment } from "../../types";
import { formatDate } from "../../Utils";
import CancelModal from "../../components/modals/CancelModal";
import Button from "../../components/ui/button";
const Container = styled.div`
  position: absolute;
  width: 84%;
  height: fit-content;
  min-height: 400px;
  top: 90px;
  left: 8%;
  padding-bottom: 30px;
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }

  .stat-group {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .table {
    margin-top: 5px;
  }

  .name {
    font-weight: 600;
    line-height: 20px;
  }

  .date {
    font-weight: 400;
    line-height: 20px;
  }

  .actions {
    width: 100px;
    font-weight: 600;
    .schedule {
      color: var(--green);
      cursor: pointer;
    }

    .cancel {
      color: var(--red);
      cursor: pointer;
    }
  }

  .doctor {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 32px;
      height: 32px;
    }
  }

  .filter {
    right: 0;
    margin-top: 30px;
    display: flex;
    justify-content: end;
    gap: 20px;
    font-size: 14px;
  }

  .filter > p {
    margin-top: 42px;
    font-weight: 700;
  }

  .dropdown-input input {
    width: 170px;
    font-weight: 600;
  }

  ul {
    transform: translateY(10px);
  }
`;
const timeOrder = [
  { name: "Gần đây nhất", value: "desc" },
  { name: "Cũ nhất", value: "asc" },
];

const status = [
  { name: "Đã duyệt", value: "Scheduled" },
  { name: "Chờ duyệt", value: "Pending" },
  { name: "Đã hủy", value: "Cancelled" },
];

const defaultStats = {
  scheduled: 0,
  pending: 0,
  cancelled: 0,
};
export default function AppointmentAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<
    "Scheduled" | "Pending" | "Cancelled" | undefined
  >(undefined);
  const [stats, setStats] = useState<{ [key: string]: number }>(defaultStats);
  const [modal, setModal] = useState<string>();
  const [appointment, setAppointment] = useState<Appointment>();
  const [filterRemoved, setFilterRemoved] = useState<boolean>(false);
  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    getAppointments();
  }, [order, statusFilter]);

  const getStats = () => {
    try {
      const scheduledRequest = axios.get(
        `${config.apiUrl}/Appointment/0/count`
      );
      const pendingRequest = axios.get(`${config.apiUrl}/Appointment/1/count`);
      const cancelledRequest = axios.get(
        `${config.apiUrl}/Appointment/2/count`
      );
      axios.all([scheduledRequest, pendingRequest, cancelledRequest]).then(
        axios.spread(
          (scheduledResponse, pendingResponse, cancelledResponse) => {
            const updatedStats = {
              scheduled: scheduledResponse.data,
              pending: pendingResponse.data,
              cancelled: cancelledResponse.data,
            };
            setStats(updatedStats);
          }
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/Appointment${
          statusFilter && order
            ? `?Status=${statusFilter}&Order=${order}`
            : statusFilter
            ? `?Status=${statusFilter}`
            : order
            ? `?Order=${order}`
            : ""
        }`
      );
      if (response.status === 200) {
        setAppointments(response.data as Appointment[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id: string, action: "schedule" | "cancel") => {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/Appointment/${id}/${action}`
      );
      if (response.status === 200) {
        getAppointments();
        getStats();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (appointment: Appointment) => {
    setAppointment(appointment);
    setModal("cancel");
  };

  const removeFilter = () => {
    setOrder("desc");
    setStatusFilter(undefined);
    setFilterRemoved(true);
  };
  return (
    <Container>
      {/* <h2>Xin chào, Admin</h2> */}
      <section className="stat-group">
        <StatCard
          type="scheduled"
          stat={stats["scheduled"]}
          label="Tổng số lịch đặt khám đã được duyệt"
          icon={ScheduledIcon}
        />
        <StatCard
          type="pending"
          stat={stats["pending"]}
          label="Tổng số lịch đặt khám đang chờ duyệt"
          icon={PendingIcon}
        />
        <StatCard
          type="cancelled"
          stat={stats["cancelled"]}
          label="Tổng số lịch đặt khám đã bị hủy"
          icon={CancelledIcon}
        />
      </section>
      <section className="filter">
        <p>Lọc theo:</p>
        <div>
          <DropdownInput
            type="Thứ tự"
            items={timeOrder}
            label="appointmentTime"
            labelText="Thời gian đặt khám"
            disabled={true}
            handlePick={(value: any) => {
              setOrder(value);
            }}
            value={{ name: "Gần đây nhất", value: "desc" }}
            removeValue={filterRemoved}
          />
        </div>
        <div>
          <DropdownInput
            type="Tình trạng"
            items={status}
            label="appointmentStatus"
            labelText="Tình trạng lịch khám"
            disabled={true}
            handlePick={(value: any) => {
              setStatusFilter(value);
            }}
            placeholder="Chọn tình trạng"
            removeValue={filterRemoved}
          />
        </div>
        <div style={{ display: "flex", alignItems: "end", minWidth: "140px" }}>
          <Button type="danger" onClick={removeFilter}>
            Bỏ lọc
          </Button>
        </div>
      </section>
      <section className="table">
        <Table>
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "12px" }}>Bệnh nhân</th>
              <th>Thời gian khám</th>
              <th>Tình trạng</th>
              <th>Bác sĩ</th>
              <th>Lý do khám</th>
              <th>Ghi chú</th>
              <th className="actions" style={{ borderTopRightRadius: "12px" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.map((appointment, i) => {
                return (
                  <tr className={i % 2 === 0 ? "first-row" : "second-row"}>
                    <td className="name">{appointment.patient.name}</td>
                    <td className="date">{`${formatDate(
                      appointment.appointmentDate
                    )}-(${appointment.appointmentTime})`}</td>
                    <td>
                      <StatusBadge type={appointment.status.toLowerCase()} />
                    </td>
                    <td>
                      <div className="doctor">
                        <img src={appointment.doctor.imageUrl} alt="" />
                        <span className="name">{appointment.doctor.name}</span>
                      </div>
                    </td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.note}</td>
                    <td>
                      <div className="actions">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          <span
                            className="schedule"
                            onClick={() =>
                              updateStatus(
                                appointment.appointmentId,
                                "schedule"
                              )
                            }
                          >
                            Duyệt
                          </span>
                          <span
                            className="cancel"
                            onClick={() => handleCancel(appointment)}
                          >
                            Hủy
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </section>
      {modal === "cancel" && appointment && (
        <CancelModal
          handleClick={() => {
            updateStatus(appointment.appointmentId, "cancel");
            setModal("");
          }}
        />
      )}
    </Container>
  );
}
