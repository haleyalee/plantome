import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer'

// import icons
import shoppingCart from '../images/icons/shopping-cart.svg';
import userProfile from '../images/icons/user.svg';
import search from '../images/icons/search.svg';
import x from '../images/icons/x-lg.svg';

// import styles
import '../styles/Nav.css';

// import components
import ShoppingCart from './ShoppingCart';
import Plant from '../entities/plant';

type Props = {
  cart: Plant[],
  addToCart: (item:Plant)=>void,
  removeFromCart: (item:Plant)=>void
}

function Nav(props:Props):JSX.Element {

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="container py-2">
      <nav className="navbar navbar-expand-lg navbar-light">

        {/* Brand */}
        <Link to="/" className="navbar-brand">🌱 plantome</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          {/* Page Navigation */}
          <ul className="navbar-nav mr-auto">
            {/* Shop Plants */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  shop plants
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/plants" className="dropdown-item">all plants</Link>
                  <Link to="/plants/best-sellers" className="dropdown-item">best sellers</Link>
                  <Link to="plants/sale" className="dropdown-item">sale</Link>
                  <div className="dropdown-divider"></div>
                  {/* <Link to="/plants/air" className="dropdown-item">air</Link> */}
                  {/* <Link to="plants/aquatic" className="dropdown-item">aquatic</Link> */}
                  <Link to="plants/beginner" className="dropdown-item">beginner</Link>
                  <Link to="plants/low-maintenance" className="dropdown-item">low-maintenance</Link>
                  <Link to="plants/pet-friendly" className="dropdown-item">pet-friendly</Link>
                  <Link to="plants/succulents-cacti" className="dropdown-item">succulents &amp; cacti</Link>
                  <Link to="plants/tropical" className="dropdown-item">tropical</Link>
                </div>
            </li>
            {/* About Page */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">about</Link>
            </li>
            {/* Contact Page */}
            <li className="nav-item">
              <Link to="/contact" className="nav-link">contact</Link>
            </li>
          </ul>

          {/* Icons */}
          <ul className="navbar-nav ml-auto">
            {/* Search */}
            <li className="nav-item dropdown px-2">
                <a className="nav-link" href="#" role="button" id="searchDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={search} alt="Search" width="24px" height="24px"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right p-2" aria-labelledby="searchDropdown">
                  <div className="dropdown-item p-0">
                    <input type="text" className="form-control" placeholder="Search" aria-label="search" />
                  </div>
                </div>
            </li>
            {/* User Profile */}
            <li className="nav-item px-2">
              <a href="#" className="nav-link">
                <img src={userProfile} alt="User Profile" width="24px" height="24px"/>
              </a>
            </li>
            {/* Shopping Cart */}
            <li className="nav-item px-2">
              <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <div className="position-relative">
                  <button className="icon position-absolute top-0 end-0" onClick={()=> setCartOpen(false)} >
                    <img src={x} alt="Close Shopping Cart" width="24px" height="24px" />
                  </button>
                </div>
                <div>
                  <ShoppingCart cart={props.cart} addToCart={props.addToCart} removeFromCart={props.removeFromCart}/>
                </div>
              </Drawer>
              <a className="nav-link position-relative" role="button" onClick={()=> setCartOpen(true)}>
                <img src={shoppingCart} alt="Shopping Cart" width="24px" height="24px"/>
                <span className="position-absolute translate-middle start-100 badge rounded-pill bg-secondary">{props.cart.length}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
