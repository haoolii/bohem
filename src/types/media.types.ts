export type MediaShortenActionBody = {
    file: File;
    type: string;
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
};