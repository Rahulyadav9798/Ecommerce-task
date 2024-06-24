import React, { useEffect } from 'react'
import './DetailPage.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../redux/actions/products';
import { addCartProduct } from '../../redux/actions/cartProduct';
import { userId } from '../../data/user';
import moment from 'moment';

const formattedDate = moment().format('DD-MM-YYYY');

const DetailPage = () => {
  const { productId } = useParams();
  const productDetail = useSelector(state => state?.products?.productDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetail(productId))
  }, [])

  const handleAddCart = () => {
    let params = {
      userId: userId,
      date: formattedDate,
      products: [{ productId: productDetail.id, quantity: 1 }]
    }
    dispatch(addCartProduct(params))
  }

  return (
    <section className='detail-section mt-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-12'>
            <div className='product-img p-3'>
              <img src={productDetail?.image} />
            </div>
          </div>

          <div class="col-lg-8 col-md-12">
            <div class="product-details p-5">
              <h2 class="product-name">{productDetail?.title}</h2>
              <div>
                <div class="product-rating">
                  <span>{productDetail?.rating?.rate}</span>
                  <i class="fa fa-star"></i>
                </div>
              </div>
              <div>
                <h3 class="product-price">${productDetail?.price}</h3>
              </div>
              <p>{productDetail?.description}</p>

              <div class="add-to-cart">
                <button class="add-to-cart-btn" onClick={handleAddCart}><i class="fa fa-shopping-cart"></i> add to cart</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailPage