import 'tailwindcss/tailwind.css';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { Cart, CartProduct, Product } from '../../types';
import SearchBox from '../../components/SearchBox';
import CartModal from '../../components/CartModal';
import TopBar from '../../components/TopBar';

type Props = {
    products: Product[];
    cart: Cart;
};

function getCartSize(products: Record<number, CartProduct>): number {
    let size = 0;
    Object.keys(products).forEach((key) => {
        const item = products[parseInt(key, 10)];
        size = item ? (size += item.quantity) : size;
    });
    return size;
}

function HomePage({ products, cart }: Props): JSX.Element {
    const [cartState, setCartState] = useState(cart);
    const [showModal, setShowModal] = useState(false);

    async function onAddToCartClick({ id, price, name }: Product) {
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
                <div
                    id="products"
                    className="grid md:grid-cols-2 sm:grid-cols-1 justify-around gap-x-12 mb-20 ml-20 mr-20"
                >
                    {products.map((item) => (
                        <ProductCard
                            item={item}
                            key={item.id}
                            addToCart={onAddToCartClick}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<GetServerSidePropsResult<Props>> => {
    try {
        const { page } = context.query;
        if (Number.isNaN(parseInt(page as string, 10))) {
            return { notFound: true };
        }

        const [productResponse, cartResponse] = await Promise.all([
            fetch(`http://localhost:8080/products?_page=${page}&_limit=10`),
            fetch(`http://localhost:8080/carts/${1}`),
        ]);

        const [products, cart] = await Promise.all([
            productResponse.json(),
            cartResponse.json(),
        ]);

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
        return {
            props: {
                products,
                cart,
            },
        };
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
};

export default HomePage;
