
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Edit, Eye, Camera } from "lucide-react";
import { toast } from "sonner";

interface ProfileComponentProps {
  userType: 'student' | 'faculty';
  currentUser: any;
  onUpdate: (updatedUser: any) => void;
}

const ProfileComponent = ({ userType, currentUser, onUpdate }: ProfileComponentProps) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    department: currentUser.department || "",
    mobile: currentUser.mobile || "",
    ...(userType === 'student' 
      ? { rollNumber: currentUser.rollNumber || "", year: currentUser.year || "" }
      : { facultyId: currentUser.facultyId || "" }
    )
  });

  const handleEdit = () => {
    const storageKey = userType === 'student' ? 'students' : 'faculty';
    const users = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const updatedUsers = users.map((user: any) => 
      user.id === currentUser.id 
        ? { ...user, ...formData }
        : user
    );
    
    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
    
    // Update current user in localStorage
    const updatedCurrentUser = { ...currentUser, ...formData };
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    
    onUpdate(updatedCurrentUser);
    setIsEditDialogOpen(false);
    toast.success("Profile updated successfully");
  };

  const initials = currentUser.name ? currentUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarFallback className="bg-white text-blue-600 font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarFallback className="text-4xl bg-gray-200 text-gray-600">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
              {userType === 'student' ? (
                <p className="text-lg font-medium text-blue-600">Roll Number: {currentUser.rollNumber}</p>
              ) : (
                <p className="text-lg font-medium text-purple-600">Faculty ID: {currentUser.facultyId}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => setIsEditDialogOpen(true)} 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                onClick={() => setIsViewDialogOpen(true)} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>

          {/* Basic Details Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-500">Name</Label>
                <p className="text-lg font-medium">{currentUser.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-lg">{currentUser.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Department</Label>
                <p className="text-lg">{currentUser.department}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Mobile Number</Label>
                <p className="text-lg">{currentUser.mobile}</p>
              </div>
              {userType === 'student' ? (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Roll Number</Label>
                    <p className="text-lg font-medium text-blue-600">{currentUser.rollNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Year</Label>
                    <p className="text-lg">{currentUser.year}</p>
                  </div>
                </>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Faculty ID</Label>
                  <p className="text-lg font-medium text-purple-600">{currentUser.facultyId}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl bg-blue-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3">
              <div><strong>Name:</strong> {currentUser.name}</div>
              <div><strong>Email:</strong> {currentUser.email}</div>
              <div><strong>Department:</strong> {currentUser.department}</div>
              <div><strong>Mobile:</strong> {currentUser.mobile}</div>
              {userType === 'student' ? (
                <>
                  <div><strong>Roll Number:</strong> {currentUser.rollNumber}</div>
                  <div><strong>Year:</strong> {currentUser.year}</div>
                </>
              ) : (
                <div><strong>Faculty ID:</strong> {currentUser.facultyId}</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Profile
            </DialogTitle>
            <DialogDescription>Update your profile information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-blue-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>

            {/* Basic Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Basic Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-mobile">Mobile Number</Label>
                  <Input
                    id="edit-mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Educational Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Educational Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userType === 'student' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="edit-rollNumber">Roll Number</Label>
                      <Input
                        id="edit-rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-year">Year</Label>
                      <Input
                        id="edit-year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="edit-facultyId">Faculty ID</Label>
                    <Input
                      id="edit-facultyId"
                      value={formData.facultyId}
                      onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileComponent;
