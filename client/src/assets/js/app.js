
function initBootstrap(){
  // console.log("IN initBootstrap >>> ");
  materialKit.initBootstrap();
}

function initDOMComponents(){
    materialKit.initDOMComponents();
    materialKit.initFormExtendedDatetimepickers();

    if(document.getElementById('sliderRegular') || document.getElementById('sliderDouble')){
      // Sliders Init
      materialKit.initSliders();
    }

}
