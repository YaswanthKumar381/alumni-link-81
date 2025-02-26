
import MainLayout from "@/components/MainLayout";
import { User, Mail, Phone, MapPin, BookOpen } from "lucide-react";

const Profile = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-16 h-16 text-primary" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-600">Computer Science & Engineering</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>john.doe@rgukt.ac.in</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Nuzvid Campus</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Academic Information</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Year: 3rd Year</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Roll Number: N180123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
