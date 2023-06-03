import {
  AmbientLight,
  Bone,
  BoxGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeJsSkinning {
  // Required
  canvas!: HTMLDivElement;
  //
  cube!: Mesh;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  controls!: OrbitControls;
  skeleton!: Skeleton;

  constructor(ref: HTMLDivElement) {
    // TODO Documentação da lib - https://threejs.org/
    // Cena de animação de dobra com 2 vertices.
    this.canvas = ref;
    //
    this.initScene();
    this.createModels();
  }

  onWindowResize() {
    this.camera.aspect = this.aspect();
    this.camera.updateProjectionMatrix();
    this.setSize();
    this.render();
  }

  initScene() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.canvas?.clientWidth, this.canvas?.clientHeight);
    this.canvas.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    // this.scene.background = new Color(0xa0a0a0);
    this.scene.fog = new Fog(0xa0a0a0, 70, 100);
    this.camera = new PerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 15;

    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);
    this.controls.target.set(1, 1, 1);
    this.controls.update();
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;

    this.light();
    // Listener resize screen
    window.addEventListener('resize', () => this.onWindowResize());
  }

  light() {
    // Iluminação da cena
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
  }

  createModels() {
    // Criar modelos
    this.createBox();
    this.createBones();
  }

  createBones() {
    // Criação dos cilindros
    const radius = 1;
    const height = 4;
    const geometry1 = new CylinderGeometry(radius, radius, height, 16);
    const material1 = new MeshBasicMaterial({ color: 0xff0000 });

    const position = geometry1.attributes.position;

    const skinIndices = [];
    const skinWeights = [];

    for (let i = 0; i < position.count; i++) {
      skinIndices.push(1, 1, 0, 0);
      skinWeights.push(2, 2, 0, 0);
    }

    geometry1.setAttribute(
      'skinIndex',
      new Uint16BufferAttribute(skinIndices, 4)
    );
    geometry1.setAttribute(
      'skinWeight',
      new Float32BufferAttribute(skinWeights, 4)
    );

    // create skinned mesh and skeleton
    const root = new Bone();
    const child = new Bone();

    root.add(child);
    child.position.y = 5;
    const mesh = new SkinnedMesh(geometry1, material1);
    const skeleton = new Skeleton([root, child]);

    const rootBone = skeleton.bones[0];
    mesh.add(rootBone);

    mesh.bind(skeleton);

    skeleton.bones[0].rotation.x = -0.1;
    skeleton.bones[1].rotation.x = 0.2;

    this.scene.add(mesh);
  }

  createBox() {
    // Criação sala ver de wireframe
    const boxGeometry = new BoxGeometry(40, 40, 50, 10, 10, 10);
    const boxMaterial = new MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.cube = new Mesh(boxGeometry, boxMaterial);
    this.scene.add(this.cube);
  }

  setSize() {
    // Set size scene
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  aspect() {
    return this.canvas?.clientWidth / this.canvas?.clientHeight;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { ThreeJsSkinning };
