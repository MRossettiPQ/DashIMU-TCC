import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
} from 'three';

class ThreeJsExample {
  canvasWrapper!: HTMLDivElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  cube!: Mesh;

  constructor(ref: HTMLDivElement) {
    window.addEventListener('resize', () => {
      this.renderer.setSize(
        this.canvasWrapper?.clientWidth,
        this.canvasWrapper?.clientHeight
      );
    });
    // Required
    this.canvasWrapper = ref;
    //
    this.scene = new Scene();

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(
      this.canvasWrapper.clientWidth,
      this.canvasWrapper.clientHeight
    );
    this.canvasWrapper.appendChild(this.renderer.domElement);

    this.camera = new PerspectiveCamera(
      75,
      this.canvasWrapper.clientWidth / this.canvasWrapper.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: '#FF0000' });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);
  }
}

export { ThreeJsExample };
