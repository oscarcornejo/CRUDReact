import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

import axios from 'axios';

import Header from './components/Header';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import Productos from './components/Productos';
import Producto from './components/Producto';


function App() {


  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(
    () => {
      if (recargarProductos) {
        const consultar = async () => {
          // Consultar la API de Json-Server
          const resultado = await axios.get('http://localhost:4000/restaurant');
  
          console.log(resultado.data);
          guardarProductos(resultado.data);
        }
  
        consultar();

        // Cambiar a false la recarga de los productos
        guardarRecargarProductos(false);
      }
    }, [recargarProductos]
  )


  return (
    <Router>
      <Header />

      {/* Container Principal */}
      <main className="container mt-5">
        {/* RUTAS */}
        <Switch>
          {/* Para pasar datos a un componente se debe hacer con render */}
            <Route exact path="/productos" render={ () => {
                return (
                  <Productos productos={productos} guardarRecargarProductos={guardarRecargarProductos} />
                )
              }
            } />
            <Route exact path="/nuevo-producto" render={
              () => {
                return(
                  <AgregarProducto guardarRecargarProductos={guardarRecargarProductos} />
                )
              }
            } />
            <Route exact path="/productos/:id" component={Producto} />
            <Route exact path="/productos/editar/:id" render={
              (props) => {
                
                console.log('props: ', props);
                console.log('props.match: ', props.match);
                console.log('props.match.params.id: ', props.match.params.id);

                // Tomar el ID del producto
                const idProducto = parseInt(props.match.params.id);

                // El producto que se pasa al state
                const producto = productos.filter(producto => producto.id === idProducto);
                console.log(producto);

                return (
                  <EditarProducto producto={producto[0]} guardarRecargarProductos={guardarRecargarProductos} />
                )
              }
            } />
        </Switch>
      </main>

      <p className="mt-4 p2 text-center">Todos los Derechos Reservados!</p>
    </Router>
  );
}

export default App;
