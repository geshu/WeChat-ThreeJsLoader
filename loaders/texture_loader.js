export function registerTextureLoader(THREE) {


  console.log("注册新的T&I加载器")

  THREE.ImageLoader = (function() {
    function ImageLoader(manager) {
      this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
    }
    Object.assign(ImageLoader.prototype, {
      crossOrigin: 'anonymous',
      load: function(canvas, url, onLoad, onProgress, onError) {
        if (url === undefined) url = '';
        if (this.path !== undefined) url = this.path + url;
        url = this.manager.resolveURL(url);
        // console.log(url)
        var scope = this;
        var cached = THREE.Cache.get(url);
        if (cached !== undefined) {
          scope.manager.itemStart(url);
          setTimeout(function() {
            if (onLoad) onLoad(cached);
            scope.manager.itemEnd(url);
          }, 0);
          return cached;
        }
        var image = canvas.createImage();

        function onImageLoad() {
          image.onload = function() {};
          image.onerror = function() {};

          console.log("图片加载完毕")
          THREE.Cache.add(url, this);
          if (onLoad) onLoad(this);
          scope.manager.itemEnd(url);
        }

        function onImageError(event) {
          console.log("图片加载失败")
          image.onload = function() {};
          image.onerror = function() {};
          if (onError) onError(event);
          scope.manager.itemEnd(url);
          scope.manager.itemError(url);
        }
        image.onload = onImageLoad;
        image.onerror = onImageError;
        if (url.substr(0, 5) !== 'data:') {
          if (this.crossOrigin !== undefined) image.crossOrigin = this.crossOrigin;

        }
        scope.manager.itemStart(url);
        image.src = url;
        return image;
      },
      setCrossOrigin: function(value) {
        this.crossOrigin = value;
        return this;
      },
      setPath: function(value) {
        this.path = value;
        return this;
      }
    });

    return ImageLoader


  })()






  THREE.TextureLoader = (function() {

    function TextureLoader(manager) {
      this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
    }
    Object.assign(TextureLoader.prototype, {
      crossOrigin: 'anonymous',
      load: function(canvas, url, onLoad, onProgress, onError) {
        var texture = new THREE.Texture();
        var loader = new THREE.ImageLoader(this.manager);
        loader.setCrossOrigin(this.crossOrigin);
        loader.setPath(this.path);
        loader.load(canvas, url, function(image) {
          texture.image = image;
          var isJPEG = url.search(/\.jpe?g$/i) > 0 || url.search(/^data\:image\/jpeg/) === 0;
          texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
          texture.needsUpdate = true;
          if (onLoad !== undefined) {
            onLoad(texture);
          }
        }, onProgress, onError);
        return texture;
      },
      setCrossOrigin: function(value) {
        this.crossOrigin = value;
        return this;
      },
      setPath: function(value) {
        this.path = value;
        return this;
      }
    });
    return TextureLoader
  })();




}