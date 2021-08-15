import { Product } from '../types';

type Props = { item: Product; addToCart: (product: Product) => void };

export default function ProductCard({ item, addToCart }: Props): JSX.Element {
    return (
        <div className="flex mt-10 border-4 border-yellow-800">
            <div role="tab" className="flex-none w-48 relative border-2">
                <img
                    src={item.images[0] ?? item.defaultImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <form className="flex-auto p-6" onSubmit={() => addToCart(item)}>
                <div className="flex flex-wrap">
                    <h1 className="flex-auto text-xl font-semibold">
                        {item.name}
                    </h1>
                    <div className="text-xl font-semibold text-gray-500">
                        {item.price}kr
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2 mb-2">
                        {item.description}
                    </div>
                </div>
                <div className="flex space-x-3 text-sm font-medium">
                    <div className="flex-auto flex space-x-3 md:h-full sm:h-1/2">
                        <button
                            className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
                            type="submit"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
