export interface registerForm {
    age: number;
    email: string;
    name: string;
    password: string;
    password2: string;
    secondName: string;
}

export interface loginForm {
    email: string;
    password: string;
}

export interface authResponse {
    process_ok: boolean;
    token: string;
}