/*
--Script para generar contraseña y encriptarlo--
-- by ClAUDIO ZENKO
*/


// Función que maneja la selección de checkboxes
const checkboxHandler = (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Si el checkbox seleccionado es "SHA-1", desmarcar los demás
    checkboxes.forEach(checkbox => {
        if (checkbox !== event.target) {
            checkbox.checked = false; // Desmarcar otros checkboxes
        }
    });
};

// Añadir eventos a los checkboxes
document.getElementById('sha1').addEventListener('click', checkboxHandler);
document.getElementById('sha256').addEventListener('click', checkboxHandler);
document.getElementById('sha512').addEventListener('click', checkboxHandler);


//Funcion para generar 
const generated = async (long) =>{
    const caract = 'qwertyuiop[]asdfghjklzxcvbnm,./1234567890`-=!@#$%^&*()_+'
    let passw = ''

    for(let i = 0; i < long; i++){
        const indiceRandom = Math.floor(Math.random()* caract.length);
        passw += caract[indiceRandom];   
    }

    const algoritmos = selectAlgorimt();
    if (algoritmos){
        const hashes = await encript(passw, algoritmos);
        return hashes;
    }
}


//funcion para seleccionar el tipo de HASH
function selectAlgorimt (){
    if (document.getElementById('sha1').checked){
        return 'SHA-1';
    }
    else if (document.getElementById('sha256').checked){
        return 'SHA-256';
    }
    else if (document.getElementById('sha512').checked){
        return 'SHA-512';
    }
    return null;
    
}


// Funcion para encriptar
async function encript(msg , algoritm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(msg);
    const hashBuffer = await crypto.subtle.digest(algoritm,data);
    const hash = Array.from(new Uint8Array(hashBuffer));
    const hashex = hash.map(byte => byte.toString(16).padStart(2,'0')).join ('');

    return hashex;
}


// Mostrar en el Documento HTML

const btn = document.getElementById('contraseña')

async function mostrarpassw (){
    const aleatorio = await generated(10);
    btn.textContent = aleatorio; 

}

function borrar(){
    btn.textContent = '';
}


