export interface SignUpInfo {
    first_name: string,
    last_name: string,
    email_address: string,
    password: string
}

export interface SignInInfo {
    email_address: string,
    password: string
}

export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email_address: string
}