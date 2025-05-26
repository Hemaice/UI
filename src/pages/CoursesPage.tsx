
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="/admin/courses" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Courses Management</h1>
          <p className="text-gray-600">Manage course information and assignments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Course management functionality coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">This page will contain course management features.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursesPage;
