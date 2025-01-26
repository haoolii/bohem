export type ImageShortenActionBody = {
    file: File;
    type: string;
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
};