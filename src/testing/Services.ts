export const FetchData = (): any => {
  return fetch("http://localhost:3000/data.json").then((res) => {
    return res.json();
  });
};
