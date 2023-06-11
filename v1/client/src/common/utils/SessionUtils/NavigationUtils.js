class Navigation {
  steps = [
    {
      order: 0,
      value: 'first-step',
      label: 'Selecionar procedimento', //$t("session.select_procedure"),
    },
    {
      order: 1,
      value: 'second-step',
      label: 'Ativar sensores', //$t("session.select_sensor"),
    },
    {
      order: 2,
      value: 'third-step',
      label: 'Captar medições', //$t("session.run_procedure"),
    },
  ]

  constructor({ onCheckProcedures = null } = {}) {
    this.selectedStep = this.steps[0]
    this.onCheckProcedures = onCheckProcedures

    this.started = false
  }

  get actualStep() {
    return this.selectedStep || null
  }

  get actualStepOrder() {
    return this.actualStep?.order
  }

  get actualStepValue() {
    return this.actualStep?.value
  }

  get actualStepLabel() {
    return this.actualStep?.label || ''
  }

  next() {
    if (this.actualStepOrder < this.steps.length) {
      switch (this.actualStepOrder) {
        case 0:
          this.nextStep()
          break
        case 1:
          this.nextStep()
          break
        case 2:
          this.onCheckProcedures?.()
          break
      }
    }
  }

  nextStep() {
    this.selectedStep = this.steps.find(({ order }) => order === this.selectedStep?.order + 1)
  }

  prev() {
    if (this.selectedStep?.order > 0) {
      this.selectedStep = this.steps.find(({ order }) => order === this.selectedStep?.order - 1)
    }
  }
}

export { Navigation }
