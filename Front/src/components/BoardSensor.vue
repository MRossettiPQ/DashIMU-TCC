<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Paciente:</h3>{{ content }}
    </header>
    <div class="Text-center">
      <apexchart width="70%" height="450px" type="line" :options="options" :series="series"></apexchart>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Sensor",
  data() {
    return {
      content: "",
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'line-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    };
  },
  mounted() {
    UserService.getSensorBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
