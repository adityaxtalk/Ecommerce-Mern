import {useContext, useEffect, useState} from 'react'
import cartStyles from "./cart.module.css";
import AppContext from "../../services/AppContext";
import AuthContext from "../../services/AuthContext";
import AddItem from "../additem/AddItem";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
   const navigate = useNavigate();
   const [state, setState] = useContext(AppContext);
   const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
   
   const [MRP, setMRP] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [total, setTotal] = useState(0);

   const order = () => {
    if (isLoggedIn) {
      let products = [...state.products];
      for (let product of products) {
        product.quantity = 0;
      }
      setState({products, cart: []});
      navigate("/final");
    } else {
      navigate("/login");
    }
   }

   useEffect(()=> {
      let mrp=0, disc=0, total=0;
      for (let item of state.cart) {
        mrp+=item.quantity * item.price;
        disc+=item.quantity*(item.was - item.price);
        
      }
      total = mrp - disc;
      setMRP(mrp);
      setDiscount(disc);
      setTotal(total);
   }, [state.cart]);
  return (
    <div className={cartStyles.cartContainer}>
      <div className={cartStyles.heading}>Cart</div>
      <div className={cartStyles.cartWrapper}>
        <div className={cartStyles.cartDetails}>
          {state.cart.length > 0 ? (
            <>
             {state.cart.map((item)=> (
              <div className={cartStyles.cart} key={item.id}>
                <div className={cartStyles.cartLeft}>
                  <img src={item.pic} alt=""/>
                </div>
                <div className={cartStyles.cartMiddle}>
                  <div className={cartStyles.name}>{item.name}</div>
                  <div className={cartStyles.weight}>{item.weight}</div>
                  <div className={cartStyles.price}>
                    <div className={cartStyles.current}>Rs. {item.price}</div>
                    {item.was !== item.price ? (
                      <>
                        <div className={cartStyles.was}>Rs. {item.was}</div>
                        <div className={cartStyles.discount}>
                          Rs. {item.was - item.price} Off
                        </div>
                      </>
                    ): null}
                  </div>
                </div>
                <div className={cartStyles.cartRight}>
                  <AddItem item={item}/>
                </div>
              </div>
             ))}
             <div className={cartStyles.btnContainer}>
              <button className={cartStyles.orderBtn} onClick={order}>
                Place Order
              </button>
             </div>
            </>
          ) : (
            <div className={cartStyles.noItem}>
              Your Cart is empty
            </div>
          )}
        </div>
        {state.cart.length > 0 ? (
          <div className={cartStyles.cartSummary}>
            <div className={cartStyles.subHeading}>Summary</div>
               <div className={cartStyles.summary}>
                  {state.cart.length === 1 ? (
                    <div className={cartStyles.summaryLabel}>
                      MRP ({state.cart.length} item)
                    </div>
                    ) : (
                    <div className={cartStyles.summaryLabel}>
                      MRP ({state.cart.length} items)
                    </div>
                  )}
                  <div className={cartStyles.summaryLabel}>Rs. {MRP}</div>
               </div>
               <div className={cartStyles.summary}>
                  <div className={cartStyles.summaryLabel}>Product Discount</div>
                  <div className={`${cartStyles.summaryLabel} ${cartStyles.disc}`}> Rs. {discount}</div>
               </div>
               <div className={`${cartStyles.summary} ${cartStyles.total}`}>
                  <div className={cartStyles.summaryLabel}>Total Amount</div>
                  <div className={`${cartStyles.summaryLabel}`}> Rs. {total}</div>
               </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Cart