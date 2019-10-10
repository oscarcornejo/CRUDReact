import React, {useState, useRef} from 'react';
import MensajeError from './MensajeError';

import { withRouter } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

const EditarProducto = ({history, producto, guardarRecargarProductos}) => {


    // GENERAR LOS REFS
    // REF, es una forma en la que accedes directamente a un elemento del DOM, es decir, un elemento HTML
    const nombrePlatilloRef = useRef('');
    const precioPlatilloRef = useRef('');

    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');

    const editarProducto = async (e) => {
        e.preventDefault();

        // VALIDACION
        const nuevoNombrePlatillo = nombrePlatilloRef.current.value;
        const nuevoPrecioPlatillo = precioPlatilloRef.current.value;

        if ( nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' || categoria === '') {
            guardarError(true);
            return;
        }

        // REVISAR SI CAMBIO LA CATEGORIA, DE LO CONTRARIO ASIGNAR EL MISMO VALOR
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;

        // Obtener los valores del formualrio
        const editarPlatillo = {
            nombrePlatillo: nuevoNombrePlatillo,
            precioPlatillo: nuevoPrecioPlatillo,
            categoria: categoriaPlatillo
        }

        // ENVIAR REQUEST / ACTUALIZAR 
        try {
            const url = `http://localhost:4000/restaurant/${producto.id}`;
            const resultado = await axios.put(url, editarPlatillo);

            console.log(resultado);
            if (resultado.status === 200) {
                Swal.fire(
                    '¡Producto Actualizado!',
                    'El producto se actualizó correctamente',
                    'success'
                  )
            }
        } catch (error){
            console.error(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'El producto no pudo ser actualizado, favor inténtalo más tarde'
            })
        }

        guardarError(false);

        // REDIRECCIONAR y CONSULTAR ESTADO PARA RECARGAR API
        guardarRecargarProductos(true);
        history.push('/productos');

    }

    const categoriaOption = (e) => {
        guardarCategoria(e.target.value);
    }

    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

            { (error) ? <MensajeError mensaje="*Todos los campos son obligatorios" /> : null}

            <form className="mt-5" onSubmit={editarProducto}>
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input type="text" className="form-control" 
                        name="nombre" placeholder="Nombre Platillo"

                        //REF SOLO NOS DA ACCESO A LOS VALORES
                       ref={nombrePlatilloRef}
                       // De esta forma se completa/llena el campo el campo inmediatamente
                       defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input type="number" className="form-control" 
                        name="precio" placeholder="Precio Platillo"

                        //REF SOLO NOS DA ACCESO A LOS VALORES
                        ref={precioPlatilloRef}
                        // De esta forma se completa/llena el campo inmediatamente
                        defaultValue={producto.precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="postre" 
                            onChange={categoriaOption}
                            // Forma para los los radioButton y llenar el campo inmediatamente
                            defaultcheck={(producto.categoria === 'postre')}
                        />
                        <label className="form-check-label">Postre</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="bebida"
                            onChange={categoriaOption}
                            defaultcheck={(producto.categoria === 'bebida')}
                        />
                        <label className="form-check-label">Bebida</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="cortes"
                            onChange={categoriaOption}
                            defaultcheck={(producto.categoria === 'cortes')}
                        />
                        <label className="form-check-label">Cortes</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" 
                            name="categoria" value="ensalada"
                            onChange={categoriaOption}
                            defaultcheck={(producto.categoria === 'ensalada')}
                        />
                        <label className="form-check-label">Ensalada</label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
     );
}
 
export default withRouter(EditarProducto);