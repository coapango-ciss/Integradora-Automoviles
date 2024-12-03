import { findAllEmployees, findEmployeeById, saveEmployee, updateEmployee,deleteEmployee } from "../services/employeeService.js";

let employee = {};
let employees = [];
let updated = {};
const rowsPerPage = 8;
let currentPage = 1;


const getAllEmployees = async () =>{
    try{
        employees = await findAllEmployees();
        console.log(employees);
    }catch(error){
        console.error("Error al obtener las marcas")
    }
}

const getEmployeeById = async (id) =>{
    try{
        employee = await findEmployeeById(id);
    }catch(error){
        console.log("Error al obtener la marca");
    }
}

const createEmployee = async () =>{
    let form = document.getElementById('saveForm');
    employee = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        lastname: document.getElementById('lastname').value,
        username: document.getElementById('username').value
    }
    await saveEmployee(employee);
    employee = {};
    form.reset();
    await loadContent();
}

const updateEmployeeDetails = async () =>{
    let form = document.getElementById('updateForm');
    updated = {
        name: document.getElementById('u_name').value,
        surname: document.getElementById('u_surname').value,
        lastname: document.getElementById('u_lastname').value,
        username: document.getElementById('u_username').value
    }
    await updateEmployee(employee.id,updated);
    updated = {};
    form.reset();
    await loadContent();
}

const removeEmployee = async (id) =>{
    await deleteEmployee(id);
    await loadContent();
}




const loadTable = async (page) => {
    await getAllEmployees();
    employees = employees.reverse();
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = employees.slice(start, end);
    let tbody = document.getElementById('tbody');
    let content = '';
    paginatedData.forEach((item, index) =>{
        content += `<tr>
                        <th scope="row">${start + index+1}</th>
                        <td>${item.name} ${item.surname} ${item.lastname}</td>
                        <td>${item.username}</td>
                        <td>${item.rol.name == "ROLE_ADMIN" ? "Administrador" : "Empleado"}</td>
                        <td class = "d-flex justify-content-evenly text-center">
                            <button class="btn btn-outline-danger" data-bs-target="#deleteModal" data-bs-toggle ="modal" id="deleteEmployee-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg></button>
                            <button class="btn btn-outline-primary" data-bs-target="#updateModal" data-bs-toggle="modal" id="editEmployee-${item.id}""><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg></button>
                        </td>
                    </tr>`;
    });
    tbody.innerHTML = content;
    tbody.addEventListener('click', (event) => {
        const editButton = event.target.closest('button[id^="editEmployee-"]');
        const deleButton = event.target.closest('button[id^="deleteEmployee-"]');
        let employeeId;
        if (editButton) {
            employeeId = editButton.id.split('-')[1];
            setDataOnForm(employeeId); 
        }
        if(deleButton){
            employeeId = deleButton.id.split('-')[1];
            getEmployeeById(employeeId);
        }

    });
}

function renderPagination() {
    const totalPages = Math.ceil(employees.length / rowsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === currentPage ? ' active' : '');
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        loadTable(currentPage);
        renderPagination();
      });
      pagination.appendChild(li);
    }
}

const setDataOnForm = async id =>{
    await getEmployeeById(id);
    document.getElementById("u_name").value=employee.name;
}

const loadContent = async () => {
    await loadTable(currentPage);
    renderPagination();
};

(async ()=>{
    await loadContent();
    const updateForm = document.getElementById("updateForm");
    const saveForm = document.getElementById("saveForm");
    const confirmDeleteEmployee = document.getElementById("confirmDeleteEmployee");
    saveForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        createEmployee();
    })
    updateForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        updateEmployeeDetails();
    })
    confirmDeleteEmployee.addEventListener('click', ()=>{
        removeEmployee(employee.id)
    });
})()