import React, {Fragment} from 'react'
import { direct } from '../../../index';
import {Link} from 'react-router-dom'

const ViewTopCateg =  ({categoria}) => {
    const {nombre} =  categoria;
    return(
        <div key={categoria.id} className="d-flex justify-content-center flex-column">
            <h2 className="text-center">{nombre}</h2>
            {categoria.image !== null ?
                <img src={`${direct}${categoria.image}`}  alt="" className="img-fluid m-auto"/> 
                : ''          
            }
            <div className="d-flex flex-wrap justify-content-around">
                {categoria.subcategory.map(item=>{
                    return(
                        <div className="col-md-3" key={item.id}>
                            <Link to={`/Tienda/${item.ruta}`} >
                                <h3 className="text-center">{item.nombre}</h3>
                                <figure>
                                    {item.image !== null ?
                                        <img src={`${direct}${item.image}`}  alt="" className="img-fluid"/> 
                                        : <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
                                    }
                                </figure>
                            </Link>
                        </div>
                    )
                })}   
             </div> 
        </div>
    )
}

export default ViewTopCateg;