;(function() {
  'use strict';

  window.creatElement = function(tagOfElem, contentOfElem, attributeOfElem) {
    const htmlElem = document.createElement(tagOfElem);
  
    if (contentOfElem !== null) {
      htmlElem.textContent = contentOfElem;
    }
  
    for (let item in attributeOfElem) {
      htmlElem.setAttribute(item, attributeOfElem[item]);
    }
  
    return htmlElem;
  };

})();

