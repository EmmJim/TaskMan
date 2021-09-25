import axios from 'axios';
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-check-circle')){
        const icono = e.target;
        const idTarea = icono.parentElement.parentElement.dataset.tarea;

        const url = `${location.origin}/tareas/${idTarea}`;
        
        //Peticion con axios
        axios.patch(url)
            .then(respuesta => {
                if(respuesta.status === 200){
                    icono.classList.toggle('complete');
                    actualizarAvance();
                }
            })
    }

    if(e.target.classList.contains('fa-trash')){
        const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;
        
                Swal.fire({
                    title: 'Deseas borrar esta tarea?',
                    text: "Una tarea eliminada no se puede recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4a148c',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!',
                    cancelButtonText: 'No, cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const url = `${location.origin}/tareas/${idTarea}`;

                        //Enviar el delete por medio de axios
                        axios.delete(url, {params: {idTarea}})
                            .then(function(respuesta){
                                if(respuesta.status === 200){
                                    //Eliminar el nodo
                                    tareaHTML.parentElement.removeChild(tareaHTML);

                                    //Opcional una alerta
                                    Swal.fire(
                                        'Tarea eliminada',
                                        respuesta.data,
                                        'success'
                                    )
                                    actualizarAvance();
                                }
                            })
                    }
                })
    }

    })
}