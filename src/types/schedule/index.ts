export type TSchedule = {
  [x: string]: any;
  id?: string;
  startDateTime: string;
  endDateTime: string;
};

export type TScheduleForm = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
