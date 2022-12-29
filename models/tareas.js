import  Tarea  from "./tarea.js";


class Tareas { 

    _listado = {};

    get listadoArr() { 
        const listado = []
        Object.keys(this._listado).forEach(key => { 
            const tarea=this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }


    constructor() { 
        this._listado = {};
    }

    borrarTarea(id = '') { 
        if (this._listado[id]) { 
            delete this._listado[id];
        }
    }

    cargarTareasdeArr(tareas = []) { 
         
        tareas.forEach(tarea => { 
            this._listado[tarea.id] = tarea;
        })    
        
    }

    crearTarea(desc = '') { 
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() { 
        console.log();
        
        this.listadoArr.forEach((element,i) => {
            const id = `${i + 1}.`.green
            const { desc, completadoEn } = element;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            console.log(`${id} ${desc} :: ${estado}`)
        });
    }

    // listadoCompleto() { 
    //     let cont = 1;
    //     let verf = '';
    //     console.log();
    //     this.listadoArr.forEach(element => {
    //         if (element.completadoEn !== null) {
    //             verf = 'Completada'.green;
    //         } else { 
    //             verf = 'Pendiente'.red;
    //         }
    //         console.log(`${cont}.`.green, element.desc,' :: ',verf);
    //         cont++;
    //     });
    // }

    listarPendientesCompletadas(completado = true) { 

        let cont =0;
        this.listadoArr.forEach((element,i) => {
           
            const { desc, completadoEn } = element;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completado) { 
                if (completadoEn) { 
                    cont+=1;
                    console.log(`${cont}.`.green, desc, '::',completadoEn.green);
                }
            } else {              
                if (!completadoEn) { 
                    cont+=1;
                    console.log(`${cont}.`.green, desc, '::',estado);
                }               
            }
        });
    }


    toggleCompletadas(ids = []) { 
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) { 
                tarea.completadoEn = new Date().toISOString(); //establece la fecha en compeltadaEn y lo pasa a string
            }
        });

        this.listadoArr.forEach(tarea => { 
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

    
}

export default Tareas;
