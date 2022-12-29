
import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';


// const { mostrarMenu, pausa } = require('./helpers/mensajes');


const main = async () => {
    console.log('hola mundo');
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { 
        tareas.cargarTareasdeArr(tareasDB);
    }

    do {
        opt =  await inquirerMenu(); //await espera que mostrarMenu tenia una respuesta

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                tareas.listadoCompleto();              
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
        
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok=await confirmar('¿Estas seguro que desea borrar?')
                if (ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea Borrada');
                }
                
                }
            break;
        }

        guardarDB(tareas.listadoArr);   

        await pausa();

    } while (opt!=='0');
    

    // pausa();
 }

main();