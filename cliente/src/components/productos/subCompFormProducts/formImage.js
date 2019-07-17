import React, { Component, Fragment } from 'react'
import  { Mutation } from 'react-apollo';
import  Dropzone  from 'react-dropzone'
import { Button } from 'semantic-ui-react'
import { direct } from '../../../index';
import swal from 'sweetalert'

import { UPLOAD_FILE, REMOVE_IMG_PRPDUCT }  from '../../../mutations';

export default class FormImage extends Component {
    state = { 
              images: this.props.image,
              id_producto: Number(this.props.id)
             };             
     render() { 
         const divStyle= {
            width: "200px" 
         }
         const div2 ={
               remove : {
                   position: "absolute",
                   bottom:"10px",
                   color:"rgba(0,0,0,1)",
                   right: "5px",
                   cursor: "pointer",
               },
         }
        const {images, id_producto} = this.state;
        return (
            <Fragment>
                <div className="card">
                <div className="d-flex justify-content-around flex-warp bg-light p-3">
                       <h4 className="text-primary pr-2"> Imagenes Producto </h4>
                        <Mutation mutation={UPLOAD_FILE} 
                                   onCompleted={ e => { 
                                       //this.props.refetch();
                                    this.setState({images: this.state.images.concat([e.singleUpload])});
                                    }}
                        >
                            { singleUpload =>(   
                                    <Dropzone 
                                        onDrop={ (file) => {
                                               file.forEach(element => {
                                                   if(element.type === "image/jpg" || element.type === "image/png" || element.type === "image/jpeg" ){
                                                       const req = {
                                                                       id_producto,
                                                                       file: element
                                                                   }
                                                       singleUpload({ variables: { req }})
                                                   }
                                               });
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
                   <div className="d-flex justify-content-around flex-wrap p-2">
                        {images.map((item,index) => {
                            const {id} = item;
                            return(
                            <div style={{cursor: "pointer"}} className="card d-flex justify-content-center align-item-center m-2" key={index}>
                                <img src={`${direct}${item.imagen}`} alt=""  style={divStyle}/>
                                <Mutation mutation={REMOVE_IMG_PRPDUCT} 
                                   onCompleted={ e => { 
                                       if(e.deleteImgProduct === "se ha eliminado la imagen satisfactoriamente"){ 
                                           this.setState({ images: this.state.images.filter((s, i) => index !== i)});
                                           swal(e.deleteImgProduct, {
                                               icon: "success",
                                             });
                                       }else{
                                            swal(e.deleteImgProduct, {
                                                icon: "error",
                                            });
                                       }

                                     //this.props.refetch();
                                    // this.setState({images: this.state.images.concat([e.singleUpload])});
                                    }}
                                >
                                    { deleteImgProduct =>( 
                                    <Button circular icon="remove" 
                                                    size="big" 
                                                    style={div2.remove}
                                                    onClick={ ()  =>{
                                                        swal({
                                                            title: "Estas seguro?",
                                                            text: "Una vez eliminado, no podrá recuperar este archivo",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                          })
                                                          .then((willDelete) => {
                                                            if (willDelete) {
                                                                deleteImgProduct({variables:{id}})
                                                            } 
                                                          });
                                                        }
                                                    } 
                                    />
                                     )}
                                </Mutation>
                              </div>
                        )})}
                        
                   </div>
                </div> 
            </Fragment>
    )}
}            

