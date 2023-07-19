import React, {useContext, useEffect, useState} from 'react';
import '../css/Cart.css'
import useBarcodeScanner from "../hooks/useBarcodeScanner";
import {Product} from "../store/productsStore";
import {appStoreContext} from "../store/context.store";
import {observer} from "mobx-react";

interface Props {
    setIsUpdatedList: (value: boolean) => void;
}


const Cart = observer(({ setIsUpdatedList }: Props) => {
    const [product, setProduct] = useState<Product | null>(null);
    const barcodeRead = useBarcodeScanner();
    const [cartUpdated, setCartUpdated] = useState(false);
    const { cartStore } = useContext(appStoreContext)


    useEffect(() => {
        if (barcodeRead) {
            cartStore.fetchProductByBarcode(barcodeRead).then((fetchedProduct) => {
                setProduct(fetchedProduct);
            });
        }
    }, [barcodeRead, product]);

    useEffect(() => {
        if (product) {
            cartStore.addToCart(product);
        }
    }, [product]);

    const removeFromCart = (index: number) => {
        cartStore.removeFromCart(index);
        setCartUpdated(true);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const { value } = event.target;
        cartStore.cartItems[index].selectedSize = value;
    };

    const handleSell = () => {
        cartStore.sellProducts();
        cartStore.clearCart();
        setCartUpdated(!cartUpdated)
        setIsUpdatedList(true)
    }


    return (
        <div className="cart-container">
            <h3 className="cart-title">Cart</h3>
            <ul className="cart-list">
                {
                    cartStore.cartItems.map(((item, index)=> (
                        <li key={item.id}>
                            <p className="title">{item.title}</p>
                            <select
                                id="sizes"
                                className="select-size"
                                onChange={(event) => handleSizeChange(event, index)}
                            >
                                {item.sizes.map((size: string) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <p className="price">{item.soldPrice}</p>
                            <button className="remove" onClick={() =>removeFromCart(index)}>
                                x
                            </button>
                        </li>
                    )))
                }
            </ul>
            <div className="client-container">
                <div className="total-sum">total: {cartStore.calculateTotalPrice}som</div>
                <input className="client-number" type="text" placeholder="number" />
                <input className="client-number" type="text" placeholder="name" />
                <button className="sell" onClick={handleSell}>Sell</button>
            </div>
        </div>
    );
});

export default Cart;