import React from 'react';
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component,usuarioAutenticado, ...rest}) => {
           console.log(usuarioAutenticado)
	return(
		<Route {...rest} render={props => (
			usuarioAutenticado ? (
				<Component infoUsuario={usuarioAutenticado} {...props} />
				// 	{props.children}
				// </Component>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}}/>
			)
		)}/>
	)
};

export default PrivateRoute