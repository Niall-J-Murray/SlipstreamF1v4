import ITeam from "./team.type.ts";

export default interface IDriver {
    id?: number,
    carNumber?: number | null,
    shortName?: string | null,
    firstName?: string | null,
    surname?: string | null,
    nationality?: string | null,
    points?: number | null,
    standing?: number | null,
    constructor?: string | null,
    teams?: Array<ITeam> | null
}

