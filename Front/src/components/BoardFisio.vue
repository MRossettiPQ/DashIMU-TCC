<template>
  <header class="jumbotron">
    <h3>{{ content }}</h3>
  </header>
  <div class="container d-flex justify-content-center">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px; heigth: 400px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
        <span class="fs-5 fw-semibold">Pacientes</span>
        <button type="button" class="btn btn-outline-success">Adicionar</button>
      </a>
      <div class="list-group list-group-flush border-bottom overflow-auto scrollarea" style="height: 450px;">
        <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">List group item heading</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
      </div>
    </div>
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px; heigth: 400px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
        <span class="fs-5 fw-semibold">Consultas</span>
        <button type="button" class="btn btn-outline-success">Adicionar</button>
      </a>
      <div class="list-group list-group-flush border-bottom overflow-auto scrollarea" style="height: 450px;">
        <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">List group item heading</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
      </div>
    </div>
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px; heigth: 400px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
        <span class="fs-5 fw-semibold">Historico Medições</span>
        <button type="button" class="btn btn-outline-success">Adicionar</button>
      </a>
      <div class="list-group list-group-flush border-bottom overflow-auto scrollarea" style="height: 450px;">
        <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">List group item heading</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Fisio",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getFisioBoard().then(
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
