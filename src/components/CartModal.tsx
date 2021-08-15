import { Cart } from '../types';

type Props = { setShowModal: (value: boolean) => void; cart: Cart };

export default function CartModal({ setShowModal, cart }: Props): JSX.Element {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Items in cart
                            </h3>
                        </div>
                        <div className="p-6 flex-auto">
                            {Object.keys(cart.products).map((key) => {
                                const { name, price, quantity, id } =
                                    cart.products[parseInt(key, 10)];
                                return (
                                    <div
                                        className="flex flex-row justify-between w-200"
                                        key={id}
                                    >
                                        <p>{name}</p>
                                        <p>kr {price}</p>
                                        <p>Quantity: {quantity}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
    );
}
