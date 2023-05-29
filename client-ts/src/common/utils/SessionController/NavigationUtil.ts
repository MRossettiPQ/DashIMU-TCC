interface Step {
  order: number;
  value: string;
  label: string;
  action: string;
  next_icon: string;
}

class NavigationUtil {
  selectedStep?: Step;

  // Declaração das etapas
  steps: Step[] = [
    {
      order: 0,
      value: 'first-step',
      label: 'Selecionar procedimento',
      action: 'select-procedures',
      next_icon: 'arrow_forward_ios',
    },
    {
      order: 1,
      value: 'second-step',
      label: 'Ativar sensores',
      action: 'connect-sensors',
      next_icon: 'arrow_forward_ios',
    },
    {
      order: 2,
      value: 'third-step',
      label: 'Captar medições',
      action: 'receiver-measurements',
      next_icon: 'save',
    },
  ];

  constructor() {
    this.selectedStep = this.steps[0];
  }

  get maxOrder() {
    return this.steps.length;
  }

  get actualStep() {
    return this.selectedStep;
  }

  get actualStepOrder() {
    return this.actualStep?.order || 0;
  }

  get actualStepAction() {
    return this.actualStep?.action;
  }

  get actualNextIcon() {
    return this.actualStep?.next_icon;
  }

  get actualStepValue() {
    return this.actualStep?.value;
  }

  get actualStepLabel() {
    return this.actualStep?.label;
  }

  get validNext() {
    return this.actualStepOrder < this.maxOrder;
  }

  get validPrev() {
    return this.actualStepOrder >= 0;
  }

  next() {
    if (this.validNext) {
      switch (this.actualStepOrder) {
        case 0:
        case 1:
        case 2:
          this.nextStep();
          break;
      }
    }
  }

  nextStep() {
    if (this.selectedStep) {
      this.selectedStep = this.steps.find(
        ({ order }: Step) => order === this.actualStepOrder + 1
      );
    }
  }

  prev() {
    if (this.validPrev) {
      switch (this.actualStepOrder) {
        case 0:
          break;
        case 1:
        case 2:
          this.prevStep();
          break;
      }
    }
  }

  prevStep() {
    this.selectedStep = this.steps.find(
      ({ order }: Step) => order === this.actualStepOrder - 1
    );
  }
}

export { NavigationUtil };
