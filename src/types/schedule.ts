export interface Lecturer {
  name: string;
  titles: string[];
}

export interface Location {
  room: string;
  building: string;
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
  start_time: string;
  end_time: string;
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

export interface TimeSlot {
  start: string;
  end: string;
  course?: Course;
}
