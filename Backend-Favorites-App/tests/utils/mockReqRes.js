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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQXVzdGluIiwiaWF0IjoxNzA1MzYxMDgyfQ.ZvnETFNKcT5Tutf3xjj7N2K6mlJwDsH2RJxOWcUmfoY",
  },
};
