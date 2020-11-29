export interface CoreForm{
    id : number | null;
    name : string |null;
    value : string |null;
}

export interface Geography{
    id : number | null;
    name : string |null;
}

export interface Province{
    id : number | null;
    code : string |null;
    name : string |null;
    geo : Geography | null
}

export interface Amphur {
    id : number | null;
    code : string |null;
    name : string |null;
    geo : string |null;
    province : Province | null
}

export interface District {
    id : number | null;
    code : string |null;
    name : string |null;
    geo : string |null;
    province : Province | null;
    amphur : Amphur | null;
}

export interface FormRegister{
    username: string | null;
    first_name: string |null;
    last_name: string |null;
    password: string |null;
    password2: string |null;
}
export interface Profile{
    "address": string |null;
    "mooban": string |null;
    "zipcode": string |null;
    "tel": string |null;
    "birthday": string|null;
    "age": number|null;
    "personal_id": string |null;
    "profile_image": string |null;
    "presonal_image": string |null;
    "user": number|null;
    "geo": number|null;
    "amphur": number|null;
    "district": number|null;
    "province": number|null;
    "prefix": string|null;
    "gender": string|null;
}