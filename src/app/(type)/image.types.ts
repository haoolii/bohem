export type ImageShortenActionBody = {
    file: File;
    type: string;
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
};

export type UrlShortenActionBody = {
    url: string;
    type: string;
    expireIn: number;
};
