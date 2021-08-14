import { Product } from '../types';

type Props = { item: Product };

export default function ProductCard({ item }: Props): JSX.Element {
    return (
        <div className="flex mt-10 border-4 border-yellow-800">
            <div role="tab" className="flex-none w-48 relative border-2">
                <img
                    src={item.images[0] ?? item.defaultImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <form className="flex-auto p-6" onSubmit={() => alert('SUBMITTED')}>
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
                            Buy
                        </button>
                        <button
                            className="w-1/2 flex items-center justify-center rounded-md border border-gray-300"
                            type="button"
                            onClick={() => alert('Added to bag')}
                        >
                            Add to bag
                        </button>
                    </div>
                    <button
                        className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300"
                        type="button"
                        aria-label="like"
                    >
                        <svg width="20" height="20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
