/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import HomePage from '../pages/products/[page]';

test('Should display a button to open cart', () => {
    render(<HomePage products={[]} cart={{ id: 1, products: [] }} />);

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
});
