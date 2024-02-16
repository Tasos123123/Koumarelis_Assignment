<template>
  <div class="button-container">
    <MenuButton
      v-for="button in buttonsList"
      :title="button.title"
      :onPress="handleMenuClick"
      :id="button.id"
      :active="button.active"
      :type="button.type"
      :initData="initData"
      :setDatePicked="setDatePicked"
    />
  </div>
  <div class="headerInfo-container">
    <HeaderInfo :objectVal="tempObj" />
  </div>
  <div>
    <hr class="firstHr" />
    <div class="infoBoxes-container">
      <InfoBox v-for="(obj, index) in boxesData" :objVal="obj" />
    </div>
    <hr class="secondHr" />
  </div>
  <div v-if="reRenderComponent" class="chartClass">
    <Chart :chartData="chartData" />
  </div>
</template>

<script>
/*
    MainPage component.
    Represents the main page of the widget

   */
import MenuButton from "@/components/organisms/MenuButton.vue";
import HeaderInfo from "@/components/organisms/HeaderInfo.vue";
import InfoBox from "@/components/organisms/InfoBox.vue";
import Chart from "@/components/organisms/Chart.vue";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import { toRaw } from "vue";
const WeatherRepository = RepositoryFactory.get("weather");
import {  ref } from "vue";
const reRenderComponent = ref(true);

export default {
  name: "MainPage",
  components: { MenuButton, HeaderInfo, InfoBox, Chart },
  data() {
    return {
      data: [],
      tempObj: {},
      boxesData: [],
      reRenderComponent: true,
      chartData: {
        data: ["10C", "22C", "34C", "40C"],
        categories: [10 / 2, 10 / 4, 11 / 4, 12 / 4],
      },
      datePicked: null,
      // Buttons list with the available choices
      buttonsList: [
        {
          id: 1,
          title: "Now",
          pressColor: "green",
          type: "simple",
          active: true,
        },
        {
          id: 2,
          title: "Today",
          pressColor: "green",
          type: "simple",
          active: false,
        },
        {
          id: 3,
          title: "Select Date",
          pressColor: "green",
          type: "date",
          active: false,
        },
      ],
    };
  },
  async created() {
    await this.fetchData();
    await this.initChartData();
    this.forceReRender();
  },
  methods: {

    // I create this function to re-render the chart component after the init data fuction is finished
    async forceReRender() {
      this.reRenderComponent = false;
      await this.$nextTick();
      this.reRenderComponent = true;
    },

    setDatePicked(val) {
      this.datePicked = val;
    },
    async fetchData() {
      try {
        let resp = await WeatherRepository.get();
        this.data = resp.data;
        this.initData(this.data.current);
      } catch (error) {
        console.error("Weather api call error handling:", error);
      }
    },

    // Init fuction for the chart
    initChartData() {
      let array = toRaw(this.data);
      let dates = [];
      let temperatures = [];

      // I convert each Unix timestamp in specific format to push it in array for the chart dates and values
      array.daily.map((val) => {
        let timeStamp = val.dt; // Unix timestamp of the day
        let milliseconds = timeStamp * 1000;
        let obj = new Date(milliseconds);
        let month = String(obj.getMonth() + 1).padStart(2, "0"); //Get the month
        let day = String(obj.getDate()).padStart(2, "0"); // Get the day
        let formattedDate = day + "/" + month; // Find the date example: 23/02
        if (val?.temp) {
          // Find the mean temperature of this date
          let temp = val.temp.day + val.temp.day;
          temperatures.push(Math.round(temp));
          dates.push(formattedDate);
        }
      });

      // Now in dates we have all the days from daily and in temperatures the mean temperatures
      // Set the object for the chart component
      this.chartData = { data: [...temperatures], categories: [...dates] };
    },
    //Init fuction with object as parameter with the data (current data or the proper object of the dialy forecast array)
    initData(object) {
      this.boxesData = [];

      if (object?.temp) {
        // If there is object i will calculate the mean feel like temperature
        let temperature = "--";
        if (typeof object.temp === "object") {
          temperature = object.temp?.day + object.temp?.night;
        } else {
          temperature = object.temp;
        }
        // Round the temperature
        this.tempObj = {
          value: Math.round(temperature),
          description: object.weather[0].main,
          img:
            "https://openweathermap.org/img/w/" +
            object.weather[0].icon +
            ".png",
        };
      }

      if (object?.feels_like) {
        // If there is object i will calculate the mean feel like temperature
        let valueFeel = "--";
        if (typeof object.feels_like === "object") {
          valueFeel = object.feels_like?.day + object.feels_like?.night;
        } else {
          valueFeel = object.feels_like;
        }
        // Round the feel temperature
        this.boxesData.push({
          title: Math.round(valueFeel) + "\u00B0C",
          subTitle: "Feels like",
        });
      }
      if (object?.wind_speed) {
        this.boxesData.push({
          title: object.wind_speed,
          secondTitle: "m/s",
          subTitle: "Wind",
        });
      }
      if (object?.wind_gust) {
        this.boxesData.push({
          title: object.wind_gust,
          secondTitle: "m/s",
          subTitle: "Wind Gust",
        });
      }
      if (object?.wind_deg > 0) {
        this.boxesData.push({
          title: object.wind_deg + "°",
          subTitle: "Wind Deg",
        });
      } else {
        this.boxesData.push({ title: 0 + "°", subTitle: "Wind Deg" });
      }
      if (object?.humidity) {
        this.boxesData.push({
          title: object.humidity,
          secondTitle: "%",
          subTitle: "Humidity",
        });
      }
      if (object?.pressure) {
        this.boxesData.push({
          title: object.pressure,
          secondTitle: "hPa",
          subTitle: "Pressure",
        });
      }
    },

    // Function to handle the buttons click from the user
    handleMenuClick(id) {
      this.buttonsList.forEach((obj) => (obj.active = false));
      this.buttonsList[id - 1].active = true;
      if (id == 1) {
        //IF the id=1 means current
        this.initData(this.data.current);
      } else if (id == 2) {
        // If id=2 means today, so the first object in data array (api data)
        this.initData(this.data.daily[0]);
      } else {
        // Else the user picks specific date

        // Use the toRaw vue fuction because this.data is a proxy array and i need a regular for the .map below
        let array = toRaw(this.data);

        // I convert each Unix timestamp in specific format to compare it with user date pick
        array.daily.map((val) => {
          let timeStamp = val.dt; // Unix timestamp of the day
          let milliseconds = timeStamp * 1000;
          let obj = new Date(milliseconds);
          let year = obj.getFullYear(); //Get the year
          let month = String(obj.getMonth() + 1).padStart(2, "0"); //Get the month
          let day = String(obj.getDate()).padStart(2, "0"); // Get the day
          let formattedDate = year + "-" + month + "-" + day;
          if (formattedDate == this.datePicked) {
            this.initData(val);
          }
        });
      }
    },
  },
};
</script>

<style scoped>


.headerInfo-container {
  padding: 0px 20px;
}
.infoBoxes-container {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  padding: 0px 20px;
}

@media only screen and (max-width: 500px) {
  .infoBoxes-container {
    flex-wrap:nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.button-container {
  padding-top: 5px;
  display: flex;
  gap: 10px;
  padding: 20px;
}
.firstHr {
  border-top: 1px solid #d8d6d6;
  margin-bottom: 20px;
}
.secondHr {
  border-top: 15px solid #eeeeee;
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>
