import React, { Component } from 'react'
import { direct } from '../../index';



class UploadImage extends Component {
         state ={
               file: null,
               all: null
         }
         handleChange = this.handleChange.bind(this) 
         handleChange (event ) { 
            this.setState ({ 
              file:URL.createObjectURL (event.target.files [0]),
              all: event.target.files [0]
            }) 
          } 
         render(){
            const divImg ={
              maxWidth:"300px",height:"auto"
            }
            const {file} = this.state;
             return (
                <div className="d-flex flex-column col-md-4"> 
                    <input type = "file" onChange = {this.handleChange} /> 
                    { file ?
                       <img src = {file} style={divImg}/> 
                       :
                       <img src={`${direct}/sin-img.jpg`} style={divImg}/>  
                    }
                </div>
             );
         }
}

export default UploadImage;