
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "@/components/ProfileComponent";
import StudentNavbar from "@/components/StudentNavbar";
import FacultyNavbar from "@/components/FacultyNavbar";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user.id) {
      navigate('/');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleUserUpdate = (updatedUser: any) => {
    setCurrentUser(updatedUser);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isStudent = currentUser.role === 'student';
  const NavbarComponent = isStudent ? StudentNavbar : FacultyNavbar;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent currentPage="/profile" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProfileComponent
          userType={isStudent ? 'student' : 'faculty'}
          currentUser={currentUser}
          onUpdate={handleUserUpdate}
        />
      </div>
    </div>
  );
}
