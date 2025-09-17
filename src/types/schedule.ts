export interface Lecturer {
  name: string;
  titles: string[];
}

export interface Location {
  room: string;
  building: string;
}

export interface TimeSlot {
  slot: number;
  time_range: string;
  start_time: string;
  end_time: string;
}

export interface Course {
  course_code: string;
  course_name: string;
  original_name?: string;
  credits: number;
  class: string;
  lecturer: Lecturer;
  location: Location;
  day: DayOfWeek;
  start_slot: number;
  end_slot: number;
  schedule_type: "Reguler" | "Malam";
  note?: string | null;
}

export interface ScheduleData {
  semester: string;
  schedule: Record<DayOfWeek, Course[]>;
}

export type DayOfWeek =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu";

export interface ScheduleFilterOptions {
  selectedDay?: DayOfWeek | "All";
  scheduleType?: "All" | "Reguler" | "Malam";
}

export interface ScheduleTimeSlot {
  start: string;
  end: string;
  course?: Course;
}
