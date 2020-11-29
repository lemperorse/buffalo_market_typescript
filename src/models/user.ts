export interface Test{
    id: number | 0
    name: string|null,
    value : string|null
}

export interface User {
    "email": string|null,
    "username": string|null,
    "first_name": string|null,
    "last_name": string|null,
    "id": string|null,
    "is_staff": boolean|null,
    "is_superuser": boolean|null,
}