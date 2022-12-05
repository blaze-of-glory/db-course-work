export class ProductDto {
    productDetails: ProductDetailsDto;
    providerId: number;
    materialId: number;
}

export interface ProductDetailsDto {
    img: string;
    title: string;
    description: string;
    type: string;
    weight: string;
    cost: string;
}
