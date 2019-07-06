// export const localURL = 'http://localhost:3000/';
export let localURL = "";
if (process.env.NODE_ENV === "production") {
  localURL = "https://ocelot13.herokuapp.com/";
} else {
  localURL = "http://localhost:3000/";
}
