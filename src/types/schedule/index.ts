export type TSchedule = {
  id?: string;
  startDate: string;
  endDate: string;
};

export type TScheduleForm = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
