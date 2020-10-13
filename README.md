适配于微信小程序的ThreeJsLoader
===
2020.10.13 updata：让加载器用法和在原生中使用相同，添加了一个示例

step1:初始化加载器
==
```
  let THREE = createScopedThreejs(canvas);
  THREE.canvas=canvas;//指定Canvas组件
  registerTextureLoader(THREE);//替换textureloader
  registerGLTFLoader(THREE); //添加gltf加载器
 ```   
step2:正常使用loader
==
```
  let obj=await this.loadGltf(objUrl);  
  loadGltf(url) { 
    // 读取场景模型
    return new Promise((resolve) => {
      let gltfLoader = new this.THREE.GLTFLoader();
      gltfLoader.load(url, obj => {
        resolve(obj.scene);
      })
    });
  }
  ```
