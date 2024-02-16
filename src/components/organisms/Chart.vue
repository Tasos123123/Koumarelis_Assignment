<template>
  <div class="container">
    <div>
      <h1 class="title">Weekly Variation</h1>
    </div>
      <apexchart
        width="100%"
        height="240"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
  </div>
</template>
<script>
/*
      Chart Component.
          Component for the chart 
        Props:
          chartData: Object with the data for the chart display:
          {
            data: [10C, 22C, 34C, 40C],
            categories: [10/2, 10/4, 11/4, 12/4],
          }
          
  */
export default {
  name: "Chart",
  props: {
    chartData: Object,
  },
  data() {
    return {
      // The options made base the apex charts documentation
      // https://apexcharts.com/docs/options/xaxis/
      options: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [...this.chartData.categories],

          offsetY: -5,
          labels: {
            style: {
              fontWeight: 700,
            },
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },

        stroke: {
          width: 1,
          curve: "smooth",
        },
        dataLabels: {
          enabled: true,
          background: {
            enabled: false,
          },
          formatter: function (value) {
            return value + "\u00B0C";
          },
          offsetX: 0,
          offsetY: -4,
          style: {
            fontWeight: "lighter",
            fontSize: "10px",
            colors: ["black"],
          },
        },

        title: {
          text: "Temperature",
          style: {
            fontSize: "13px",
            color: "grey",
          },
        },
        colors: ["#9bcf6b"],
      },
      series: [
        {
          name: "Tempurature",
          data: [...this.chartData.data],
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  padding-left: 20px;
}
.title {
  font-size: 14px;
  font-weight: 700;
  padding-left: 10px;
  padding-bottom: 20px;
}
</style>
