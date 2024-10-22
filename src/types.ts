export type FormAppointment = {
    appointmentId: string,
    doctorId: string,
    patientId: string,
    appointmentDate: string,
    appointmentTime: string,
    reason: string,
    note: string
}

export type Appointment = {
    appointmentId: string,
    doctor: AppointmentDoctor,
    patient: AppointmentPatient,
    appointmentDate: string,
    appointmentTime: string,
    reason: string,
    note: string,
    status: "Scheduled" | "Pending" | "Cancelled"
}

type AppointmentDoctor = {
    doctorId: string,
    name: string,
    imageUrl: string
}

type AppointmentPatient = {
    patientId: string,
    name: string
}

export type Doctor = {
    doctorId: string,
    name: string,
    doctorInfo: string,
    imageUrl: string,
    specialties: string[],
    shifts: Shift[]
}

export type Shift = {
    shiftId: string
    weekday: number,
    startTime: string,
    finishTime: string,
    slots: number
}

export type Document = {
    documentId: string,
    documentType: string,
    documentName: string,
    documentUrl: string,
    documentFormat: string
}

export type PatientProfile = {
    patientProfileId: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    gender: 0 | 1 | 2,
    address: string,
    occupation: string,
    insuranceNumber: string,
    allergies: string,
    currentMedications: string,
    pastMedicalHistory: string,
    patientDocuments: Document[]
}

export type Specialty = {
    specialtyId: string,
    name: string
}

export type RegisterInput = {
    email: string,
    phoneNumber: string,
    password: string
}

export type User = {
    userId: string,
    role: string,
    email: string,
    phoneNumber: string,
    profileId?: string | null
}

export interface UserContextType {
    user: User | null,
    loading: boolean,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type LoginInput = {
    email: string,
    phoneNumber: string,
    password: string
}

export interface ShiftTime {
    shiftId: string,
    time: string
}
