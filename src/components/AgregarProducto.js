import React, { useState } from 'react';
import MensajeError from './MensajeError';

import { withRouter } from 'react-router-dom';
 
import axios from 'axios';
import Swal from 'sweetalert2';

const AgregarProducto = ({history, guardarRecargarProductos}) => {

    const [nombrePlatillo, guardarNombre] = useState('');
    const [precioPlatillo, guardarPrecio] = useState('');
    const [categoria, guardarCategoria] = useState('');
    const [error, guardarError] = useState(false);


    const categoriaOption = (e) => {
        guardarCategoria(e.target.value);
    }

    const agregarProducto = async (e) => {
        e.preventDefault();

        if(nombrePlatillo === '' |  precioPlatillo === '' || categoria === '') {
            guardarError(true);
            return;
        }

        // SE CREA NUEVO PRODUCTO 
        try {
            const url = 'http://localhost:4000/restaurant';
            const resultado = await axios.post(url, {
                nombrePlatillo,
                precioPlatillo,
                categoria
            });

            console.log(resultado);
            if (resultado.status === 201) {
                Swal.fire(
                    '¡Producto Creado!',
                    'El producto se creo correctamente',
                    'success'
                  )
            }
        } catch (error){
            console.error(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'El producto no pudo ser creado, favor inténtalo más tarde'
            })
        }

        // Redirigir al usuario a productos
        guardarRecargarProductos(true);
        history.push('/productos');

        guardarError(false);

    }
    
    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>

            { (error) ? <MensajeError mensaje="*Todos los campos son obligatorios" /> : null}

            <form className="mt-5" onSubmit={agregarProducto}>
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input type="text" className="form-control" 
                        name="nombre" placeholder="Nombre Platillo"
                        onChange={(e) => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input type="number" className="form-control" 
                        name="precio" placeholder="Precio Platillo"
                        onChange={(e) => guardarPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="postre" 
                            onChange={categoriaOption}
                        />
                        <label className="form-check-label">Postre</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="bebida"
                            onChange={categoriaOption}
                        />
                        <label className="form-check-label">Bebida</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="cortes"
                            onChange={categoriaOption}
                        />
                        <label className="form-check-label">Cortes</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="ensalada"
                            onChange={categoriaOption}
                        />
                        <label className="form-check-label">Ensalada</label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
     );
}
 
export default withRouter(AgregarProducto);