
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, MapPin } from "lucide-react";

type ClassSession = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
};

type DaySchedule = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  classes: ClassSession[];
};

const timetableData: DaySchedule[] = [
  {
    day: "Monday",
    classes: [
      {
        id: "mon-1",
        subject: "Data Structures",
        startTime: "09:00",
        endTime: "10:30",
        location: "Room 201",
        instructor: "Dr. Sharma"
      },
      {
        id: "mon-2",
        subject: "Computer Networks",
        startTime: "11:00",
        endTime: "12:30",
        location: "Lab 102",
        instructor: "Prof. Patel"
      },
      {
        id: "mon-3",
        subject: "Database Systems",
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 305",
        instructor: "Dr. Gupta"
      }
    ]
  },
  {
    day: "Tuesday",
    classes: [
      {
        id: "tue-1",
        subject: "Software Engineering",
        startTime: "09:00",
        endTime: "10:30",
        location: "Room 203",
        instructor: "Prof. Kumar"
      },
      {
        id: "tue-2",
        subject: "Operating Systems",
        startTime: "11:00",
        endTime: "12:30",
        location: "Lab 104",
        instructor: "Dr. Singh"
      }
    ]
  },
  {
    day: "Wednesday",
    classes: [
      {
        id: "wed-1",
        subject: "Data Structures",
        startTime: "09:00",
        endTime: "10:30",
        location: "Room 201",
        instructor: "Dr. Sharma"
      },
      {
        id: "wed-2",
        subject: "Algorithms",
        startTime: "11:00",
        endTime: "12:30",
        location: "Room 208",
        instructor: "Prof. Reddy"
      },
      {
        id: "wed-3",
        subject: "Database Systems",
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 305",
        instructor: "Dr. Gupta"
      }
    ]
  },
  {
    day: "Thursday",
    classes: [
      {
        id: "thu-1",
        subject: "Software Engineering",
        startTime: "09:00",
        endTime: "10:30",
        location: "Room 203",
        instructor: "Prof. Kumar"
      },
      {
        id: "thu-2",
        subject: "Operating Systems",
        startTime: "11:00",
        endTime: "12:30",
        location: "Lab 104",
        instructor: "Dr. Singh"
      },
      {
        id: "thu-3",
        subject: "Web Development",
        startTime: "14:00",
        endTime: "16:00",
        location: "Lab 101",
        instructor: "Prof. Mehta"
      }
    ]
  },
  {
    day: "Friday",
    classes: [
      {
        id: "fri-1",
        subject: "Computer Networks",
        startTime: "09:00",
        endTime: "10:30",
        location: "Lab 102",
        instructor: "Prof. Patel"
      },
      {
        id: "fri-2",
        subject: "Algorithms",
        startTime: "11:00",
        endTime: "12:30",
        location: "Room 208",
        instructor: "Prof. Reddy"
      }
    ]
  },
  {
    day: "Saturday",
    classes: [
      {
        id: "sat-1",
        subject: "Web Development",
        startTime: "10:00",
        endTime: "12:00",
        location: "Lab 101",
        instructor: "Prof. Mehta"
      }
    ]
  }
];

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<DaySchedule["day"]>("Monday");
  const currentSchedule = timetableData.find(schedule => schedule.day === selectedDay);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Class Timetable</h1>
          <div className="flex flex-wrap gap-2">
            {timetableData.map((schedule) => (
              <Button
                key={schedule.day}
                variant={selectedDay === schedule.day ? "default" : "outline"}
                onClick={() => setSelectedDay(schedule.day)}
              >
                {schedule.day}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{selectedDay}'s Schedule</h2>
          
          {currentSchedule?.classes.length === 0 ? (
            <p className="text-muted-foreground">No classes scheduled for this day.</p>
          ) : (
            currentSchedule?.classes.map((classSession) => (
              <Card key={classSession.id} className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {classSession.subject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {classSession.startTime} - {classSession.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{classSession.location}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-sm text-muted-foreground">
                        Instructor: {classSession.instructor}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Timetable;
