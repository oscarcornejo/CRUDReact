import React from 'react';

const MensajeError = ({mensaje}) => {
    return ( 
        <p className="alert btn-danger p-3 my-3 text-center text-uppercase font-weight-bold">{mensaje}</p>
     );
}
 
export default MensajeError;