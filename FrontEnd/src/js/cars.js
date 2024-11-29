const URL = 'http://localhost:8080';
let response= [];
let brands = [];
let cars = [];
let car = {};
let updated = {};
let navItems = [];

//Paginación
const rowsPerPage = 5;
let currentPage = 1;


/* ----- Peticiones ----- */

const findAllBrands = async () =>{
    await fetch(`${URL}/automoviles/brand`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        }
    })

    .then(response => response.json())
    .then(response => {
        brands = response.data;
    })
    .catch(console.log);
}

const findAllCars = async () =>{

    await fetch(`${URL}/automoviles/car`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
    .then(response => {
        cars = response.data.reverse();
    })
    .catch(console.log);
}

const save = async () =>{
    let form = document.getElementById('saveForm');
    car = {
        brand:{
            id: document.getElementById('brands').value
        },
        model: document.getElementById('model').value,
        color: document.getElementById('color').value,
        price: document.getElementById('price').value
    }
    await fetch(`${URL}/automoviles/car`,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(car) 
    })
    .then(response => response.json()).then(async response => {
        car = {};
        form.reset();
        await loadContent();
    }).catch(console.log)
}

const findById = async id =>{
    await fetch(`${URL}/automoviles/car/${id}`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
    .then(response => {
        car = response.data;
    })
    .catch(console.log);
}


const update = async () =>{
    let form = document.getElementById('updateForm');
    updated = {
        brand: {
            id: document.getElementById('u_brands').value
        },
        model: document.getElementById('u_model').value,
        color: document.getElementById('u_color').value,
        price: document.getElementById('u_price').value
    }
    await fetch(`${URL}/automoviles/car/${car.id}`,{
        method: 'PUT',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(updated) 
    })
    .then(response => response.json()).then(async response => {
        car = {};
        form.reset();
        await loadContent();
    }).catch(console.log)
}

const removeCar = async () =>{
    await fetch(`${URL}/automoviles/car/${car.id}`,{
        method: 'DELETE',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json()).then(async response => {
        await loadContent();
    }).catch(console.log)
}


/* ----- Presentación de datos ----- */

const loadTable = async (page) => {
    await findAllCars();
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
                        <td>${item.price}</td>
                        <td class = "d-flex justify-content-evenly text-center">
                            <button class="btn btn-outline-danger" data-bs-target="#deleteModal" data-bs-toggle ="modal" onclick=findById(${item.id})><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg></button>
                            <button class="btn btn-outline-primary" data-bs-target="#updateModal" data-bs-toggle="modal" onclick="setDataOnForm(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentcolor"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg></button>
                        </td>
                    </tr>`
    });
    tbody.innerHTML = content;
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

const loadData = async flag =>{
    await findAllBrands();
    let select = document.getElementById(flag ? 'brands' : 'u_brands' );  
    let content = '';
    brands.forEach(item => {
        content += `<option value="${item.id}">${item.name}</option>`; 
    });
    select.innerHTML = content;
}

const setDataOnForm = async id =>{
    await findById(id);
    await loadData(false);
    document.getElementById("u_brands").value=car.brand.id;
    document.getElementById("u_model").value= car.model;
    document.getElementById("u_color").value= car.color;
    document.getElementById("u_price").value= car.price;
}

const loadContent = async () => {
    await loadTable(currentPage);
    renderPagination();
};

(()=>{
    loadContent();
})()
