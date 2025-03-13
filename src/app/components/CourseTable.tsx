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
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Course Code</th>
              <th className="border p-2">Course Name</th>
              <th className="border p-2">Analytical Thinking</th>
              <th className="border p-2">Creativity</th>
              <th className="border p-2">Collaboration</th>
              <th className="border p-2">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.cId} className="border">
                <td className="border p-2">{course.cId}</td>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2">{course.analyticalThinking}</td>
                <td className="border p-2">{course.creativity}</td>
                <td className="border p-2">{course.collaboration}</td>
                <td className="border p-2">{course.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CourseTable;
  