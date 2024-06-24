import React, { useEffect, useState } from 'react'
import './CartPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions/products'
import { deleteCartProduct } from '../../redux/actions/cartProduct'

const CartPage = () => {
  const productList = useSelector(state => state?.products?.products)
  const cartProducts = useSelector(state => state?.cartProducts?.cartProducts?.products)
  const dispatch = useDispatch()

  const [cartData, setCartData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    // only productId is available in cartProducts api so i find that product details form productList api
    const cartProductData = cartProducts?.map(cart => {
      const product = productList.find(p => p.id === cart.productId);
      return product ? { ...product, quantity: cart.quantity } : null;
    }).filter(item => item !== null);
    const totalPay = cartProductData?.reduce((total, product) => total + (product.price * product.quantity), 0);
    setTotalAmount(totalPay)
    setCartData(cartProductData);
  }, [cartProducts, productList])


  const handleDeleteCart = (id) => {

    const filteredCartData = cartData?.filter(item => item.id !== id)
    setCartData(filteredCartData)

    const newTotalAmount = filteredCartData?.reduce((total, product) => total + (product.price * product.quantity), 0);
    setTotalAmount(newTotalAmount);
    dispatch(deleteCartProduct(id))
  }

  const handleQuantityChange = (id, e) => {
    const { value } = e.target
    const updatedCartData = cartData?.map(item => {
      if (item.id === id) {
        return { ...item, quantity: value ? value : 0 };
      }
      return item;
    });

    const newTotalAmount = updatedCartData?.reduce((total, product) => total + (product.price * product.quantity), 0);

    setTotalAmount(newTotalAmount);
    setCartData(updatedCartData);
  };

  return (
    <section className='cart-section mt-5'>
      <div className='container'>
        <div className='cart-products'>
          {cartData?.map((item) => {
            return (
              <div className='product'>
                <div className='row align-items-center'>
                  <div className='col-lg-2'>
                    <div className='product-img'>
                      <img src={item.image} />
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='product-name'>{item.title}</div>
                  </div>
                  <div className='col-lg-2'>
                    <div className='product-qty'>
                      <input type='number' min={0} max={10} value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-2'>
                    <div className='product-price'>
                      <span>{item.quantity}</span>&nbsp;
                      <span>X</span>&nbsp;
                      ${item.price}
                    </div>
                  </div>
                  <div className='col-lg-2'>
                    <div className='product-remove'>
                      <button type='button' className='btn btn-danger btn-sm' onClick={() => handleDeleteCart(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='product-total'>
          <div className='inner-part'>
            <h2>Subtotal</h2>
            <p>${totalAmount}</p>
          </div>
          <div className='inner-part total-payment'>
            <h2>Total</h2>
            <h2>${totalAmount}</h2>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CartPage