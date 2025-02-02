export type ApiResponse<T> = {
    code: string;
    data: T;
    message: string;
}

export type PostShortenUrlBody = {
    content: string;
    type: string;
    expireIn: number;
};

export type PostShortenUrlResponse = ApiResponse<{
    uniqueId: string;
}>

export type PostShortenImageBody = {
    type: string;
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
    files: File[];
};
export type PostShortenImageResponse = ApiResponse<{
    uniqueId: string;
}>

export type PostShortenMediaBody = {
    type: string;
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
    files: File[];
};

export type PostShortenMediaResponse = ApiResponse<{
    uniqueId: string;
}>

export type Original = {
    id: string;
    recordId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export type GetShortenResponse = ApiResponse<{
    uniqueId: string;
    prompt: string;
    passwordRequired: boolean;
    type: string;
    expireIn: number;
    expireAt: string;
    createdAt: string;
    updatedAt: string;
    originals?: Original[];
}>;

export type PostGetShortenResponse = ApiResponse<{
    uniqueId: string;
    prompt: string;
    passwordRequired: boolean;
    type: string;
    expireIn: number;
    expireAt: string;
    createdAt: string;
    updatedAt: string;
    originals: Original[];
}>;