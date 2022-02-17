export interface HouseDto {
    address: string;
    ownerName: string;
    phone: string;
    alarm?: Alarm
}

export interface Alarm {
    status: AlarmStatus;
    lastChange: string;
}

export enum AlarmStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
}
