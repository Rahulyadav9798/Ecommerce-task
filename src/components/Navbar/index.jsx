import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts } from '../../redux/actions/cartProduct'
import { userId } from '../../data/user'

const Navbar = () => {
    const cartProducts = useSelector(state => state?.cartProducts?.cartProducts?.products)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartProducts(userId))
    }, [])

    return (
        <nav className="navbar navbar-expand-lg px-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i class="fa-solid fa-bag-shopping"></i>&nbsp;
                    Shopp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" >My account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart" >
                                <span className='d-inline-block mx-2'>Cart</span>
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span className='d-inline-block count'>{cartProducts?.length}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar