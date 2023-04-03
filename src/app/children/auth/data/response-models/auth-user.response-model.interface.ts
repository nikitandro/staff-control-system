export interface IAuthUserResponseModel {
    accessToken: string;
    user: {
        email: string;
        id: number;
    };
}
