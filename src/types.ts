export type Product = {
    id: number;
    name: string;
    description: string;
    defaultImage: string;
    images: Array<string>;
    price: number;
    discount: number;
};
