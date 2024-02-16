<template>
  <div class="flex-container">
    <div class="left-div">
      <div>
        <h1>{{ objectVal.value }}&deg;C</h1>
      </div>
      <div class="subTitleClass">
        <p>{{ objectVal.description }}</p>
      </div>
    </div>
    <div class="right-div">
      <img :src="this.objectVal.img" width="90" height="90" />
    </div>
  </div>
</template>

<script>
/*
        HeaderInfo Component.
        Component with the header informations with temperature and an image
        Props:
        objectVal: Object with the data for the header example:
        {
          value: 12,
          description: Clouds,
          img: "https://openweathermap.org/img/w/02n.png"
        }
    
*/
export default {
  name: "HeaderInfo",
  props: {
    objectVal: Object,
  },
  data() {
    return {
      imgUrl: "https://openweathermap.org/img/w/",
    };
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
}
.left-div {
  order: 1;
}

.right-div {
  order: 2;
}
.subTitleClass {
  position: relative;
  bottom: 15px;
  font-size: 13px;
  color: #808080;
}
h1 {
  font-size: 40px;
  font-weight: 500;
  padding-bottom: 0;
}
</style>
