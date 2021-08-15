/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '../pages/products/[page]';

test('Should display a button to open cart', () => {
    render(<HomePage products={[]} cart={{ id: 1, products: [] }} />);

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
});

test('Should add item to cart if "add to bag" is clicked', () => {
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
    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
});
