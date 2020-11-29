export interface FarmForm {
    "id": number,
    "name": string,
    "address": string,
    "zipcode": string,
    "farm_image": string,
    "latitude": number | null | undefined,
    "longitude": number | null | undefined,
    "user_id": number,
    "geo"?: number,
    "amphur": number  | undefined,
    "district": number | undefined,
    "province": number  | undefined
}

