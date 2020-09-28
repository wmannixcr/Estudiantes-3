
"use strict";

window.addEventListener('load', init, false);

function init(e) {

    var bdEstudiantes = [];
    var nombreInput = document.getElementById('nombreInput');
    var apellidosInput = document.getElementById('apellidosInput');
    var notaInput = document.getElementById('notaInput');
    var emailInput = document.getElementById('emailInput');
    var btnIngresar = document.getElementById('btnIngresar');

    var estudianesTbl = document.getElementById('estudianesTbl');

    var columnas = ['Nombre','Apellidos','Nota','Email','Eliminar'];

    btnIngresar.onclick = ingresarEstudiante;

    agregarEstudiante('Mario', 'Lopez', '95', 'mlopez@mail.com');
    agregarEstudiante('Laura', 'Morales', '65', 'lmorales@mail.com');
    agregarEstudiante('Pedro', 'Arias', '80', 'parias@mail.com');
    agregarEstudiante('Maria', 'Salas', '75', 'msalas@mail.com');

    crearTabla();

    nombreInput.onkeyup = validateInput;
    apellidosInput.onkeyup = validateInput;
    notaInput.onkeyup = validateInput;
    emailInput.onkeyup = validateInput;

    function validateInput(e) {
        if (e.target.value === '') {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
    }

    function ingresarEstudiante() {
        var isOk = true;

        if (nombreInput.value === '') {
            isOk = false;
            nombreInput.className = 'error';
        }

        if (apellidosInput.value === '') {
            isOk = false;
            apellidosInput.className = 'error';
        }

        if (notaInput.value === '' || notaInput.value < 0 || notaInput.value > 100) {
            isOk = false;
            notaInput.className = 'error';
        }

        if (emailInput.value === '') {
            isOk = false;
            emailInput.className = 'error';
        }

        if (isOk) {
            agregarEstudiante(nombreInput.value,apellidosInput.value,notaInput.value,emailInput.value);
            crearTabla();
        } else {
            alert('Ingresar los datos marcados.');
        }
    }

    function agregarEstudiante(nombre, apellidos, nota, email) {

        var indice = bdEstudiantes.length - 1;

        for ( var i = 0; i <= indice; i++ ) {
            if (email === bdEstudiantes[i].emailInput.value) {
                alert('El estudiante ya existe');
                return;
            }
        }

        bdEstudiantes.push({nombreInput:nombre, apellidosInput:apellidos, notaInput:nota, emailInput:email});
        limpiarInput();
    }

    function crearTabla() {

        estudianesTbl.innerHTML = '';


        var fila = document.createElement('tr');
        estudianesTbl.appendChild(fila);

        for (let index = 0; index < columnas.length; index++) {
            var filaTitulo = document.createElement('th');
            fila.appendChild(filaTitulo);
            filaTitulo.innerText = columnas[index];
        }

        fila.className = 'colorTitulo';

        for (let index = 0; index < bdEstudiantes.length; index++) {
            var estudiante = bdEstudiantes[index];

            fila = document.createElement('tr');
            estudianesTbl.appendChild(fila);
            fila.style.userSelect = 'none';

            var celda = document.createElement('td');
            fila.appendChild(celda);
            celda.innerText = estudiante.nombreInput;

            var celda = document.createElement('td');
            fila.appendChild(celda);
            celda.innerText = estudiante.apellidosInput;

            var celda = document.createElement('td');
            fila.appendChild(celda);
            celda.innerText = estudiante.notaInput;

            var celda = document.createElement('td');
            fila.appendChild(celda);
            celda.innerText = estudiante.emailInput;

            var celda = document.createElement('td');
            fila.appendChild(celda);
            celda.innerText = 'Eliminar';
            celda.className = 'btnEliminar';

            celda.indiceEstudiante = index;
            celda.addEventListener('click', onClickEliminaFila, false);

            if (estudiante.notaInput < 80) {
                fila.style.color = 'red';
			} else {
                fila.style.color = 'black';
            }

        }

        estudianesTbl.setAttribute("border", "2");
    }

    function onClickEliminaFila(e) {
        eliminarEstudiante(e.target.indiceEstudiante)
    }

    function eliminarEstudiante (index) {
        bdEstudiantes.splice(index,1);
        console.log(bdEstudiantes);
        crearTabla();
    }

    function limpiarInput() {
        nombreInput.value = '';
        apellidosInput.value = '';
        emailInput.value = '';
        notaInput.value = '';
    }
    console.log(bdEstudiantes);
}

