
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Home, BookOpen, Users, Camera } from "lucide-react";
import { toast } from "sonner";

interface StudentNavbarProps {
  currentPage?: string;
}

const StudentNavbar = ({ currentPage }: StudentNavbarProps) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const updatedUser = { ...currentUser, profileImage: imageUrl };
        
        // Update current user state
        setCurrentUser(updatedUser);
        
        // Update localStorage for currentUser
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update the user in the students array
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const updatedStudents = students.map((student: any) => 
          student.id === currentUser.id 
            ? { ...student, profileImage: imageUrl }
            : student
        );
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        
        toast.success("Profile image updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const menuItems = [
    { label: "Dashboard", path: "/student/dashboard", icon: Home },
    { label: "Available Courses", path: "/student/available-courses", icon: BookOpen },
    { label: "Enrolled Courses", path: "/student/enrolled-courses", icon: Users }
  ];

  const initials = currentUser.name ? currentUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'S';

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">Student Portal</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={currentPage === item.path ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {currentUser.profileImage ? (
                      <AvatarImage src={currentUser.profileImage} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-blue-500 text-white">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={triggerImageUpload}>
                  <Camera className="mr-2 h-4 w-4" />
                  <span>Change Profile Picture</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
