import { requests } from "../fixtures/requests";

export async function getRequests() {
  return requests;
}

export async function getRequestById(id: string) {
  return requests.find(r => r.id === id);
}