import axios from "axios";

export const getNewsByCategory = async (category, language = "eg") => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${language}&pageSize=30&category=${category}`,
    {
      headers: { "X-Api-Key": "ad582b4c3588426b85fc9bdcd632f9f0" },
    }
  );
  return response.data;
};

export const getNewsBySearch = async (search = "", language = "eg") => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?q=${search}&country=${language}&pageSize=30`,
    {
      headers: { "X-Api-Key": "ad582b4c3588426b85fc9bdcd632f9f0" },
    }
  );
  return response.data;
};

export const worldCupMatchesApi = async () => {
  const response = await fetch("http://api.cup2022.ir/api/v1/match", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgyNzEwNmY5YzMyYjNmNjM3YWMwZjciLCJpYXQiOjE2Njk2MDI1MjQsImV4cCI6MTY2OTY4ODkyNH0.a15hMjwmYWTgRnpYpepvt-si3MIHqVkSaHiZrOFIfj0",
    },
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
  // const response = await axios.get("http://api.cup2022.ir/api/v1/match", {
  //   headers: {
  //     Credentials: "same-origin",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgyNzEwNmY5YzMyYjNmNjM3YWMwZjciLCJpYXQiOjE2Njk2MDI1MjQsImV4cCI6MTY2OTY4ODkyNH0.a15hMjwmYWTgRnpYpepvt-si3MIHqVkSaHiZrOFIfj0",
  //   },
  // });
  return response;
};
