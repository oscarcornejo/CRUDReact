import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

const ListaProductos = ({producto, guardarRecargarProductos}) => {

    const { nombrePlatillo, categoria, precioPlatillo} = producto;

    const eliminarProducto =  (id) => {
        console.log(id);

        // TODO: ELIMINAR LOS REGISTROS

        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Un platillo eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
          }).then( async (result) => {
            if (result.value) {

                try {
                    const url = `http://localhost:4000/restaurant/${id}`;
                    const resultado = await axios.delete(url);
                    console.log(resultado);

                    if (resultado.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'El producto se ha eliminado',
                            'success'
                        )
                        // CONSULTAR ESTADO PARA RECARGAR API
                        guardarRecargarProductos(true);
                    }
                } catch (error) {
                    console.error(error);
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'El producto no pudo ser eliminado, favor inténtalo más tarde'
                        })
                }
            }
          })
    }

    return ( 

        <li data-categoria={categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {nombrePlatillo}
                <span className="font-weight-bold ml-2">${precioPlatillo}</span>
            </p>

            <div>
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-success mr-2">Editar</Link>

                <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
        </li>

     );
}
 
export default ListaProductos;