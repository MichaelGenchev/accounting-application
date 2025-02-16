export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
}