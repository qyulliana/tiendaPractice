import React from 'react';
import Productos from "./Productos";

function Tienda({productos, AgregarProductoAlCarrito})  {
  return(
    <div>
      <h1>Tienda</h1>
      <Productos productos={productos} AgregarProductoAlCarrito={AgregarProductoAlCarrito}/>

    </div>
  )

}

export default Tienda;