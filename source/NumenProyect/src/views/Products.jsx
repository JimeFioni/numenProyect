import React, { Fragment, useContext } from 'react'
import { Grid } from '@mui/material'
import { TYPES } from '../services/actions/shoppingActions'
import ProductCard from '../components/Products/ProductCard'
import {
  shoppingInitialState,
  shoppingReducer,
} from '../services/reducers/shoppingReducer'
import { storeContext } from '../store/StoreProvider'
import api from '../services/utils/fetchData/api'

const Products = () => {
  // const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
  // const { products } = state

  const [store, dispatch] = useContext(storeContext)
  const { products, cart } = store
  const DATA = products || []
  const addToCart = async (id) => {
    let newItem = products.find((product) => product.id === id)
    let itemInCart = cart.find((item) => item.id === newItem.id)
    if (itemInCart) {
      await api
        .put(`cart/${itemInCart.id}`, {
          ...itemInCart,
          quantity: itemInCart.quantity + 1,
        })
        .catch((err) => console.log(err))
      dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    } else {
      await api
        .post('cart', { ...newItem, quantity: 1 })
        .catch((err) => console.log(err))
      dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    }

    // console.log(state)
  }
  return (
    <Fragment>
      <h1>Products {DATA.lenght}</h1>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {DATA.map((val, ind) => (
          <Grid item sm={12} xs={12} md={6} key={ind}>
            <ProductCard description={val} addToCart={addToCart}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

export default Products
