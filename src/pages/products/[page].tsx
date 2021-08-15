import 'tailwindcss/tailwind.css';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import ProductCard from '../../components/ProductCard';
import { Cart, CartProduct, Product } from '../../types';

type Props = {
    products: Product[];
    cartState: Cart;
    setCartState: (
        update: (prev: Cart) => {
            id: number;
            products: Record<number, CartProduct>;
        },
    ) => void;
};

function HomePage({ products, cartState, setCartState }: Props): JSX.Element {
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

        const [products] = await Promise.all([productResponse.json()]);

        return {
            // @ts-ignore
            props: {
                products,
            },
        };
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
};

export default HomePage;
