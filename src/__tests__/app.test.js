/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/products/[page]';

test('Should display a button to open cart', () => {
    render(<HomePage products={[]} cart={{ id: 1, products: [] }} />);

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
});

test('Should add item to cart if "add to bag" is clicked', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
        }),
    );

    render(
        <HomePage
            products={[
                {
                    id: 1,
                    name: 'Product',
                    description: 'Description',
                    defaultImage: '',
                    images: [],
                    price: 1234,
                    discount: 0,
                },
            ]}
            cart={{ id: 1, products: [] }}
        />,
    );

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add to bag'));
    await waitFor(() => {
        expect(screen.getByText('Cart (1)')).toBeInTheDocument();
    });
});
