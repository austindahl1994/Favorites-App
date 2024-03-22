import { userData } from "./mockData.js";

export const res = {
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  sendStatus: jest.fn().mockReturnThis(),
};

export const req = {
  body: userData,
  headers: {
    Authorization: "Bearer testToken",
  },
};
