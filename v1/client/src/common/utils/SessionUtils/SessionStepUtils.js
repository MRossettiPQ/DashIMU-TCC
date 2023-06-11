class Session {
  constructor(onEnd = null, onStart = null, onCheckProcedures) {
    // Step
    this.steps = [
      {
        order: 0,
        value: 'first-step',
        label: 'Selecionar procedimento', //$t("session.select_procedure"),
      },
      {
        order: 1,
        value: 'select-sensor',
        label: 'Ativar sensores', //$t("session.select_sensor"),
      },
      {
        order: 2,
        value: 'run-procedure',
        label: 'Captar medições', //$t("session.run_procedure"),
      },
    ]
    this.selectedStep = this.steps[0]
    this.onEnd = onEnd
    this.onStart = onStart
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

export class SessionUtils {
  static createNavigation({ onEnd = null, onStart = null, onCheckProcedures = null } = {}) {
    return new Session(onEnd, onStart, onCheckProcedures)
  }
}
