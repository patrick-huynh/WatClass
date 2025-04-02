interface CourseTableProps {
    courses: Course[];
    submitted: boolean;
    loading: boolean;
  }
  
  const CourseTable: React.FC<CourseTableProps> = ({ courses, submitted, loading }) => {
    if (loading) {
      return <p className="text-blue-500 font-semibold">Loading courses...</p>;
    }
  
    if (submitted && courses.length === 0) {
      return <p className="text-red-600 font-semibold">No good course matches found.</p>;
    }
  
    if (!submitted) {
      return null;
    }
  
    return (
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-main text-white">
              <th className="p-3 text-center">Course Code</th>
              <th className="p-3 text-center">Course Name</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.cId} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="p-3 text-center">{course.cId}</td>
                <td className="p-3 text-center">{course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CourseTable;
  