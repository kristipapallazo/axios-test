import { useEffect } from "react";
import "./App.css";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const APP_URL: string = "http://localhost:4000";

export const SOCKET_URL: string = "http://localhost:4000";

export const AXIOS_TIMEOUT_DURATION: number = 5000;

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    console.log("request in interceptor :>> ", request);
    const { responseType } = request;
    if (responseType === "text") {
      request.responseType = "json";
    }
    // throw new Error("throwing error in the request interceptor");
    return request;
  },
  (error: AxiosError) => {
    console.log("error in request interce ptor :>> ", error);
    alert("error in request catch");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log("response in interceptor :>> ", response);
    // throw new Error("test");
    console.log("typeof response.data :>> ", typeof response.data);
    return response;
  },
  (error: AxiosError) => {
    alert("error in response catch");
    console.log("error in response interceptor :>> ", error);
    return Promise.reject({ error: true, message: error.message });
  }
);

let isInit = true;
function App() {
  const init = async () => {
    try {
      const url = "https://covid-19-statistics.p.rapidapi.com/regions";
      const options: AxiosRequestConfig = {
        // method: "GET",
        // url: "https://covid-19-statistics.p.rapidapi.com/regions",
        headers: {
          "x-rapidapi-key":
            "4ba994b72cmsh9e4f7ffc35b9623p1051f0jsn0f22bcfeb717",
          "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
          "x-header-test": "true",
        },
        // responseType: "json",
      };
      const res = await instance.get(url, options);
      console.log("res :>> ", res);
      const { data } = res;
      console.log("data :>> ", data);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      alert("error in tcatch");
      console.log("e :>> ", e);
      return { error: true, message: e.message };
    }
  };
  const handleFetch = async () => {
    const url = "https://covid-19-statistics.p.rapidapi.com/regions";
    const options = {
      method: "GET",
      // url: "https://covid-19-statistics.p.rapidapi.com/regions",
      headers: {
        "x-rapidapi-key":
          "4ba994b72cmsh9e4f7ffc35b9623p1051f0jsn0f22bcfeb717xx",
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
      },
    };
    const res = await fetch(url, { headers: options.headers })
      .then((res) => {
        console.log("res :>> ", res);
        return res.json();
      })
      .then((data) => {
        console.log("data :>> ", data);
        return data;
      })
      .catch((error) => {
        console.log("error :>> ", error);
        return { error: true, message: error.message };
      });

    console.log("final res :>> ", res);
    return res;
  };
  useEffect(() => {
    if (isInit) {
      const test = async () => {
        const finalData = await init();
        console.log("finalData :>> ", finalData);
        // handleFetch();
        return finalData;
      };
      test();
      isInit = false;
    }
  }, []);

  return <div></div>;
}

export default App;
