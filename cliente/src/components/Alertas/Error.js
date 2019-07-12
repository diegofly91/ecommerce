import React from 'react'


 const Error = ({error}) => {
     const message = (error.message) ? error.message : error;
    return (
        <p className="alert alert-danger text-center p-2 m-0">
            {message}
        </p>
    )
}
export default Error;