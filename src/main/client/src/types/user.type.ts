import ITeam from "./team.type.ts";
import IRole from "./role.type.ts";

export default interface IUser {
    id?: number | null,
    username: string,
    email: string,
    password: string,
    accessToken: string,
    roles?: Array<IRole>,
    isTestUser?: boolean | null,
    emailsReceived?: number | null,
    lastLogout?: string | null,
    team?: ITeam | null,
}