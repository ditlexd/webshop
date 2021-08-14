import 'tailwindcss/tailwind.css';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard';
import SearchBox from '../../components/SearchBox';

type Props = {
    products: Product[];
    pageNo: string;
};

function HomePage({ products, pageNo }: Props): JSX.Element {
    const [items, setItems] = useState(products);

    console.log('SEARCH');
    if (!products.length) {
        return <h1>There were no matches for your search</h1>;
    }

    return (
        <>
            <SearchBox />
            <div
                id="products"
                className="grid md:grid-cols-2 sm:grid-cols-1 justify-around gap-x-12 m-20"
            >
                {items.map((item) => (
                    <ProductCard item={item} key={item.id} />
                ))}
            </div>
            <Link href="/products/2">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>Next</a>
            </Link>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { q, page } = context.query;
        if (Number.isNaN(parseInt(page as string, 10))) {
            return { notFound: true };
        }

        const response = await fetch(
            `http://localhost:8080/products?q=${q}&_page=${page}&_limit=10`,
        );
        const products = await response.json();

        return {
            props: {
                products,
                page,
            },
        };
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
};

export default HomePage;
