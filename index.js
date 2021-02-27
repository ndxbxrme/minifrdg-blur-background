  const MinifrdgBlurBackground = (app, opts) => {
    opts = opts || {};
    app.templates['minifrdg-blur-background'] = app.fill(`
      <style type="text/css">
        minifrdg-blur-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        minifrdg-blur-background .circles {
          position: absolute;
          top: {{-size/2}}px;
          left: {{-size/2}}px;
          width: calc(100% + {{size}}px);
          height: calc(100% + {{size}}px);
          background-size: cover; 
          background-position: center;
          filter: blur({{blur}});
        }
        minifrdg-blur-background .circles svg {
          display: none;
        }
      </style>
      <div class="circles">
        <svg id="bgsvg" width="{{width}}" height="{{height}}" viewBox="0 0 {{width}} {{height}}" xmlns="http://www.w3.org/2000/svg">
          <g>
            {{(r = (v) => Math.random() * v) && new Array(20).fill(0).map(() => ({x:r(width),y:r(height),r:r(size),h:r(hueRotate) + hueOffset})).map(item => '<circle cx="' + item.x + '" cy="' + item.y + '" r="' + item.r + '" fill="hsla(' + item.h + ',' + l + ',' + s + ',' + a + ')" />')}}
          </g>  
        </svg>
      </div>
      {{'{' + '{'}}
      setTimeout(() => {
        const b64 = btoa(app.$('minifrdg-blur-background .circles svg').outerHTML);
        app.$$('minifrdg-blur-background .circles').forEach(elm => elm.style.backgroundImage = 'url("data:image/svg+xml;base64,' + b64 + '")');
      }) && '';{{'}' + '}'}}
    `, {
      width: opts.width || 1920,
      height: opts.height || 1080,
      size: opts.size || 300,
      blur: '40px',
      hueRotate: 180,
      hueOffset: 180,
      l:'50%',
      s:'60%',
      a:'50%'
    });
    app.rootComponents.push('minifrdg-blur-background');
  };
(typeof(module)!=='undefined') && (module.exports = MinifrdgBlurBackground) || (window.MinifrdgBlurBackground = MinifrdgBlurBackground);