import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminNavbar from "@/components/AdminNavbar";
import { Upload, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  department: string;
  password: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    email: "",
    department: ""
  });

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(savedStudents);
  }, []);

  // Save to localStorage and dispatch event when students change
  const updateStudentsStorage = (updatedStudents: Student[]) => {
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    window.dispatchEvent(new CustomEvent('studentsUpdated'));
  };

  const handleSubmit = () => {
    if (!formData.rollNumber || !formData.name || !formData.email || !formData.department) {
      toast.error("Please fill all fields");
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      ...formData,
      password: "student"
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    updateStudentsStorage(updatedStudents);
    setFormData({ rollNumber: "", name: "", email: "", department: "" });
    setIsAddDialogOpen(false);
    toast.success("Student added successfully");
  };

  const handleEdit = () => {
    if (!selectedStudent) return;

    const updatedStudents = students.map(student => 
      student.id === selectedStudent.id 
        ? { ...selectedStudent, ...formData }
        : student
    );
    setStudents(updatedStudents);
    updateStudentsStorage(updatedStudents);
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    setFormData({ rollNumber: "", name: "", email: "", department: "" });
    toast.success("Student updated successfully");
  };

  const handleDelete = (studentId: string) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    updateStudentsStorage(updatedStudents);
    toast.success("Student deleted successfully");
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      rollNumber: student.rollNumber,
      name: student.name,
      email: student.email,
      department: student.department
    });
    setIsEditDialogOpen(true);
  };

  const togglePasswordVisibility = (studentId: string) => {
    setShowPassword(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="/admin/students" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Enter student details to add them to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rollNumber" className="text-right">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload CSV File
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
            <CardDescription>All registered students in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{showPassword[student.id] ? student.password : "••••••"}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePasswordVisibility(student.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(student)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(student.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="grid gap-4 py-4">
                <div><strong>Roll Number:</strong> {selectedStudent.rollNumber}</div>
                <div><strong>Name:</strong> {selectedStudent.name}</div>
                <div><strong>Email:</strong> {selectedStudent.email}</div>
                <div><strong>Department:</strong> {selectedStudent.department}</div>
                <div><strong>Password:</strong> {selectedStudent.password}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>Update student information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
            </div>
            <DialogFooter>
              <Button onClick={handleEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentsPage;
