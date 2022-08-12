import { PROFILE } from "src/app/models/auth";

export interface IUserState{
    users: PROFILE[]
}

export const initialUserState: IUserState = {
    users: [
        {
            "userId": "e3fd94c4-e797-4699-9e95-def0f4f41836",
            "email": "anhnq@gmail.com",
            "fullName": "Nguyen Quoc Anh",
            "role": 1,
            "id": 10 
        }
    ]
}