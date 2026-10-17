import { useState } from 'react'
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ali",
      role: "Developer"
    },
    {
      id: 2,
      name: "Sara",
      role: "Designer"
    },
    {
      id: 3,
      name: "Vikas",
      role: "Tester"
    }
  ]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  //add function
  function addEmployee() {
    if(name.trim() ==  "" || role.trim() === "") {
      alert("Please enter name and role");
      return;
    }
    if(editId !== null) {
      const updateEmployee = employees.map((employee) => {
      if(employee.id === editId) {
        return {
          ...employee,
          name: name,
          role: role
      }
    }
    return employee;
  });
    setEmployees(updateEmployee);
    setEditId(null);
    }

    //employee object
   else{
    const newEmployee = {
    id:  employees.length > 0
  ? Math.max(...employees.map((employee) => employee.id)) + 1
  : 1,
    name: name,
    role: role
   }

   //add employee in list
   setEmployees([...employees, newEmployee]);
  }

   //clear the input field after adding new employee
   setName("");
   setRole("");
  
}

  //delete employee
  function deleteEmployee(id) {
    const updateEmployee = employees.filter((employee) => {
      return employee.id !== id;
    });

    setEmployees(updateEmployee);
  }
  
  //edit employee
  function editEmployee(id) {
    const employeeEdit = employees.find((employee) => employee.id === id);

    setName(employeeEdit.name);
    setRole(employeeEdit.role);
    setEditId(employeeEdit.id);
  }

  const filteredEmployees = employees.filter((employee) => {
            return search.toLowerCase() === "" ? roleFilter === "" || employee.role === roleFilter
            : employee.name.toLowerCase().includes(search.toLowerCase()) &&
            (roleFilter === "" || employee.role === roleFilter);
           
          });
  return (
    <div className="container app-container">
      <h1 className='text-primary text- mb-3'>Employee Management</h1>
      
      <div className='mb-3'>
        <label htmlFor='employeeName' className='form-label me-1'>Name</label>
       <input id='employeeName' type='text' placeholder='Employee Name' 
      value={name} onChange={(e) =>setName(e.target.value) } />
      </div>

      <div>
        <label htmlFor="employeeRole" className='form-label me-2'>Role</label>
       <input id='employeeRole' type='text' placeholder='Employee Role'
       value={role} onChange={(e) =>setRole(e.target.value)}  />
       </div>

      <button className={`btn ${editId === null ? "btn-success" : "btn-primary"} mt-2`} onClick={addEmployee}>
        {editId === null ? "Add Employee" : "Update Employee"}
      </button>

      <br />
      
      <input type='text' className='form-control mt-3 mb-1' placeholder='Search employees name' value={search} 
      onChange={(e) => setSearch(e.target.value)} />
    

      <select className='form-select mb-3 mt-3' value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
        <option value="">Select role</option>
        <option value="Developer">Developer</option>
        <option value="Tester">Tester</option>
        <option value="Designer">Designer</option>
      </select>
      
      <div className='table-responsive'>
      <table className='table table-striped table-hover table-bordered align-middle'>
        <thead className='table-dark'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          filteredEmployees.length === 0 ? (
          <tr>
            <td colSpan={4}>No Employees Found</td>
          </tr>
          ) :
          filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
            
              <td className='text-center'>
                <button className='btn btn-warning btn-sm me-2' onClick={() => editEmployee(employee.id)}>Edit</button>
                <button className='btn btn-danger btn-sm me-2' onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default App
