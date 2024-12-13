import { findMySales, findCarById } from "../services/carService.js";
import { findAllServices } from "../services/serviceService.js";
import { addServiceToCar } from "../services/carService.js";
import { checkAuth } from "../utils/session.js";

let cars = [];
let car;
let carId;
let services = [];
const rowsPerPage = 8;
let currentPage = 1;

const getSoldCars = async () =>{
    try{
        cars = await findMySales();
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

const getCarById = async (id) =>{
    try{
        car = await findCarById(id);
        console.log(car);
    }catch(error){
        console.log("Error al obtener el automovil");
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
                            <button class="btn btn-outline-success" data-bs-target="#addServicesModal" data-bs-toggle ="modal" id="addServiceToCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentcolor" height="20px" width="20px"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z"/></svg></button>
                            <button class="btn btn-outline-info" data-bs-target="#detailsModal" data-bs-toggle ="modal" id="carDetails-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M444-288h72v-240h-72v240Zm35.79-312q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm.49 504Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg></button>
                        </td>
                    </tr>`
    });
    tbody.innerHTML = content;
    tbody.addEventListener('click', async(event) => {
        const addServiceButton = event.target.closest('button[id^="addServiceToCar-"]');
        const carDetailsButton = event.target.closest('button[id^="carDetails-"]');
        if (addServiceButton) {
            carId = addServiceButton.id.split('-')[1];
            await loadServices(); 
        }
        if (carDetailsButton) {
            carId = carDetailsButton.id.split('-')[1];
            await getCarById(carId);
            await loadRequestedServices();
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
                          ${item.name} | $${item.price}
                        </label>
                    </div>`
    });
    checklist.innerHTML = content;
}

const loadRequestedServices = async () => {
    const requestedServices = car.services;
    console.log(requestedServices);
    let servicesList = document.getElementById("servicesList");
    let content = '';
    let subtotal = 0;
    requestedServices.forEach((item) =>{
        content += `<li class="list-group-item">${item.name} | $${item.price}</li>`
        subtotal += item.price;
    });
    content += `<hr><li class="list-group-item">Subtotal = $${subtotal}</li>`
    servicesList.innerHTML = content;
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
