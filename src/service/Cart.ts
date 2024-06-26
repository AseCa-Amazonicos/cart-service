import {Product} from './Product';

export class Cart {
    private readonly products: Map<string, ProductInCart>; //id, info

    constructor(products?: Map<string, ProductInCart>) {
        if (products === undefined)
            this.products = new Map<string, ProductInCart>();
        else this.products = products;
    }

    public IsEmpty(): Boolean {
        return this.products.size === 0;
    }

    AddProduct(product: Product) {
        const info = this.products.get(product.id);
        if (info === undefined) {
            this.products.set(product.id, {product, amount: 1});
            return;
        }
        this.products.set(product.id, {product, amount: info.amount + 1});
    }

    /**
     * Removes one amount of the product,
     * if the product was not in the cart, it is ignored
     * @param product: the product to remove
     */
    RemoveProduct(product: Product) {
        if (!this.products.has(product.id)) return;
        const info = this.products.get(product.id);
        if (info === undefined) return;
        if (info.amount > 1) {
            this.products.set(product.id, {product, amount: info.amount - 1});
            return;
        }
        this.products.delete(product.id);
    }

    ProductsInCart(): IterableIterator<ProductInCart> {
        return this.products.values();
    }
}

export interface ProductInCart {
    product: Product;
    amount: number;
}
