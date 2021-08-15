import App, { AppContext, AppProps } from 'next/app';
import { useState } from 'react';
import CartModal from '../components/CartModal';
import TopBar from '../components/TopBar';
import SearchBox from '../components/SearchBox';
import { Cart, CartProduct, Product } from '../types';

type Props = AppProps & { cart: Cart };

async function updateCart(
    { id, price, name }: Product,
    cartState: Cart,
    setCartState: (update: (prev: Cart) => Cart) => void,
) {
    const res = await fetch(
        `http://localhost:3000/api/add-to-cart/${id}?userId=${1}`,
    );

    if (res.ok) {
        const item = cartState.products[id];
        if (item) {
            const updatedProducts = { ...cartState.products };

            updatedProducts[id] = { ...item, quantity: item.quantity + 1 };
            setCartState((prev) => ({
                ...prev,
                products: updatedProducts,
            }));
        } else {
            const updatedProducts = { ...cartState.products };
            updatedProducts[id] = { id, quantity: 1, price, name };
            setCartState((prev) => ({
                ...prev,
                products: updatedProducts,
            }));
        }
    } else {
        // TODO: Error handling
    }
}

function MyApp({ Component, pageProps, cart }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [cartState, setCartState] = useState(cart);

    async function onAddToCartClick(product: Product) {
        return updateCart(product, cartState, setCartState);
    }

    const props = {
        ...pageProps,
        onAddToCartClick,
    };

    return (
        <>
            {showModal && (
                <CartModal setShowModal={setShowModal} cart={cartState} />
            )}
            <div className="flex flex-col">
                <TopBar
                    setShowModal={setShowModal}
                    cartProducts={cartState.products}
                />
                <SearchBox />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...props} />
            </div>
        </>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const response = await fetch(`http://localhost:8080/carts/${1}`);
    const cart = await response.json();

    /*
     * Since the cart data is provided with only an id
     * and quantity, we do some processing so that we
     * have all the data we need to display to the user.
     */

    const map: Record<number, CartProduct> = {};
    await Promise.all(
        cart.products.map(
            ({ id, quantity }: { id: number; quantity: number }) =>
                fetch(`http://localhost:8080/products/${id}`)
                    .then((res) => res.json())
                    .then((res) => {
                        const item = map[id];

                        if (item) {
                            map[id] = { ...item, id: item.id + 1 };
                        } else {
                            map[id] = {
                                name: res.name,
                                price: res.price,
                                id,
                                quantity,
                            };
                        }
                    }),
        ),
    );

    cart.products = map;

    return { ...appProps, cart };
};

export default MyApp;
