import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_DEV_URI;
} else {
  baseURL = process.env.REACT_APP_PROD_URI;
}
console.log(baseURL);
export default axios.create({
  baseURL,
});
