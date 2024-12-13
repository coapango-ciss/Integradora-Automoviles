import { saveBrand, findAllBrands } from "../services/brandService.js";
import { deleteCar, findAllCars, findCarById, saveCar, updateCar } from "../services/carService.js";
import { loadSelectData } from "../utils/loadSelect.js";
import { checkAuth } from "../utils/session.js";

let car = {};
let cars = [];
let updated = {};
const rowsPerPage = 8;
let currentPage = 1;

const getAllCars = async () =>{
    try{
        cars = await findAllCars();
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

const createCar = async () =>{
    let form = document.getElementById('saveForm');
    car = {
        brand:{
            id: document.getElementById('brands').value
        },
        model: document.getElementById('model').value,
        color: document.getElementById('color').value,
        price: document.getElementById('price').value
    }
    await saveCar(car);
    car = {};
    form.reset();
    await loadContent();
}

const createBrand = async () =>{
    let form = document.getElementById('saveBrandForm');
    const brand = {
        name: document.getElementById('name').value
    }
    await saveBrand(brand);
    form.reset();
}

const updateCarDetails = async () =>{
    let form = document.getElementById('updateForm');
    updated = {
        brand: {
            id: document.getElementById('u_brands').value
        },
        model: document.getElementById('u_model').value,
        color: document.getElementById('u_color').value,
        price: document.getElementById('u_price').value
    }
    await updateCar(car.id,updated);
    updated = {};
    form.reset();
    await loadContent();
}

const removeCar = async (id) =>{
    await deleteCar(id);
    await loadContent();
}




const loadTable = async (page) => {
    await getAllCars();
    cars = cars.reverse();
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
                        <td>${item.registerDate}</td>
                        <td>$${item.price}</td>
                        <td>${item.status === true ? "Vendido" : "En Venta"}</td>
                        <td class = "d-flex justify-content-evenly text-center">
                            <button class="btn btn-outline-danger" data-bs-target="#deleteModal" data-bs-toggle ="modal" id="deleteCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg></button>
                            <button class="btn btn-outline-primary" data-bs-target="#updateModal" data-bs-toggle="modal" id="editCar-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg></button>
                            <button class="btn btn-outline-info" data-bs-target="#detailsModal" data-bs-toggle ="modal" id="carDetails-${item.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M444-288h72v-240h-72v240Zm35.79-312q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm.49 504Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg></button>
                        </td>
                    </tr>`
    });
    tbody.innerHTML = content;
    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('button[id^="editCar-"]');
        const deleButton = event.target.closest('button[id^="deleteCar-"]');
        const carDetailsButton = event.target.closest('button[id^="carDetails-"]');
        let carId;
        if (editButton) {
            carId = editButton.id.split('-')[1];
            await setDataOnForm(carId); 
        }
        if(deleButton){
            carId = deleButton.id.split('-')[1];
            await getCarById(carId);
        }
        if (carDetailsButton) {
            carId = carDetailsButton.id.split('-')[1];
            await getCarById(carId);
            await loadRequestedServices();
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


const setDataOnForm = async id =>{
    await getCarById(id);
    await loadSelectData(findAllBrands,"brands",false);
    document.getElementById("u_brands").value=car.brand.id;
    document.getElementById("u_model").value= car.model;
    document.getElementById("u_color").value= car.color;
    document.getElementById("u_price").value= car.price;
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

const loadContent = async () => {
    await loadTable(currentPage);
    renderPagination();
}

function registerEventListeners() {
    document.getElementById("saveForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        await createCar();
    });

    document.getElementById("saveBrandForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBrand();
        await loadSelectData(findAllBrands, "brands", true);
    });

    document.getElementById("updateForm").addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateCarDetails();
    });

    document.getElementById("confirmDeleteCar").addEventListener('click', async () => {
        await removeCar(car.id);
    });

    document.getElementById("btnAddCar").addEventListener('click', async () => {
        await loadSelectData(findAllBrands, "brands", true);
    });
}


(async ()=>{
    const requestedRoles = ["ROLE_ADMIN"];
    checkAuth(requestedRoles);
    await loadContent();
    registerEventListeners();
})()
