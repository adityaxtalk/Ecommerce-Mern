import itemsStyles from "./items.module.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AppContext from "../../services/AppContext";
import AddItem from "../additem/AddItem";
const Items = () => {
  const params = useParams();
  const category = params["category"];
  const [state, setState] = useContext(AppContext);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    let tempItems=[];

    for (let product of state.products) {
      if (product.type === category) {
        tempItems.push(product);
      }
    }
    setItems(tempItems);
  }, [category, state.products]);

  return (
    <div className={itemsStyles.itemsContainer}>
      <div className={itemsStyles.heading}>All {category}</div>
      <div className={itemsStyles.items}>
        {items.map((item)=> {
          return (
            <div className={itemsStyles.item} key={item.id}>
              <div className={itemsStyles.picContainer}>
                <img src={item.pic} alt=""/>
              </div>
              <div className={itemsStyles.dataContainer}>
                <div className={itemsStyles.name}>{item.name}</div>
                <div className={itemsStyles.weight}>{item.weight}</div>
                <div className={itemsStyles.price}>
                  <div className={itemsStyles.current}>Rs {item.price}</div>  
                  {item.was !== item.price ? <div className={itemsStyles.was}>Rs {item.was}</div>: null}
                </div>
                <div className={itemsStyles.cta} >
                  <AddItem item={item}/>
                </div>
                
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Items