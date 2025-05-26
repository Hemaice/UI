import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileComponentProps {
  userType: 'student' | 'faculty';
  currentUser: any;
  onUpdate: (updatedUser: any) => void;
}

const ProfileComponent = ({ userType, currentUser }: ProfileComponentProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
          <p className="text-gray-600">{currentUser.email}</p>
          {userType === 'student' ? (
            <p className="text-sm text-gray-500">Roll Number: {currentUser.rollNumber}</p>
          ) : (
            <p className="text-sm text-gray-500">Faculty ID: {currentUser.facultyId}</p>
          )}
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-lg">{currentUser.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg">{currentUser.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p className="text-lg">{currentUser.department}</p>
              </div>
            </div>

            <div className="space-y-4">
              {userType === 'student' ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                    <p className="text-lg">{currentUser.rollNumber}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Year</h3>
                    <p className="text-lg">{currentUser.year}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Faculty ID</h3>
                    <p className="text-lg">{currentUser.facultyId}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Mobile Number</h3>
                    <p className="text-lg">{currentUser.mobile}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              className="flex items-center gap-2"
              onClick={() => navigate('/profile/edit')}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;