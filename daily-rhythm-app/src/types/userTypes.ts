export type UserRegister = {
    email: string;
    password: string;
    nickname: string;
    repeatPassword: string;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type Token = {
    id: string;
    iat: number;
}