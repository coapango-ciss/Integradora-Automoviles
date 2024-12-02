export async function loadSelectData ( serviceFunction, entity, flag){
    try{
        const data = await serviceFunction();
        const select = document.getElementById(flag ? `${entity}` : `u_${entity}`);

        if (!select) {
            console.error(`No se encontró un elemento <select> con el id especificado`);
            return;
        }

        let options = data.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
        
        select.innerHTML = options;
    } catch (error) {
        console.error("Error al cargar los datos en el select:", error);
    }
};
