import React, { useEffect } from 'react'
import './HomePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions/products'
import { Link } from 'react-router-dom'
import { userId } from '../../data/user'
import moment from 'moment';
import { addCartProduct } from '../../redux/actions/cartProduct'

const formattedDate = moment().format('DD-MM-YYYY');

const HomePage = () => {
  const productList = useSelector(state => state?.products?.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const handleAddCart = (data) => {
    let params = {
      userId: userId,
      date: formattedDate,
      products: [{ productId: data.id, quantity: 1 }]
    }
    dispatch(addCartProduct(params))
  }

  return (
    <section className='home-section px-4'>
      <div className='banner'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7'>
              <h1>50% Off your <br /> First shopping</h1>
              <p>Get Exclusive Discounts: Enjoy a 50% Discount on Your First Purchase <br /> with Our Limited-Time Offer. Shop Now and Save Big!</p>
            </div>
            <div className='col-lg-5 text-center'>
              <img src='https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg' />
            </div>
          </div>
        </div>
      </div>
      <h1 className='text-center my-5'>Products</h1>
      <div className='products-list'>
        {productList?.map((item) => {
          return (
            <div className='product'>
              <div className='product-img'>
                <img src={item.image} />
              </div>
              <div class="product-body">
                <p class="product-category">{item.category}</p>
                <h3 class="product-name">
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </h3>
                <h4 class="product-price">${item.price}</h4>
                <div class="product-rating">
                  <span>{item.rating?.rate}</span>
                  <i class="fa fa-star"></i>
                </div>
              </div>
              <div className='add-to-cart'>
                <button className='add-to-cart-btn' type='button' onClick={() => handleAddCart(item)}>
                  Add to cart &nbsp;
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HomePage