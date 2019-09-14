import React, { Component, Fragment, useState, useEffect } from 'react'
import {CATEGORY_QUERY} from '../../queries';
import {useQuery} from 'react-apollo-hooks'
import Loading from '../Alertas/loader'
import Error from '../Alertas/Error'
import ViewTopCateg from './subComponents/viewTopCateg'
import ViewProducts from './subComponents/viewProducts'
import ViewProduct from './subComponents/viewProduct'

export const MarketProducts = (props) => {
       const [ruta,setRuta] = useState(props.match.params.ruta);
       useEffect(function() {
           setRuta(props.match.params.ruta)
       })
       const { loading, data, error} = useQuery(CATEGORY_QUERY , {variables:{ ruta}})
       if(loading) return <Loading />
       if(loading) return <Error error={error} />
       const {category} = data;
       return(
        <Fragment>
                {category? 
                    (category.activo)?
                    <Fragment>
                        <ViewTopCateg categoria={data.category} />
                        <ViewProducts data={{cate: true,ruta,id_categoria: category.id }} />
                    </Fragment>
                    : "":<ViewProduct ruta={ruta} />
                }
        </Fragment>
       )
}

