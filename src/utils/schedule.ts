import type { Course, DayOfWeek, ScheduleData } from "~/types/schedule";
import type { TimeFormat } from "./settings";

/**
 * Format time string from HH:MM to readable format
 */
export function formatTime(time: string, format: TimeFormat = "24"): string {
  const [hours, minutes] = time.split(":");
  const hourNum = parseInt(hours);

  if (format === "24") {
    return `${hours}:${minutes}`;
  }

  // 12-hour format
  const period = hourNum >= 12 ? "PM" : "AM";
  const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
  return `${hour12}:${minutes} ${period}`;
}

/**
 * Get current time in HH:MM format
 */
export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Get current time in minutes since midnight
 */
export function getCurrentTimeInMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert time string to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Calculate duration between two time strings
 */
export function calculateDuration(startTime: string, endTime: string): string {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const diffMinutes = endMinutes - startMinutes;

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours === 0) return `${minutes} menit`;
  if (minutes === 0) return `${hours} jam`;
  return `${hours} jam ${minutes} menit`;
}

/**
 * Get time until course starts (in minutes)
 */
export function getTimeUntilCourse(course: Course): number | null {
  const currentDay = getCurrentDay();
  if (course.day !== currentDay) return null;

  const currentTimeMinutes = getCurrentTimeInMinutes();
  const courseStartMinutes = timeToMinutes(course.start_time);

  if (currentTimeMinutes > courseStartMinutes) return null;

  return courseStartMinutes - currentTimeMinutes;
}

/**
 * Get time remaining in current course (in minutes)
 */
export function getTimeRemainingInCourse(course: Course): number | null {
  const currentDay = getCurrentDay();
  if (course.day !== currentDay) return null;

  const currentTimeMinutes = getCurrentTimeInMinutes();
  const courseStartMinutes = timeToMinutes(course.start_time);
  const courseEndMinutes = timeToMinutes(course.end_time);

  if (
    currentTimeMinutes < courseStartMinutes ||
    currentTimeMinutes > courseEndMinutes
  ) {
    return null;
  }

  return courseEndMinutes - currentTimeMinutes;
}

/**
 * Format time remaining/until in human readable format
 */
export function formatTimeRemaining(minutes: number): string {
  if (minutes < 1) return "Kurang dari 1 menit";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} menit`;
  if (mins === 0) return `${hours} jam`;
  return `${hours} jam ${mins} menit`;
}

/**
 * Get courses for a specific day
 */
export function getCoursesForDay(
  schedule: ScheduleData,
  day: DayOfWeek,
): Course[] {
  return schedule.schedule[day] || [];
}

/**
 * Get all days with courses
 */
export function getActiveDays(schedule: ScheduleData): DayOfWeek[] {
  return Object.keys(schedule.schedule) as DayOfWeek[];
}

/**
 * Sort courses by start time
 */
export function sortCoursesByTime(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => {
    const aMinutes = timeToMinutes(a.start_time);
    const bMinutes = timeToMinutes(b.start_time);
    return aMinutes - bMinutes;
  });
}

/**
 * Get current day in Indonesian
 */
export function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return days[new Date().getDay()];
}

/**
 * Check if course is currently active
 */
export function isCourseActive(course: Course): boolean {
  const currentDay = getCurrentDay();
  if (course.day !== currentDay) return false;

  const currentTimeMinutes = getCurrentTimeInMinutes();
  const startTimeMinutes = timeToMinutes(course.start_time);
  const endTimeMinutes = timeToMinutes(course.end_time);

  return (
    currentTimeMinutes >= startTimeMinutes &&
    currentTimeMinutes <= endTimeMinutes
  );
}

/**
 * Check if course is starting soon (within 15 minutes)
 */
export function isCourseStartingSoon(course: Course): boolean {
  const timeUntil = getTimeUntilCourse(course);
  return timeUntil !== null && timeUntil <= 15 && timeUntil > 0;
}

/**
 * Get next course today
 */
export function getNextCourse(courses: Course[]): Course | null {
  const currentTimeMinutes = getCurrentTimeInMinutes();
  const sortedCourses = sortCoursesByTime(courses);

  for (const course of sortedCourses) {
    const startTimeMinutes = timeToMinutes(course.start_time);
    if (startTimeMinutes > currentTimeMinutes) {
      return course;
    }
  }

  return null;
}

/**
 * Get all active courses right now
 */
export function getActiveCourses(schedule: ScheduleData): Course[] {
  const currentDay = getCurrentDay();
  const todayCourses = getCoursesForDay(schedule, currentDay);
  return todayCourses.filter((course) => isCourseActive(course));
}

/**
 * Get courses starting soon
 */
export function getCoursesStartingSoon(schedule: ScheduleData): Course[] {
  const currentDay = getCurrentDay();
  const todayCourses = getCoursesForDay(schedule, currentDay);
  return todayCourses.filter((course) => isCourseStartingSoon(course));
}

/**
 * Get course card color based on schedule type
 */
export function getCourseCardColor(course: Course): string {
  switch (course.schedule_type) {
    case "Reguler":
      return "from-primary to-primary-focus";
    case "Malam":
      return "from-secondary to-secondary-focus";
    default:
      return "from-accent to-accent-focus";
  }
}

/**
 * Get course badge color based on schedule type
 */
export function getCourseBadgeColor(course: Course): string {
  switch (course.schedule_type) {
    case "Reguler":
      return "badge-primary";
    case "Malam":
      return "badge-secondary";
    default:
      return "badge-accent";
  }
}

/**
 * Format lecturer name with titles
 */
export function formatLecturerName(lecturer: {
  name: string;
  titles: string[];
}): string {
  return `${lecturer.name}, ${lecturer.titles.join(", ")}`;
}
