import { api, toQuery } from "./client";
import type { Superstar, TagTeam } from "../types";

const ROSTER = "/roster";

interface SuperstarFilters {
    gender?: "M" | "F";
}

export const rosterApi = {
    getSuperstars: (filters: SuperstarFilters = {}) => api.get<Superstar[]>(`${ROSTER}/superstars${toQuery(filters)}`),
    getSuperstarById: (id: number) => api.get<Superstar>(`${ROSTER}/superstars/${id}`),
    getTagTeams: () => api.get<TagTeam[]>(`${ROSTER}/tag-teams`),
    getTagTeamById: (id: number) => api.get<TagTeam>(`${ROSTER}/tag-teams/${id}`),
};
