const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('=========================='.green);
        console.log('  Selecione una opcion'.green);
        console.log('==========================\n'.green);
    
        console.log(`${'1.'.green}Crear una tarea`);
        console.log(`${'2.'.green}Listar tareas`);
        console.log(`${'3.'.green}Listar tareas completadas`);
        console.log(`${'4.'.green}Listar tareas pendientes`);
        console.log(`${'5.'.green}Completar tareas`);
        console.log(`${'6.'.green}Borrar una tarea`);
        console.log(`${'0.'.green}salir\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opcion: ', (option) => {
            readline.close();
            resolve( option );
        })
    }); 


}

const pausa = () => { 

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar `, (option) => {
            readline.close();
            resolve(option );
        })
    });

    

}
 

module.exports = {
    mostrarMenu,
    pausa
}