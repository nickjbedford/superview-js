var Super;
(function (Super) {
    class ObjectProperty {
        constructor(object, property) {
            this.object = object;
            this.property = property;
        }
        isFunction() {
            return typeof this.property == 'function';
        }
        callFunction(...params) {
            return this.property.apply(this.object, params);
        }
        /**
         * Follows a dot path from an initial object using an array
         * of property names.
         * @param object
         * @param path
         */
        static fromObjectPath(object, path) {
            if (typeof path == 'string')
                path = path.split('.');
            if (!Array.isArray(path))
                throw new Error('Object path is not an array.');
            if (path.length === 0)
                throw new Error('Object path is empty.');
            for (let i = 0; i < path.length - 1; i++) {
                let key = path[i];
                if (!(key in object))
                    return null;
                object = object[key];
                if (!object)
                    return null;
            }
            let key = path[path.length - 1];
            if (!(key in object))
                return null;
            return new Super.ObjectProperty(object, object[key]);
        }
    }
    Super.ObjectProperty = ObjectProperty;
})(Super || (Super = {}));
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
/// <reference path="./ObjectProperty.ts" />
var Super;
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
/// <reference path="./ObjectProperty.ts" />
(function (Super) {
    /**
     * Defines the base functionality of all views.
     */
    class ViewBase {
        constructor(element) {
            this._children = [];
            this.name = null;
            this.superview = null;
            element.View = this;
            this._element = element;
            this.name = element.getAttribute('var') || null;
            this._registerWithParent();
            this._registerViewEvents();
        }
        static initializeViews(context = document) {
            let elements = context.querySelectorAll('[view]');
            let views = [];
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                let className = element.getAttribute('view') || 'Super.View';
                let classConstructor = Super.ObjectProperty.fromObjectPath(window, className);
                if (!classConstructor || !classConstructor.isFunction())
                    throw new Error('View class name is not a valid constructor.');
                views.push(new classConstructor.property(element));
            }
            return views;
        }
        addClass(classes) {
            if (typeof classes == 'string')
                classes = classes.split(' ');
            this._element.classList.add.apply(this._element.classList, classes);
            return this;
        }
        removeClass(classes) {
            if (typeof classes == 'string')
                classes = classes.split(' ');
            this._element.classList.remove.apply(this._element.classList, classes);
            return this;
        }
        _registerWithParent() {
            let parent = this._element.parentElement;
            while (parent && !('View' in parent))
                parent = parent.parentElement;
            if (parent && parent.View) {
                this.superview = parent.View;
                this.superview._children.push(this);
                if (this.name)
                    this.superview[this.name] = this;
            }
            else if (this.name)
                window[this.name] = this;
        }
        _registerViewEvents() {
            let attributes = this._element.attributes;
            if (!attributes)
                return;
            for (let k in attributes) {
                if (!attributes.hasOwnProperty(k))
                    continue;
                let key = attributes[k].name;
                if (key.indexOf('@') !== 0)
                    continue;
                let event = key.substr(1);
                let specification = attributes[k].value || event;
                this._registerViewEvent(event, specification);
            }
        }
        _registerViewEvent(event, specification) {
            let target = Super.ObjectProperty.fromObjectPath(this, specification) ||
                Super.ObjectProperty.fromObjectPath(window, specification);
            if (!target)
                throw new Error('View event target [' + specification + '] is not valid.');
            if (!target.isFunction())
                throw new Error('View event target [' + specification + '] is not a function.');
            let listener = (function (target, sender) {
                return function (e) {
                    target.callFunction(e, sender);
                };
            })(target, this);
            this._element.addEventListener(event, listener);
        }
        beforexrselect(e, sender) { }
        abort(e, sender) { }
        blur(e, sender) { }
        cancel(e, sender) { }
        canplay(e, sender) { }
        canplaythrough(e, sender) { }
        change(e, sender) { }
        click(e, sender) { }
        close(e, sender) { }
        contextmenu(e, sender) { }
        cuechange(e, sender) { }
        dblclick(e, sender) { }
        drag(e, sender) { }
        dragend(e, sender) { }
        dragenter(e, sender) { }
        dragleave(e, sender) { }
        dragover(e, sender) { }
        dragstart(e, sender) { }
        drop(e, sender) { }
        durationchange(e, sender) { }
        emptied(e, sender) { }
        ended(e, sender) { }
        error(e, sender) { }
        focus(e, sender) { }
        formdata(e, sender) { }
        input(e, sender) { }
        invalid(e, sender) { }
        keydown(e, sender) { }
        keypress(e, sender) { }
        keyup(e, sender) { }
        load(e, sender) { }
        loadeddata(e, sender) { }
        loadedmetadata(e, sender) { }
        loadstart(e, sender) { }
        mousedown(e, sender) { }
        mouseenter(e, sender) { }
        mouseleave(e, sender) { }
        mousemove(e, sender) { }
        mouseout(e, sender) { }
        mouseover(e, sender) { }
        mouseup(e, sender) { }
        mousewheel(e, sender) { }
        pause(e, sender) { }
        play(e, sender) { }
        playing(e, sender) { }
        progress(e, sender) { }
        ratechange(e, sender) { }
        reset(e, sender) { }
        resize(e, sender) { }
        scroll(e, sender) { }
        seeked(e, sender) { }
        seeking(e, sender) { }
        select(e, sender) { }
        stalled(e, sender) { }
        submit(e, sender) { }
        suspend(e, sender) { }
        timeupdate(e, sender) { }
        toggle(e, sender) { }
        volumechange(e, sender) { }
        waiting(e, sender) { }
        wheel(e, sender) { }
        auxclick(e, sender) { }
        gotpointercapture(e, sender) { }
        lostpointercapture(e, sender) { }
        pointerdown(e, sender) { }
        pointermove(e, sender) { }
        pointerup(e, sender) { }
        pointercancel(e, sender) { }
        pointerover(e, sender) { }
        pointerout(e, sender) { }
        pointerenter(e, sender) { }
        pointerleave(e, sender) { }
        selectstart(e, sender) { }
        selectionchange(e, sender) { }
        animationend(e, sender) { }
        animationiteration(e, sender) { }
        animationstart(e, sender) { }
        transitionrun(e, sender) { }
        transitionstart(e, sender) { }
        transitionend(e, sender) { }
        transitioncancel(e, sender) { }
        copy(e, sender) { }
        cut(e, sender) { }
        paste(e, sender) { }
        pointerrawupdate(e, sender) { }
        beforecopy(e, sender) { }
        beforecut(e, sender) { }
        beforepaste(e, sender) { }
        search(e, sender) { }
        fullscreenchange(e, sender) { }
        fullscreenerror(e, sender) { }
    }
    ViewBase.global = window;
    Super.ViewBase = ViewBase;
})(Super || (Super = {}));
// noinspection JSUnusedGlobalSymbols
/// <reference path="./ViewBase.ts" />
var Super;
// noinspection JSUnusedGlobalSymbols
/// <reference path="./ViewBase.ts" />
(function (Super) {
    /**
     * Represents a view.
     */
    class View extends Super.ViewBase {
        constructor(element) {
            super(element);
            this._htmlElement = null;
            this._textElement = null;
        }
        /**
         * Gets the HTML content of the view's HTML element.
         */
        get html() {
            return (this._htmlElement || this._element).innerHTML;
        }
        /**
         * Sets the HTML content in the view's HTML element.
         * @param html
         */
        set html(html) {
            (this._htmlElement || this._element).innerHTML = html;
        }
        /**
         * Gets the text content of the view's text element.
         */
        get text() {
            return (this._textElement || this._element).textContent;
        }
        /**
         * Sets the HTML content in the view's text element.
         * @param text
         */
        set text(text) {
            (this._textElement || this._element).textContent = text;
        }
    }
    Super.View = View;
})(Super || (Super = {}));
//# sourceMappingURL=superview.es6.js.map