import { CartProduct } from '../types';

type Props = {
    setShowModal: (prev: (prev: boolean) => boolean) => void;
    cartProducts: Record<number, CartProduct>;
};

function getCartSize(products: Record<number, CartProduct>): number {
    let size = 0;
    Object.keys(products).forEach((key) => {
        const item = products[parseInt(key, 10)];
        size = item ? (size += item.quantity) : size;
    });
    return size;
}

export default function TopBar({ setShowModal, cartProducts }: Props) {
    return (
        <div className="flex flex-row-reverse h-14 bg-blue-200">
            <button
                type="button"
                className="w-20 border-2 border-gray-500 rounded bg-pink-200"
                onClick={() => setShowModal((prev: boolean) => !prev)}
            >
                <p className="ml-4 mr-4">Cart ({getCartSize(cartProducts)})</p>
            </button>
        </div>
    );
}
