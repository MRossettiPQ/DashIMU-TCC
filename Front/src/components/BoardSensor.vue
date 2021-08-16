<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Paciente: {{ content }}</h3>
    </header>
    <div class="d-flex justify-content-center h-auto">
      <div class="w-75" >
        <apexchart width="100%" height="auto" type="line" :options="options" :series="series"></apexchart>
      </div>
      
      <div class="w-25">
        <div class="text-center">
          <div class="btn-group w-100 " role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-success">Iniciar</button>
            <button type="button" class="btn btn-outline-danger">Pausar</button>
          </div>
          <div class="btn-group w-100 " role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-info">Reinicia</button>
            <button type="button" class="btn btn-outline-success">Guardar</button>
          </div>
        </div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Paciente
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Accordion Item #2
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Accordion Item #3
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Sensor",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    // idSensor, horaSensor, numLeitura, AccelX_mss, AccelY_mss, AccelZ_mss, GyroX_rads, GyroY_rads, GyroZ_rads, MagX_uT, MagY_uT, MagZ_uT
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
