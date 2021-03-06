import React from 'react'
import { CartItemContainer } from '../CartItem'
export const CartItemListDisplay = ({items, fetched})=>(
    <div>
    {fetched ? <div>
            {items.map(item=>(
                <CartItemContainer {...item.toJS()} key={item.get(`id`)}/>
            ))} {console.info("render")}
        </div> :
        <div>
            Please wait...
        </div>
    }
    </div>
);