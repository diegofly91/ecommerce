import React, { Component, Fragment } from 'react'
import  { Mutation } from 'react-apollo';
import  Dropzone  from 'react-dropzone'

import { UPLOAD_FILE }  from '../../mutations';

export default class FormImage extends Component {
    state = { 
              images: this.props.image,
              id_producto: Number(this.props.id)
             };       
     render() { 
         const divStyle= {
            width: "200px" 
         }
        const direct = "http://localhost/ecommerce-graphQL/servidor";
        const {images, id_producto} = this.state;
        return (
            <Fragment>
                <div className="container border border-primary mt-2">

                <div className="d-flex justify-content-around flex-warp bg-light p-3">
                       <h4 className="text-primary pr-2"> Imagenes Producto </h4>
                        <Mutation mutation={UPLOAD_FILE} 
                                   onCompleted={ e => { 
                                    this.setState({images: this.state.images.concat([e.singleUpload])});
                                    }}
                        >
                            { singleUpload =>(   
                                    //  <div className="custom-file col-md-5">
                                    //         <input 
                                    //             type="file"
                                    //             className="custom-file-input bg-primary"
                                    //             required
                                    //             onChange={({ target: { validity, files: [file] } }) =>
                                    //                 { 
                                    //                     this.setState({file})
                                    //                     validity.valid && singleUpload({ variables: { file } })
                                    //                 }
                                    //             }
                                    //         />
                                    //         <label className="custom-file-label">Subir Imagenes</label>
                                    //  </div>
                                    <Dropzone 
                                           // onDrop={this.onDrop}
                                            onDrop={ ([file]) => {
                                                                    const req = {
                                                                                    id_producto,
                                                                                    file
                                                                                }
                                                                    singleUpload({ variables: { req }})
                                                                  }  
                                                    }
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <section className="">
                                            <div className="" {...getRootProps()} >
                                                <input {...getInputProps()} />
                                                <p className="">Arrastre o clickee para subir las imagenes</p>
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                )
                            }
                        </Mutation>
                </div>
                    {images.map((item,index) => (
                    <img src={`${direct}${item.imagen}`} key={index} style={divStyle}/>
                    ))}
                </div> 
            </Fragment>
    )}
}            

