import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const createRoom = async (payload: { email: string }) =>
  await axios.post("/room/create", payload, axiosConfig);

// email: string;
// offer: RTCSessionDescription;
export const joinRoom = async (room: string, payload: {}) =>
  await axios.post(`/room/join/${room}`, payload, axiosConfig);

export const getStream = async (room: string, payload: {}) =>
  await axios.post(`/room/stream/${room}`, payload, axiosConfig);
