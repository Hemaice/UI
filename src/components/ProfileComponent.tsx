
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Edit, Eye } from "lucide-react";
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
    ...(userType === 'student' 
      ? { rollNumber: currentUser.rollNumber || "", year: currentUser.year || "", mobile: currentUser.mobile || "" }
      : { facultyId: currentUser.facultyId || "", mobile: currentUser.mobile || "" }
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
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-blue-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">My Profile</CardTitle>
          <CardDescription>
            {userType === 'student' ? 'Student Profile Information' : 'Faculty Profile Information'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Name</Label>
              <p className="text-lg">{currentUser.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="text-lg">{currentUser.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Department</Label>
              <p className="text-lg">{currentUser.department}</p>
            </div>
            {userType === 'student' ? (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Roll Number</Label>
                  <p className="text-lg">{currentUser.rollNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Year</Label>
                  <p className="text-lg">{currentUser.year}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Mobile</Label>
                  <p className="text-lg">{currentUser.mobile}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Faculty ID</Label>
                  <p className="text-lg">{currentUser.facultyId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Mobile</Label>
                  <p className="text-lg">{currentUser.mobile}</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-4 justify-center mt-6">
            <Button onClick={() => setIsViewDialogOpen(true)} variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Profile
            </Button>
            <Button onClick={() => setIsEditDialogOpen(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div><strong>Name:</strong> {currentUser.name}</div>
            <div><strong>Email:</strong> {currentUser.email}</div>
            <div><strong>Department:</strong> {currentUser.department}</div>
            {userType === 'student' ? (
              <>
                <div><strong>Roll Number:</strong> {currentUser.rollNumber}</div>
                <div><strong>Year:</strong> {currentUser.year}</div>
                <div><strong>Mobile:</strong> {currentUser.mobile}</div>
              </>
            ) : (
              <>
                <div><strong>Faculty ID:</strong> {currentUser.facultyId}</div>
                <div><strong>Mobile:</strong> {currentUser.mobile}</div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Profile
            </DialogTitle>
            <DialogDescription>Update your profile information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-department" className="text-right">Department</Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="col-span-3"
              />
            </div>
            {userType === 'student' ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-rollNumber" className="text-right">Roll Number</Label>
                  <Input
                    id="edit-rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-year" className="text-right">Year</Label>
                  <Input
                    id="edit-year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-mobile" className="text-right">Mobile</Label>
                  <Input
                    id="edit-mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-facultyId" className="text-right">Faculty ID</Label>
                  <Input
                    id="edit-facultyId"
                    value={formData.facultyId}
                    onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-mobile" className="text-right">Mobile</Label>
                  <Input
                    id="edit-mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileComponent;
