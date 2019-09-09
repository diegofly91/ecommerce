import React, { Component, Fragment, useContext } from 'react'
import {Buttom, Button} from 'semantic-ui-react'
import {CartContext} from '../../context'

export default function BoxAddCart({product}){
    const {addToCart} =  useContext(CartContext);
    const handleSubmit = () => {
        addToCart({product,quantity: 1});
    }
    return (
        <Fragment>
            <Button 
                  content="agregar" 
                  icon="cart" primary  
                  onClick={e=>{handleSubmit()}}
            />
        </Fragment>
    )
 };
// class BoxAddCart extends Component {
//     state ={ 
//         product: this.props.product,
//         details:  (this.props.product.detalles !== ""
//         ? JSON.parse(this.props.product.detalles)
//         : null)
//     }
//     render(){
    
//     const {product, details} = this.state;
//     return(
//         <Fragment>
//            <Button icon="cart" 
//                    content="agregar" 
//                    primary
//                    onClick={()=> {
//                             addCartBtn({product})
//                    }}
//         />
//         </Fragment>
//     );    
// }
// }

