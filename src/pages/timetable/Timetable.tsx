import MainLayout from "@/components/MainLayout";
import { Clock, MapPin, BookOpen } from "lucide-react";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const schedule = {
  Monday: [
    { subject: "Data Structures", room: "CS-101", instructor: "Dr. Smith" },
    { subject: "Algorithms", room: "CS-102", instructor: "Dr. Johnson" },
    { subject: "Database Systems", room: "CS-103", instructor: "Dr. Williams" },
  ],
  Tuesday: [
    { subject: "Computer Networks", room: "CS-201", instructor: "Dr. Brown" },
    { subject: "Operating Systems", room: "CS-202", instructor: "Dr. Davis" },
    { subject: "Software Engineering", room: "CS-203", instructor: "Dr. Miller" },
  ],
  // ... other days
};

const Timetable = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header>
          <h1 className="text-3xl font-bold">Class Timetable</h1>
          <p className="text-gray-600">Your weekly schedule</p>
        </header>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>
                  {weekDays.map((day) => (
                    <th
                      key={day}
                      className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, index) => (
                  <tr key={time} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 px-4 border-b text-sm font-medium">{time}</td>
                    {weekDays.map((day) => (
                      <td key={`${day}-${time}`} className="py-4 px-4 border-b">
                        {schedule[day]?.[index] && (
                          <div className="space-y-2">
                            <div className="font-medium text-sm">
                              {schedule[day][index].subject}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{schedule[day][index].room}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{schedule[day][index].instructor}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Timetable;
