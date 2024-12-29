<template>
  <div class="viewer" ref="viewer"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
  props: ['outputUrl'],
  watch: {
    outputUrl(newUrl) {
      if (newUrl) {
        this.loadModel(newUrl);
      }
    },
  },
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.viewer.appendChild(this.renderer.domElement);

      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    },
    loadModel(url) {
      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        this.scene.add(gltf.scene);
      });
    },
  },
};
</script>

<style>
.viewer {
  flex: 1;
  position: relative;
}
</style>
