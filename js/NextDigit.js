;(function() {
  window.NextDigit = class {
    constructor(currentValue, nextValue) {
      this.nextDigitElem = creatNextDigitElem(currentValue, nextValue)
    }

    render(parent) {
      parent.append(this.nextDigitElem);
    }

  }

  function creatNextDigitElem(currentValue, nextValue) {
    const segmentRotateFrontElem = creatElement('div', currentValue, {class: "segment-rotate__front"});
    const segmentRotateBackElem = creatElement('div', nextValue, {class: "segment-rotate__back"});
    const segmentRotateElem = creatElement('div', null, {class: "clock__segment-rotate segment-rotate"});

    segmentRotateElem.append(segmentRotateFrontElem, segmentRotateBackElem);

    segmentRotateElem.addEventListener('animationend', () => {
      segmentRotateElem.remove();
    });

    return segmentRotateElem;
  }
})();