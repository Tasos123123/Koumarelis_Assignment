import Client from "./AxiosClient";
const resource = "/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric";

export default {
  get(val) {
    if (val != undefined) {
      return Client.get(`${resource}?limit=` + val);
    }
    return Client.get(`${resource}`);
  },

};


