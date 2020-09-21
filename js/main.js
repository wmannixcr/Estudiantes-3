
"use strict";

window.addEventListener('load', init, false);

function init(e) {

    var bdEstudiantes = [];
    var nombreInput = document.getElementById('nombreInput');
    var apellidosInput = document.getElementById('apellidosInput');
    var notaInput = document.getElementById('notaInput');
    var emailInput = document.getElementById('emailInput');
    var btnIngresar = document.getElementById('btnIngresar');
    var btnEliminar = document.getElementById('btnEliminar');
    var tabla = document.createElement("table");

    var tabla   = document.createElement("table");

    var columnas = ['Nombre','Apellidos','Nota','Email','Eliminar'];

    tabla.onclick = eliminarEstudiante;

    btnIngresar.onclick = ingresarEstudiante;
    btnEliminar.onclick = eliminarEstudiante;

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

    // Se crea la tabla

    function crearTabla() {
       tabla.innerHTML = '';
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];

        // Crea un elemento <table> y un elemento <tbody>
        //var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // Crea Titulos de la tabla
        var hilera = document.createElement("tr");
        hilera.className = 'colorTitulo';

        for (var index = 0; index < columnas.length; index++) {
            console.log(columnas[index]);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(columnas[index]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            tblBody.appendChild(hilera);
        }
        // Crea las celdas
        var indice = bdEstudiantes.length;
        for (var i = 0; i < indice; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            for (var j = 0; j < columnas.length - 1; j++) {

                var campo = [];
                campo = Object.values(bdEstudiantes[i]);

                // Crea un elemento <td> y un nodo de texto
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(campo[j]);
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
                hilera.className = 'celda';
            }

            var celda = document.createElement("td");
            var textoCelda = document.createTextNode('Eliminar');
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            celda.className = 'btnEliminar';
            console.log(hilera.rowIndex);
            tblBody.appendChild(hilera);
        }

        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
        console.dir(hilera);
        console.dir(celda);
      }

    function eliminarEstudiante () {
        var index = tabla.rowIndex;
        console.log(index);
        // if (indexSelect !== '') {
		// 	indexSelect = Number(indexSelect);
            //bdEstudiantes.splice(index,1);
            //crearTabla();
            //console.log(bdEstudiantes);
        //}
    }

    function limpiarInput() {
        nombreInput.value = '';
        apellidosInput.value = '';
        emailInput.value = '';
        notaInput.value = '';
    }
    console.log(bdEstudiantes);
}

