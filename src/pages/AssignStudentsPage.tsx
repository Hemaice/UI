
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AssignStudentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="/admin/assign-students" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Assign Students</h1>
          <p className="text-gray-600">Assign students to courses and manage enrollments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Assignment</CardTitle>
            <CardDescription>Student assignment functionality coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">This page will contain student assignment features.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssignStudentsPage;
