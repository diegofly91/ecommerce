import React, { Component, Fragment, useContext } from 'react'
import { List, Segment, Icon, Input } from 'semantic-ui-react'
import { direct } from '../../index';
import { Link } from 'react-router-dom';
import {CartContext} from '../context'

export default function Cart(){
        const {cart} = useContext(CartContext);
        console.log(cart)
        return (
          <Fragment>
            <h2 className="text-center">Carrito</h2>
            <ul className="list-group col-md-10 mx-auto">
                <li className="list-group-item"> 
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6"><h1>Producto</h1></div>
                        <div className="col-md-3"><h1>Descuentos</h1></div>
                        <div className="col-md-3"><h3 className="text-right">Subtotal</h3></div>
                    </div>
                </li>
                {cart.map( (item, index) => (
                   <li className="list-group-item" key={index}> 
                      <div className="row justify-content-between align-items-center">
                         <div className="col-md-6">
                            <h3>{item.product.nombre}</h3>
                            <figure>
                                {item.product.image[0] !== undefined ?
                                    <img src={`${direct}${item.product.image[0].imagen}`}  alt="" className="img-responsive"/> 
                                    :  <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
                                }
                            </figure>
                         </div>
                         <div className="col-md-3">
                             <h1>Descuentos</h1>
                         </div>
                         <div className="col-md-3">
                             <h3 className="text-right">Subtotal</h3>
                         </div>
                      </div>
                   </li>
                ))}
            </ul>  
          </Fragment>
      )
}
