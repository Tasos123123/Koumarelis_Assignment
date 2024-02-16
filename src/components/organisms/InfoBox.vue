<template>
  <div class="boxContainer">
    <div class="flex-container">
      <div class="titleClass">
        <h1>{{ objVal.title }}</h1>
      </div>
      <div class="secondTitleClass">
        <p>{{ objVal.secondTitle }}</p>
      </div>
    </div>
    <div class="subTitleClass">
      <h4>{{ objVal.subTitle }}</h4>
    </div>
  </div>
</template>
<script>
/*
    InfoBox Component.
        Component for the information boxes.
      Props:
        objVal: Object with the data for the box display:
        {
          title: 1232,
          secondTitle: "hPa",
          subTitle: "Pressure"
        }
        
*/
export default {
  name: "InfoBox",
  props: {
    objVal: Object,
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
}
.boxContainer {
  border-radius: 12px;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 150px;
  height: 95px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 7px;
}

@media only screen and (max-width: 500px) {
  .boxContainer {
    width: 100%;
    align-items: center;
  }
}
.titleClass {
  margin-top: 10px;
  order: 1;
}

.secondTitleClass {
  margin-top: 20px;
  margin-left: 2px;
  order: 2;
}
.subTitleClass {
  position: relative;
  bottom: 15px;
  margin-top: 10px;
  font-size: 13px;
  color: #808080;
}
h1 {
  font-size: 24px;
  font-weight: 600;
}
p {
  font-size: 14px;
  font-weight: 600;
}
</style>
