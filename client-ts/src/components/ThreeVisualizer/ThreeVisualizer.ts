import { Component, Ref, Vue } from 'vue-property-decorator';
import { ThreeJsSkinning } from 'src/common/utils/ThreeJs/ThreeJsSkinning';

@Component({
  name: 'three-visualizer',
})
export default class ThreeVisualizer extends Vue {
  @Ref('canvasWrapper')
  canvasWrapper!: HTMLDivElement;

  anim!: ThreeJsSkinning;

  error = false;

  async mounted() {
    this.anim = new ThreeJsSkinning(this.canvasWrapper);
    await this.animate();
  }

  async animate() {
    try {
      if (!this.error) {
        requestAnimationFrame(this.animate);

        this.anim.controls.update();

        // this.anim.skeleton.bones[0].rotation.y += 0.01;

        this.anim.render();
      }
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  }
}
