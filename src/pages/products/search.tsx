import 'tailwindcss/tailwind.css';
import { GetServerSideProps } from 'next';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard';

type Props = {
    products: Product[];
    onAddToCartClick: (product: Product) => void;
    page: number;
};

function SearchPage({ products, onAddToCartClick, page }: Props): JSX.Element {
    if (!products.length) {
        return <h1>There were no matches for your search</h1>;
    }

    return (
        <>
            <div className="flex flex-row ml-20 mt-4 justify-between mr-20">
                <div>
                    {page > 1 && (
                        <a href={`/products/${page - 1}`}> Previous </a>
                    )}
                </div>
                <a href={`/products/${page + 1}`}> Next </a>
            </div>
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
                page: parseInt(page as string, 10),
            },
        };
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
};

export default SearchPage;
