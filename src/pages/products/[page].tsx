import 'tailwindcss/tailwind.css';
import {
    GetStaticPathsResult,
    GetStaticProps,
    GetStaticPropsResult,
} from 'next';
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

export const getStaticProps: GetStaticProps = async ({
    params,
}): Promise<GetStaticPropsResult<Props>> => {
    const { page } = params as { page: string };

    if (Number.isNaN(parseInt(page, 10))) {
        return { notFound: true };
    }

    const response = await fetch(
        `http://localhost:8080/products?_page=${page}&_limit=10`,
    );
    const products = await response.json();

    if (!products.length) return { notFound: true };

    return {
        props: {
            products,
            cart: { id: 1, products: [] },
        },
        revalidate: 100,
    };
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const response = await fetch(`http://localhost:8080/products`);
    const products = await response.json();

    const paths = [];
    /*
     * Build pages for all paths that display the product
     * catalogue.
     */
    for (let i = 1; i < products.length / 10; i += 1) {
        paths.push({ params: { page: i.toString() } });
    }

    return {
        paths,
        fallback: 'blocking',
    };
}

export default HomePage;
