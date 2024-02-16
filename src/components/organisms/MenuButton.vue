<template>
  <div v-if="type == 'simple'">
    <button
      class="button-style"
      :class="active == true ? 'activeClass' : 'inactiveClass'"
      type="button"
      @click="onPress(id)"
    >
      {{ title }}
    </button>
  </div>
  <div v-else-if="type == 'date'">
    <button
      class="button-style"
      :class="active == true ? 'activeClass' : 'inactiveClass'"
      type="button"
      @click="pressDate"
    >
      {{ title }}
    </button>
    <div v-if="active == true">
      <input
        ref="datePicker"
        type="date"
        style="display: none; margin-top: 10px"
        @change="dateChange"
        :min="this.minDate"
        :max="this.maxDate"
      />
    </div>
  </div>
</template>

<script>
/*
  MenuButton component.
  Component with the button of the upper menu
  Props:
    title: String for the title of each button
    onPress: Function for parent when button pressed
    type: String for the type of each button (simple or date)
    id: Number with the id
    active: Boolean for active/inactive button
    initData: Function for init the data to the parent
    setDatePicked: Function to update date at parent data variable
  */
export default {
  name: "MenuButton",
  async created() {
    if (this.type == "date") {
      // Get the current date
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      this.minDate = currentDate.setDate(currentDate.getDate());
      this.minDate = currentDate.toISOString().split("T")[0];

      // Add 6 days for the max date
      currentDate.setDate(currentDate.getDate() + 6);
      this.maxDate = currentDate.toISOString().split("T")[0];
    }
  },
  props: {
    title: String,
    onPress: Function,
    type: String,
    id: Number,
    active: Boolean,
    initData: Function,
    setDatePicked: Function,
  },
  data() {
    return {
      minDate: null,
      maxDate: null,
    };
  },
  methods: {
    // Open the date picker
    async pressDate() {
      await this.onPress(this.id);
      this.$refs.datePicker.style.display = "block";
    },
    // When the date is changed from the user
    async dateChange(event) {
      await this.setDatePicked(event.target.value)
      await this.onPress(this.id);
    },
  },
};
</script>

<style scoped>
.activeClass {
  color: #9bcf6b;
  background-color: #e7f3dd;
  border: 1px solid #9bcf6b;
}

.inactiveClass {
  border: 1px solid rgb(185, 185, 185);
}
.button-style {
  padding: 7px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
