import React, {Fragment} from 'react'
import ListaProductos from './ListaProductos';

const Productos = ({productos, guardarRecargarProductos}) => {
    return ( 
        <Fragment>
            <h1 className="text-center">Listado de Productos</h1>
            <ul className="list-group mt-5">
                {
                    productos.map( (producto) => {
                        return (
                            <ListaProductos key={producto.id} producto={producto} guardarRecargarProductos={guardarRecargarProductos} />
                        )
                    })
                }
            </ul>
        </Fragment>
     );
}
 
export default Productos;