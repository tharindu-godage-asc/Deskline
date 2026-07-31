import { requests } from "../fixtures/requests";


export function createRequest(
  request: any,

) {
  requests.unshift(request);
}