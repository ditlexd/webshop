/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MyApp from '../pages/_app';
import HomePage from '../pages/products/[page]';

test('Should display a button to open cart', () => {
    const pageProps = { products: [] };
    render(
        <MyApp
            pageProps={pageProps}
            Component={HomePage}
            cart={{ id: 1, products: {} }}
        />,
    );

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
});

test('Should add item to cart if "add to bag" is clicked', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
        }),
    );

    const pageProps = {
        products: [
            {
                id: 1,
                name: 'Product',
                description: 'Description',
                defaultImage: '',
                images: [],
                price: 1234,
                discount: 0,
            },
        ],
    };
    render(
        <MyApp
            pageProps={pageProps}
            Component={HomePage}
            cart={{ id: 1, products: {} }}
        />,
    );

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add to bag'));
    await waitFor(() => {
        expect(screen.getByText('Cart (1)')).toBeInTheDocument();
    });
});

test('Should display cart if cart modal is clicked', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
        }),
    );

    const pageProps = {
        products: [
            {
                id: 1,
                name: 'Product',
                description: 'Description',
                defaultImage: '',
                images: [],
                price: 1234,
                discount: 0,
            },
        ],
    };

    render(
        <MyApp
            pageProps={pageProps}
            Component={HomePage}
            cart={{
                id: 1,
                products: {
                    1: {
                        id: 1,
                        name: 'Product',
                        description: 'Description',
                        price: 1234,
                        quantity: 1,
                    },
                },
            }}
        />,
    );

    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cart (1)'));

    await waitFor(() => {
        expect(screen.getByText('Items in cart')).toBeInTheDocument();
    });
});
