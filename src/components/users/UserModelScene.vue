<template>
  <Scene @complete="complete" :fullscreen="fullscreen">
    <Camera
      v-model="mainCamera"
      :type="camera.type"
      :target="camera.target"
      :alpha="camera.alpha"
      :beta="camera.beta"
      :radius="camera.radius"
    ></Camera>

    <HemisphericLight
      :specular="lights.hemisphericLight.specular"
      :direction="lights.hemisphericLight.direction"
    >
      <property name="intensity" :float="lights.hemisphericLight.intensity"></property>
    </HemisphericLight>

    <DirectionalLight v-model="directionalLight" :direction="lights.directionalLight.direction">
      <property name="position" :vector="lights.directionalLight.position"></property>
    </DirectionalLight>

    <!-- <ShadowGenerator
      v-model="shadowGenerator"
      :mapSize="1024"
      :light="directionalLight"
    ></ShadowGenerator>-->
  </Scene>
</template>

<script>
export default {
  name: "UserModelScene",

  data: () => ({
    fullscreen: false,
    engine: null,
    scene: null,
    mainCamera: null,
    camera: {
      type: "arcRotate",
      // position: [0,0,0],
      target: [0, 1, 0],
      alpha: Math.PI / 2,
      beta: Math.PI / 4,
      radius: 3
    },
    userModel: null,
    animation: null,
    model: {
      src:
        "https://gist.githubusercontent.com/shecodez/40d0efdc9d606f6bb914560dde1c2aa2/raw/652e8cfea9c0db8fabb914b81122d453109530c9/dummy3.babylon",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scaling: [1, 1, 1]
    },
    skeleton: {
      enableBlending: true,
      blendingSpeed: 0.05,
      loopMode: true // 1
    },
    lights: {
      hemisphericLight: {
        specular: "#000", //this.BABYLON.Color3.Black(),
        direction: [0, 1, 0],
        intensity: 0.6
      },
      directionalLight: {
        direction: [0, -0.5, -1.0],
        position: [0, 5, 5]
      }
    },
    directionalLight: null,
    shadowGenerator: null,
    mapSize: 1024
    //environment: {}
  }),

  created() {
    // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
    this.BABYLON.Animation.AllowMatricesInterpolation = true;

    try {
      this.engine = this.createDefaultEngine(this.BABYLON);
    } catch (ex) {
      console.error("CreateDefaultEngine failed", ex);
    }
  },

  watch: {
    engine() {
      this.engine.displayLoadingUI();
    },
    mainCamera() {
      this.mainCamera.lowerRadiusLimit = 2;
      this.mainCamera.upperRadiusLimit = 10;
      this.mainCamera.wheelDeltaPercentage = 0.01;
      //console.log(this.mainCamera)
    },
    directionalLight() {
      this.generateShadow(1024, this.directionalLight, this.BABYLON);
      //console.log("dirLight01", this.directionalLight);
    },
    shadowGenerator() {
      this.shadowGenerator.useBlurExponentialShadowMap = true;
      this.shadowGenerator.blurKernel = 32;
      // console.log(this.shadowGenerator);
    }
  },

  methods: {
    createDefaultEngine(BABYLON) {
      return new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });
    },
    complete(event) {
      this.scene = event.scene;
      //this.generateShadow(1024, event.scene.lights[1], this.BABYLON);
      this.loadUserModel(event.scene, this.BABYLON);
      this.engine.hideLoadingUI();
      //console.log("complete", event);
    },
    generateShadow(mapSize, light, BABYLON) {
      this.shadowGenerator = new BABYLON.ShadowGenerator(mapSize, light);
    },
    loadUserModel(scene, BABYLON) {
      this.BABYLON.SceneLoader.ImportMesh(
        "",
        "https://gist.githubusercontent.com/shecodez/40d0efdc9d606f6bb914560dde1c2aa2/raw/652e8cfea9c0db8fabb914b81122d453109530c9/dummy3.babylon",
        "",
        scene,
        (newMeshes, particleSystems, skeletons) => {
          //let user = newMeshes[0];
          let skeleton = skeletons[0];

          this.shadowGenerator.addShadowCaster(scene.meshes[0], true);
          for (let i = 0; i < newMeshes.length; i++) {
            newMeshes[i].receiveShadows = false;
          }

          let helper = scene.createDefaultEnvironment({
            enableGroundShadow: true
          });
          helper.setMainColor(BABYLON.Color3.Gray());
          helper.ground.position.y += 0.01;

          //user.rotation = this.userModel.rotation;
          //user.position = this.userModel.position;

          skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
          skeleton.animationPropertiesOverride.enableBlending = true;
          skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
          skeleton.animationPropertiesOverride.loopMode = 1;

          let idleRange = skeleton.getAnimationRange("YBot_Idle");

          if (idleRange)
            scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
        }
      );
    }
  }
};
</script>
