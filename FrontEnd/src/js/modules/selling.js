import { saveBrand, findAllBrands } from "../services/brandService.js";
import { findAllCustomers } from "../services/customerService.js";
import { findCarById, sellCar, findCarByStatus } from "../services/carService.js";
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

const getCarById = async (id) =>{
    try{
        car = await findCarById(id);
    }catch(error){
        console.log("Error al obtener el automovil");
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
                            <button class="btn btn-outline-primary" data-bs-target="#sellModal" data-bs-toggle="modal" id="sellCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg></button>
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
    await loadSelectData(findAllCustomers,"customer",true);
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
