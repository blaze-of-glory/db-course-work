export class CreateMaterialDto {
    materialDetails: CreateMaterialDetailsDto;
    providerId: number;
}

export class CreateMaterialDetailsDto {
    img: string;
    title: string;
    description: string;
}
