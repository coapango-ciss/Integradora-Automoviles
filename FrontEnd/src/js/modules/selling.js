import { findAllCustomers, findMyCustomers } from "../services/customerService.js";
import { sellCar, findCarByStatus } from "../services/carService.js";
import { loadSelectData } from "../utils/loadSelect.js";
import { checkAuth } from "../utils/session.js";

let car = {};
let carId;
let cars = [];
let customer = {};
const rowsPerPage = 8;
let currentPage = 1;

const getSellingCars = async () =>{
    try{
        cars = await findCarByStatus(false);
        console.log(cars);
    }catch(error){
        console.error("Error al obtener los automoviles")
    }
}

const makeSell = async () =>{
    customer = {
        id: document.getElementById('customer').value
    }
    await sellCar(carId, customer);
    await loadContent();
}

const loadTable = async (page) => {
    await getSellingCars();
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = cars.slice(start, end);
    let tbody = document.getElementById('tbody');
    let content = '';
    paginatedData.forEach((item, index) =>{
        content += `<tr>
                        <th scope="row">${start + index + 1}</th>
                        <td>${item.brand.name}</td>
                        <td>${item.model}</td>
                        <td>${item.color}</td>
                        <td>$${item.price}</td>
                        <td class = "d-flex justify-content-evenly text-center">
                            <button class="btn btn-outline-success" data-bs-target="#sellModal" data-bs-toggle="modal" id="sellCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M843-399 562-117q-11 11-24 16t-27 5q-14 0-27-5t-24-16L116.7-460.3Q106-471 101-483.89T96-511v-281q0-29.7 21.15-50.85Q138.3-864 168-864h281q13.91 0 26.96 5 13.04 5 23.77 15.7L843-500q11 11 16 23.5t5 26.5q0 14-5.02 27.09Q853.96-409.83 843-399ZM511-168l281-281-343-343H168v281l343 343ZM264-636q25 0 42.5-17.5T324-696q0-25-17.5-42.5T264-756q-25 0-42.5 17.5T204-696q0 25 17.5 42.5T264-636Zm216 156Z"/></svg></button>
                        </td>
                    </tr>`
    });
    tbody.innerHTML = content;
    tbody.addEventListener('click', (event) => {
        const sellButton = event.target.closest('button[id^="sellCar-"]');
        carId;
        if (sellButton) {
            carId = sellButton.id.split('-')[1];
            setDataOnForm();
        }
    });
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


const setDataOnForm = async() =>{
    const data = await findMyCustomers();
    const select = document.getElementById("customer");
    let options = data.map(item => `<option value="${item.id}">${item.name} ${item.surname} ${item.lastname}</option>`).join('');  
    select.innerHTML = options;
}

const loadContent = async () => {
    await loadTable(currentPage);
    renderPagination();
}

function registerEventListeners() {
    document.getElementById("sellForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        await makeSell();
    });
}


(async ()=>{
    const requestedRoles = ["ROLE_EMPLOYEE"];
    checkAuth(requestedRoles);
    await loadContent();
    registerEventListeners();
})()
