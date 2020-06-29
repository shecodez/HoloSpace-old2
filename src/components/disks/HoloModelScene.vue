<template>
  <Scene v-model="scene">
    <Camera
      v-model="camera"
      :type="camera.type"
      :target="camera.target"
      :alpha="camera.alpha"
      :beta="camera.beta"
      :radius="camera.radius"
    ></Camera>

    <HemisphericLight :specular="hemisphericLight.color3" :direction="hemisphericLight.direction">
      <property name="intensity" :float="hemisphericLight.intensity"></property>
    </HemisphericLight>

    <Entity :position="directionalLight.position">
      <DirectionalLight v-model="directionalLight" :direction="directionalLight.direction"></DirectionalLight>
    </Entity>

    <Ground :options="ground">
      <Material>
        <Texture type="diffuse" src="https://www.babylonjs-playground.com/textures/grass.png"></Texture>
      </Material>
    </Ground>

    <Entity>
      <Asset
        :src="model.src"
        :scaling="model.scaling"
        :position="model.position"
        :rotation="model.rotation"
      ></Asset>
    </Entity>
  </Scene>
</template>

<script>
export default {
  name: "HoloModelScene",

  data: () => ({
    scene: null,
    camera: {
      type: "arcRotate",
      // position: [0,0,0],
      target: [0, 1, 0],
      alpha: Math.PI / 2,
      beta: Math.PI / 4,
      radius: 3,
      lowerRadiusLimit: 2,
      upperRadiusLimit: 10,
      wheelDeltaPercentage: 0.01
    },
    model: {
      src:
        "https://models.babylonjs.com/Demos/UnderWaterScene/fish/greySnapper_vertColor.glb",
      position: [0, 0.01, 0],
      rotation: [0, Math.PI / 2, 0],
      scaling: [0.2, 0.2, 0.2]
    },
    hemisphericLight: {
      color3: "#000",
      direction: [0, 1, 0],
      intensity: 0.6
    },
    directionalLight: {
      direction: [0, -0.5, -1.0],
      position: [0, 5, 5]
    },
    shadow: {
      mapSize: 1024,
      useBlurExponentialShadowMap: true,
      blurKernel: 32
    },
    ground: {
      width: 10,
      height: 20
    }
  }),

  watch: {
    scene() {
      // TODO: display loading screen while loading assets
      /*  engine.displayLoadingUI();
        scene.executeWhenReady(function () {
            engine.hideLoadingUI();
        });*/
    }
  }
};
</script>
