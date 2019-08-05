import React, { Component } from 'react'
import { direct } from '../../index';
import  Dropzone  from 'react-dropzone'

class UploadImage extends Component {
         state ={
               image: this.props.ruta,
               previewFile: null,
               file: null
         }
         handleChange = this.handleChange.bind(this) 
         handleChange (event ) { 
            this.setState ({ 
              previewFile:URL.createObjectURL (event.target.files [0]),
              file: event.target.files [0]
            }) 
          } 
         imgFile = () => {
            return this.state.file;
         }
         render(){
            const divImg ={
              maxWidth:"300px",height:"auto"
            }
            const {previewFile, image} = this.state;
             return (
                <div className="d-flex flex-column justify-content-center align-items-center col-md-4 p-2"> 
                     <Dropzone 
                        onDrop={ (file) => {
                              file.forEach(element => {
                                 console.log(element)
                                 if(element.type === "image/jpg" || element.type === "image/png" || element.type === "image/jpeg" ){
                                    this.setState ({ 
                                        previewFile:URL.createObjectURL (element),
                                        file: element
                                     }) 
                                 }
                              });
                                          }  
                              }
                     >
                           {({getRootProps, getInputProps}) => (
                              <section className="">
                              <div className="" {...getRootProps()} >
                                 <input {...getInputProps()} />
                                 <p className="">Arrastre o clickee para subir la imagene</p>
                              </div>
                              </section>
                           )}
                     </Dropzone>
                     {  previewFile ?
                        <img src={previewFile} style={divImg}/> 
                        : !image 
                                 ? <img src={`${direct}/sin-img.jpg`} style={divImg}/> 
                                 : <img src={`${direct}${image}`} style={divImg}/> 
                     }
                </div>
             );
         }
}

export default UploadImage;