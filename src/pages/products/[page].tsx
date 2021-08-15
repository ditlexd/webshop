import 'tailwindcss/tailwind.css';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import ProductCard from '../../components/ProductCard';
import { Cart, Product } from '../../types';
import SearchBox from '../../components/SearchBox';

type Props = {
    products: Product[];
    cart: Cart;
};

function HomePage({ products, cart }: Props): JSX.Element {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row-reverse h-14 bg-blue-200">
                <button
                    type="button"
                    className="w-20 border-2 border-gray-500 rounded bg-pink-200"
                >
                    <p className="ml-4 mr-4">Cart ({cart.products.length})</p>
                </button>
            </div>
            <SearchBox />
            <div
                id="products"
                className="grid md:grid-cols-2 sm:grid-cols-1 justify-around gap-x-12 mb-20 ml-20 mr-20"
            >
                {products.map((item) => (
                    <ProductCard item={item} key={item.id} />
                ))}
            </div>
        </div>
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
