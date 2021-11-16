import React, {useState} from "react";
import './App.css';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Tienda from "./componentes/Tienda";
import Inicio from "./componentes/Inicio";
import Blog from "./componentes/Blog";
import Carrito from "./componentes/Carrito";



function App() {
  const productos=[
    {id: 1, nombre:'producto 1'},
    {id: 2, nombre:'producto 2'},
    {id: 3, nombre:'producto 3'},
    {id: 4, nombre:'producto 4'}
  ];

  const[carrito, cambiarCarrito]= useState([]);

  const AgregarProductoAlCarrito= (IdProductoAgregar, nombre) => {
    //Si el carrito no tiene elementos entonces agregamos uno
    if (carrito.length === 0) {
      cambiarCarrito([{id: IdProductoAgregar, nombre:nombre, cantidad:1}]);

    } else {
      //Para poder editar el arreglo hay que clonarlo
      const NuevoCarrito=[...carrito];

      //Comprobar si el carrito ya tiene el ID del producto a agregar
      const yaEstaEnCarrito = NuevoCarrito.filter((productoDeCarrito) => {
        return productoDeCarrito.id === IdProductoAgregar

      }).length > 0;

      //Si ya tiene el producto entonces lo tenemos que actualizar.
      if (yaEstaEnCarrito) {
        // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
        // Y en base a su posicion ya actualizamos el valor.

        NuevoCarrito.forEach((productoDeCarrito, index) =>{
          if (productoDeCarrito.id === IdProductoAgregar){
            const cantidad= NuevoCarrito[index].cantidad;
            NuevoCarrito[index] = {id: IdProductoAgregar, nombre: nombre , cantidad: cantidad + 1 }
          }

        });
        // De otra forma entonces arreglamos el producto al arreglo.


      } else{
        NuevoCarrito.push(
          {
            id: IdProductoAgregar,
            nombre: nombre,
            cantidad: 1
          }

        );
      }

      // Por ultimo actualizamos el carrito.

      cambiarCarrito(NuevoCarrito);

    }
  }



  return (

      <Aapp>
        <Router>
      <Contenedor>
        <Menu>
        <NavLink to={'/'}>Inicio</NavLink>
        <NavLink to={'/blog'}>Blog</NavLink>
        <NavLink to={'/tienda'}>Tienda</NavLink>
        </Menu>
        <Main>
            <Switch>
              <Route path={'/'} exact={true} component={Inicio}/>
              <Route path={'/blog'} exact={true} component={Blog}/>
              <Route path={'/tienda'}>><Tienda productos={productos} AgregarProductoAlCarrito={AgregarProductoAlCarrito}/></Route>
            </Switch>
        </Main>
        <aside>
        <Carrito carrito={carrito}/>
        </aside>
      </Contenedor>
        </Router>
      </Aapp>


  );
}
const Main = styled.div``;

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
  
`;

const Aapp= styled.div `
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
export default App;

