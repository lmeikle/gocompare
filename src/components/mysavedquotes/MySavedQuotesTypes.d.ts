interface QuotesJson {
    quotes: Quote[]
}

type Quote = {
    id: number;
    product: ProductType;
    name: string;
    price?: number;
    features: CarFeatures | PetFeatures
}

interface CarFeatures {
    "cover-type": string;
    claims: string;
    excess: number;
    "protected-ncb": boolean;
    "additional-drivers": string;
    "cover-start-date": string;
}

interface PetFeatures {
    breed: string;
    "cover-start-date": string;
}
