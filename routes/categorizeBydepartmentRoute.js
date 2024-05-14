// // Get Employees by Department
// router.get('/filter', async (req, res) => {
//     try {
//       const employees = await employeeDetails.find({}, { fullName: 1, department: 1, _id: 0 }).exec();
  
//       // Group employees by department
//       const employeesByDepartment = employees.reduce((acc, employee) => {
//         const { department } = employee;
//         if (!acc[department]) {
//           acc[department] = [];
//         }
//         acc[department].push(employee);
//         return acc;
//       }, {});
  
//       return res.status(200).json({ success: true, employeesByDepartment });
//     } catch (err) {
//       return res.status(400).json({ success: false, error: err.message });
//     }
//   });

