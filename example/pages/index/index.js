//index.js
//获取应用实例
const app = getApp()
import { ModelRenderer } from './modelRender'
import regeneratorRuntime from 'regenerator-runtime'
const modeldRenderer=new ModelRenderer()


Page({
  data: {
    canvasWidth: 350,
    canvasHeight: 350,
    canvasTop: 0,
    canvasLeft: 0,
  },
  onReady: async function () {
    // let   url='https://zugou.vip/static/models/demo/S1.gltf'
    let url='http://zugou.ninewe.com/WeChatProjectResource/S10.gltf'
    await  modeldRenderer.run([100,0,400,400],url,this);
  },
})
