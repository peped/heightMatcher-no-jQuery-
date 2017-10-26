/*     Height matcher (no jQuery)     */
/* +------------- USAGE ------------+ */
/* |                                | */
/* | heightMatcher('.exampleClass') | */
/* |                                | */
/* +--------------------------------+ */

function getOffsetTop(element) {
    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    return box.top + window.pageYOffset - de.clientTop;;
}

function heightMatcher(target) {
    let highestElement = 0;
    let currentTopPosition = 0;
    let currentIndex = -1;
    let started = false;
    let elementPositions = [];
    let adjustable_elements = document.getElementsByClassName(target.replace(/[^A-Za-z0-9\-\_]/g,''));
    for (i = 0; i < adjustable_elements.length; i++) {
        if(!started){
            highestElement = adjustable_elements[i].clientHeight;
            currentTopPosition = getOffsetTop(adjustable_elements[i]);
            started = true;
        }

        if(elementPositions.length && currentTopPosition !== getOffsetTop(adjustable_elements[i]) && i !== adjustable_elements.length){
            for (n = 0; n < elementPositions[currentIndex].elements.length; n++) {
                elementPositions[currentIndex].elements[n].style.height = elementPositions[currentIndex].topHeight+'px';
            }
        }

        if(elementPositions.length && elementPositions[currentIndex].positionTop === getOffsetTop(adjustable_elements[i])){
            if(adjustable_elements[i].clientHeight > highestElement){
                elementPositions[currentIndex].topHeight = adjustable_elements[i].clientHeight;
                highestElement = adjustable_elements[i].clientHeight;
            }
        } else {
            currentIndex++;
            currentTopPosition = getOffsetTop(adjustable_elements[i]);
            highestElement = adjustable_elements[i].scrollHeight;
            elementPositions.push({
                positionTop: currentTopPosition,
                topHeight: highestElement
            });
            elementPositions[currentIndex].elements = [];
        }
        elementPositions[currentIndex].elements.push(adjustable_elements[i]);

        if(i+1 === adjustable_elements.length){
            currentIndex;
            for (n = 0; n < elementPositions[currentIndex].elements.length; n++) {
                elementPositions[currentIndex].elements[n].style.height = elementPositions[currentIndex].topHeight+'px';
            }
        }
    }
}