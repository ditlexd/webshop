import 'tailwindcss/tailwind.css';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

type Props = {
    products: Product[];
    page: number;
    onAddToCartClick: (product: Product) => void;
};

function ProductPage({ products, onAddToCartClick, page }: Props): JSX.Element {
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

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<GetServerSidePropsResult<Props>> => {
    try {
        const { page } = context.query;
        if (Number.isNaN(parseInt(page as string, 10))) {
            return { notFound: true };
        }

        const productResponse = await fetch(
            `http://localhost:8080/products?_page=${page}&_limit=10`,
        );

        const [products] = await Promise.all([productResponse.json()]);

        return {
            // @ts-ignore
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

export default ProductPage;
