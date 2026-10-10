import { api } from "./client";
import type { Superstar, TagTeam } from "../types";

const ROSTER = "/roster";

export const rosterApi = {
    getSuperstars: () => api.get<Superstar[]>(`${ROSTER}/superstars`),
    getSuperstarById: (id: number) => api.get<Superstar>(`${ROSTER}/superstars/${id}`),
    getTagTeams: () => api.get<TagTeam[]>(`${ROSTER}/tag-teams`),
    getTagTeamById: (id: number) => api.get<TagTeam>(`${ROSTER}/tag-teams/${id}`),
};
