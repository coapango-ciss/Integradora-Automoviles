import { findMySales } from "../services/carService.js";
import { findAllServices } from "../services/serviceService.js";
import { addServiceToCar } from "../services/carService.js";
import { checkAuth } from "../utils/session.js";

let cars = [];
let carId;
let services = [];
const rowsPerPage = 8;
let currentPage = 1;

const getSoldCars = async () =>{
    try{
        cars = await findMySales(true);
    }catch(error){
        console.error("Error al obtener los automoviles")
    }
}

const getAllServices = async () =>{
    try {
        services = await findAllServices();
    } catch (error) {
        console.error("Error al obtener los servicios");
    }
}

const assignServicesToCar = async (carId) => {
    const selectedServices = [];
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
        selectedServices.push(checkbox.value);
    });
    try {
        await addServiceToCar(carId,selectedServices)
    } catch (err) {
        console.error('Error al asignar servicios:', err);
    }
    await loadContent();
};

const loadTable = async (page) => {
    await getSoldCars();
    cars = cars.reverse();
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = cars.slice(start, end);
    let tbody = document.getElementById('tbody');
    let content = '';
    paginatedData.forEach((item, index) =>{
        content += `<tr>
                        <th scope="row">${start + index + 1}</th>
                        <td>${item.customer.name} ${item.customer.surname}</td>
                        <td>${item.brand.name} ${item.model} ${item.color}</td>
                        <td>${item.sellDate}</td>
                        <td>$${item.price}</td>
                        <td class = "d-flex justify-content-evenly text-center">
                            <button class="btn btn-outline-primary" data-bs-target="#addServicesModal" data-bs-toggle ="modal" id="addServiceToCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentcolor" height="20px" width="20px"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z"/></svg></button>
                        </td>
                    </tr>`
    });
    tbody.innerHTML = content;
    tbody.addEventListener('click', (event) => {
        const addServiceButton = event.target.closest('button[id^="addServiceToCar-"]');
        if (addServiceButton) {
            carId = addServiceButton.id.split('-')[1];
            loadServices(); 
        }
    });
}

const loadServices = async () => {
    await getAllServices();
    let checklist = document.getElementById('serviceChecklist');
    let content = '';
    services.forEach((item, index) =>{
        content += `<div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${item.id}" id="check${item.index}">
                        <label class="form-check-label" for="defaultCheck1">
                          ${item.name}
                        </label>
                    </div>`
    });
    checklist.innerHTML = content;
}

function renderPagination() {
    const totalPages = Math.ceil(cars.length / rowsPerPage);
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

const loadContent = async () => {
    await loadTable(currentPage);
    renderPagination();
}

function registerEventListeners() {
    document.getElementById("addServicesForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        await assignServicesToCar(carId);
    });
}


(async ()=>{
    const requestedRoles = ["ROLE_EMPLOYEE"];
    const rol = checkAuth(requestedRoles);
    await loadContent();
    registerEventListeners();
})()
