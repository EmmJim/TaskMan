import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4a148c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, {params: {urlProyecto}})
                    .then(respuesta => {
                        Swal.fire(
                            'Eliminado!',
                            respuesta.data,
                            'success'
                            );
            
                            //Redireccionar al inicio
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 3000);
                    })
                    .catch(error => {
                        Swal.fire(
                            'Hubo un error!',
                            'Algo salió mal',
                            'success'
                            );
                    })
            }
        })
    })
}

export default btnEliminar;