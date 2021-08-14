import 'tailwindcss/tailwind.css';
import {
    GetStaticPathsResult,
    GetStaticProps,
    GetStaticPropsResult,
} from 'next';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import SearchBox from '../../components/SearchBox';

type Props = {
    products: Product[];
};

function HomePage({ products }: Props): JSX.Element {
    return (
        <>
            <SearchBox />
            <div
                id="products"
                className="grid md:grid-cols-2 sm:grid-cols-1 justify-around gap-x-12 m-20"
            >
                {products.map((item) => (
                    <ProductCard item={item} key={item.id} />
                ))}
            </div>
        </>
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
