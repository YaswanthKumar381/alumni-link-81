
import MainLayout from "@/components/MainLayout";
import { Bookmark, BookOpen, Award, Star, Calendar, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

const YouAtRgukt = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    id: "N180456",
    graduationYear: "2022",
    branch: "Computer Science & Engineering",
    achievements: [
      {
        id: 1,
        title: "Dean's List",
        year: "2021",
        description: "Recognized for outstanding academic achievement",
      },
      {
        id: 2,
        title: "Hackathon Winner",
        year: "2020",
        description: "First place in RGUKT Annual Hackathon",
      },
      {
        id: 3,
        title: "Research Publication",
        year: "2022",
        description: "Published paper on AI algorithms in IEEE conference",
      },
    ],
    pucResults: [
      { id: 1, year: "First Year", gpa: 9.6, rank: 5 },
      { id: 2, year: "Second Year", gpa: 9.7, rank: 3 },
    ],
    btechResults: [
      { id: 1, year: "First Year", gpa: 9.2, rank: 12 },
      { id: 2, year: "Second Year", gpa: 9.4, rank: 8 },
      { id: 3, year: "Third Year", gpa: 9.5, rank: 5 },
      { id: 4, year: "Fourth Year", gpa: 9.8, rank: 2 },
    ],
    certificates: [
      {
        id: 1,
        title: "Machine Learning Specialization",
        issuer: "Coursera",
        year: "2021",
      },
      {
        id: 2,
        title: "Cloud Computing Certification",
        issuer: "AWS",
        year: "2022",
      },
    ],
  });

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // based on the logged-in user's ID
    // For now, we'll use the mock data above
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Overview */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-500">{userData.id}</p>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">{userData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Graduation:</span>
                  <span className="font-medium">{userData.graduationYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic History */}
          <div className="md:w-2/3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Academic Journey</h2>
              </div>

              <div className="space-y-6">
                {/* PUC Results */}
                <div>
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-orange-500" />
                    Pre-University Course (PUC)
                  </h3>
                  <div className="bg-orange-50 rounded-md p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {userData.pucResults.map((year) => (
                        <div key={year.id} className="bg-white p-3 rounded shadow-sm text-center">
                          <p className="text-xs text-gray-500">{year.year}</p>
                          <p className="text-lg font-bold text-orange-600">{year.gpa}</p>
                          <p className="text-xs">Rank: {year.rank}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* B.Tech Results */}
                <div>
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-blue-500" />
                    B.Tech Program
                  </h3>
                  <div className="bg-blue-50 rounded-md p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {userData.btechResults.map((year) => (
                        <div key={year.id} className="bg-white p-3 rounded shadow-sm text-center">
                          <p className="text-xs text-gray-500">{year.year}</p>
                          <p className="text-lg font-bold text-blue-600">{year.gpa}</p>
                          <p className="text-xs">Rank: {year.rank}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Achievements & Certificates</h2>
              </div>

              <div className="space-y-4">
                {userData.achievements.map((achievement) => (
                  <div key={achievement.id} className="border-l-2 border-primary pl-4 py-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <span className="text-sm text-gray-500">{achievement.year}</span>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Certifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {userData.certificates.map((cert) => (
                    <div key={cert.id} className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium">{cert.title}</h4>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{cert.issuer}</span>
                        <span className="text-gray-500">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default YouAtRgukt;
