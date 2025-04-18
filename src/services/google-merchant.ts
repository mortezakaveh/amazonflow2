/**
 * Represents a product from a Google Merchant XML feed.
 */
export interface Product {
  /**
   * The ID of the product.
   */
  id: string;
  /**
   * The title of the product.
   */
  title: string;
  /**
   * The description of the product.
   */
  description: string;
  /**
   * The link to the product page.
   */
  link: string;
  /**
   * The image URL of the product.
   */
  imageLink: string;
  /**
   * The price of the product.
   */
  price: string;
}

/**
 * Asynchronously retrieves products from a Google Merchant XML feed URL.
 *
 * @param feedUrl The URL of the Google Merchant XML feed.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(feedUrl: string): Promise<Product[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '123',
      title: 'Sample Product',
      description: 'This is a sample product.',
      link: 'https://example.com/product1',
      imageLink: 'https://example.com/product1.jpg',
      price: '29.99 USD',
    },
  ];
}
