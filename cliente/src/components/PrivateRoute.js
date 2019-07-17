import React from 'react';
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component,usuarioAutenticado,refetch, ...rest}) => {
	refetch();
	return(
		<Route {...rest} render={props => (
			usuarioAutenticado ? (
				<Component infoUsuario={usuarioAutenticado} {...props} />
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