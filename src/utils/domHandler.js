export const absolutePosition = (element, target) => {
    if (element) {
        let elementDimensions = {
            width: element.offsetWidth,
            height: element.offsetHeight || Math.min(parseInt(element.style.maxHeight.slice(0, -2)), element.scrollHeight + 16),
        };
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth = elementDimensions.width;
        let targetOuterHeight = target.offsetHeight;
        let targetOuterWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = getWindowScrollTop();
        let windowScrollLeft = getWindowScrollLeft();
        let viewport = getViewport();
        let top, left;

        if (
            targetOffset.top + targetOuterHeight + elementOuterHeight >
            viewport.height
        ) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            element.style.transformOrigin = "bottom";

            if (top < 0) {
                top = windowScrollTop;
            }
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop + 1;
            element.style.transformOrigin = "top";
        }

        if (targetOffset.left + elementOuterWidth > viewport.width)
            left = Math.max(
                0,
                targetOffset.left +
                windowScrollLeft +
                targetOuterWidth -
                elementOuterWidth
            );
        else left = targetOffset.left + windowScrollLeft;

        element.style.top = top + "px";
        element.style.left = left + "px";
    }
};
export const relativePosition = (element, target) => {
    if (element) {
        let elementDimensions = { width: element.offsetWidth, height: element.offsetHeight } ;
        const targetHeight = target.offsetHeight;
        const targetOffset = target.getBoundingClientRect();
        const viewport = getViewport();
        let top, left;

        if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
            top = -1 * elementDimensions.height - 1;
            element.style.transformOrigin = 'bottom';

            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top;
            }
        } else {
            top = targetHeight + 1;
            element.style.transformOrigin = 'top';
        }

        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        } else if (targetOffset.left + elementDimensions.width > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        } else {
            // element fits on screen (align with target)
            left = 0;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
}
export const getWindowScrollTop = () => {
    let doc = document.documentElement;

    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
};
export const getWindowScrollLeft = () => {
    let doc = document.documentElement;

    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
};
export const getViewport = () => {
    let win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName("body")[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
};