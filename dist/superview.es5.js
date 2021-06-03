var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Super;
(function (Super) {
    var ObjectProperty = /** @class */ (function () {
        function ObjectProperty(object, property) {
            this.object = object;
            this.property = property;
        }
        ObjectProperty.prototype.isFunction = function () {
            return typeof this.property == 'function';
        };
        ObjectProperty.prototype.callFunction = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return this.property.apply(this.object, params);
        };
        /**
         * Follows a dot path from an initial object using an array
         * of property names.
         * @param object
         * @param path
         */
        ObjectProperty.fromObjectPath = function (object, path) {
            if (typeof path == 'string')
                path = path.split('.');
            if (!Array.isArray(path))
                throw new Error('Object path is not an array.');
            if (path.length === 0)
                throw new Error('Object path is empty.');
            for (var i = 0; i < path.length - 1; i++) {
                var key_1 = path[i];
                if (!(key_1 in object))
                    return null;
                object = object[key_1];
                if (!object)
                    return null;
            }
            var key = path[path.length - 1];
            if (!(key in object))
                return null;
            return new Super.ObjectProperty(object, object[key]);
        };
        return ObjectProperty;
    }());
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
    var ViewBase = /** @class */ (function () {
        function ViewBase(element) {
            this._children = [];
            this.name = null;
            this.superview = null;
            element.View = this;
            this._element = element;
            this.name = element.getAttribute('var') || null;
            this._registerWithParent();
            this._registerViewEvents();
        }
        ViewBase.initializeViews = function (context) {
            if (context === void 0) { context = document; }
            var elements = context.querySelectorAll('[view]');
            var views = [];
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var className = element.getAttribute('view') || 'Super.View';
                var classConstructor = Super.ObjectProperty.fromObjectPath(window, className);
                if (!classConstructor || !classConstructor.isFunction())
                    throw new Error('View class name is not a valid constructor.');
                views.push(new classConstructor.property(element));
            }
            return views;
        };
        ViewBase.prototype.addClass = function (classes) {
            if (typeof classes == 'string')
                classes = classes.split(' ');
            this._element.classList.add.apply(this._element.classList, classes);
            return this;
        };
        ViewBase.prototype.removeClass = function (classes) {
            if (typeof classes == 'string')
                classes = classes.split(' ');
            this._element.classList.remove.apply(this._element.classList, classes);
            return this;
        };
        ViewBase.prototype._registerWithParent = function () {
            var parent = this._element.parentElement;
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
        };
        ViewBase.prototype._registerViewEvents = function () {
            var attributes = this._element.attributes;
            if (!attributes)
                return;
            for (var k in attributes) {
                if (!attributes.hasOwnProperty(k))
                    continue;
                var key = attributes[k].name;
                if (key.indexOf('@') !== 0)
                    continue;
                var event_1 = key.substr(1);
                var specification = attributes[k].value || event_1;
                this._registerViewEvent(event_1, specification);
            }
        };
        ViewBase.prototype._registerViewEvent = function (event, specification) {
            var target = Super.ObjectProperty.fromObjectPath(this, specification) ||
                Super.ObjectProperty.fromObjectPath(window, specification);
            if (!target)
                throw new Error('View event target [' + specification + '] is not valid.');
            if (!target.isFunction())
                throw new Error('View event target [' + specification + '] is not a function.');
            var listener = (function (target, sender) {
                return function (e) {
                    target.callFunction(e, sender);
                };
            })(target, this);
            this._element.addEventListener(event, listener);
        };
        ViewBase.prototype.beforexrselect = function (e, sender) { };
        ViewBase.prototype.abort = function (e, sender) { };
        ViewBase.prototype.blur = function (e, sender) { };
        ViewBase.prototype.cancel = function (e, sender) { };
        ViewBase.prototype.canplay = function (e, sender) { };
        ViewBase.prototype.canplaythrough = function (e, sender) { };
        ViewBase.prototype.change = function (e, sender) { };
        ViewBase.prototype.click = function (e, sender) { };
        ViewBase.prototype.close = function (e, sender) { };
        ViewBase.prototype.contextmenu = function (e, sender) { };
        ViewBase.prototype.cuechange = function (e, sender) { };
        ViewBase.prototype.dblclick = function (e, sender) { };
        ViewBase.prototype.drag = function (e, sender) { };
        ViewBase.prototype.dragend = function (e, sender) { };
        ViewBase.prototype.dragenter = function (e, sender) { };
        ViewBase.prototype.dragleave = function (e, sender) { };
        ViewBase.prototype.dragover = function (e, sender) { };
        ViewBase.prototype.dragstart = function (e, sender) { };
        ViewBase.prototype.drop = function (e, sender) { };
        ViewBase.prototype.durationchange = function (e, sender) { };
        ViewBase.prototype.emptied = function (e, sender) { };
        ViewBase.prototype.ended = function (e, sender) { };
        ViewBase.prototype.error = function (e, sender) { };
        ViewBase.prototype.focus = function (e, sender) { };
        ViewBase.prototype.formdata = function (e, sender) { };
        ViewBase.prototype.input = function (e, sender) { };
        ViewBase.prototype.invalid = function (e, sender) { };
        ViewBase.prototype.keydown = function (e, sender) { };
        ViewBase.prototype.keypress = function (e, sender) { };
        ViewBase.prototype.keyup = function (e, sender) { };
        ViewBase.prototype.load = function (e, sender) { };
        ViewBase.prototype.loadeddata = function (e, sender) { };
        ViewBase.prototype.loadedmetadata = function (e, sender) { };
        ViewBase.prototype.loadstart = function (e, sender) { };
        ViewBase.prototype.mousedown = function (e, sender) { };
        ViewBase.prototype.mouseenter = function (e, sender) { };
        ViewBase.prototype.mouseleave = function (e, sender) { };
        ViewBase.prototype.mousemove = function (e, sender) { };
        ViewBase.prototype.mouseout = function (e, sender) { };
        ViewBase.prototype.mouseover = function (e, sender) { };
        ViewBase.prototype.mouseup = function (e, sender) { };
        ViewBase.prototype.mousewheel = function (e, sender) { };
        ViewBase.prototype.pause = function (e, sender) { };
        ViewBase.prototype.play = function (e, sender) { };
        ViewBase.prototype.playing = function (e, sender) { };
        ViewBase.prototype.progress = function (e, sender) { };
        ViewBase.prototype.ratechange = function (e, sender) { };
        ViewBase.prototype.reset = function (e, sender) { };
        ViewBase.prototype.resize = function (e, sender) { };
        ViewBase.prototype.scroll = function (e, sender) { };
        ViewBase.prototype.seeked = function (e, sender) { };
        ViewBase.prototype.seeking = function (e, sender) { };
        ViewBase.prototype.select = function (e, sender) { };
        ViewBase.prototype.stalled = function (e, sender) { };
        ViewBase.prototype.submit = function (e, sender) { };
        ViewBase.prototype.suspend = function (e, sender) { };
        ViewBase.prototype.timeupdate = function (e, sender) { };
        ViewBase.prototype.toggle = function (e, sender) { };
        ViewBase.prototype.volumechange = function (e, sender) { };
        ViewBase.prototype.waiting = function (e, sender) { };
        ViewBase.prototype.wheel = function (e, sender) { };
        ViewBase.prototype.auxclick = function (e, sender) { };
        ViewBase.prototype.gotpointercapture = function (e, sender) { };
        ViewBase.prototype.lostpointercapture = function (e, sender) { };
        ViewBase.prototype.pointerdown = function (e, sender) { };
        ViewBase.prototype.pointermove = function (e, sender) { };
        ViewBase.prototype.pointerup = function (e, sender) { };
        ViewBase.prototype.pointercancel = function (e, sender) { };
        ViewBase.prototype.pointerover = function (e, sender) { };
        ViewBase.prototype.pointerout = function (e, sender) { };
        ViewBase.prototype.pointerenter = function (e, sender) { };
        ViewBase.prototype.pointerleave = function (e, sender) { };
        ViewBase.prototype.selectstart = function (e, sender) { };
        ViewBase.prototype.selectionchange = function (e, sender) { };
        ViewBase.prototype.animationend = function (e, sender) { };
        ViewBase.prototype.animationiteration = function (e, sender) { };
        ViewBase.prototype.animationstart = function (e, sender) { };
        ViewBase.prototype.transitionrun = function (e, sender) { };
        ViewBase.prototype.transitionstart = function (e, sender) { };
        ViewBase.prototype.transitionend = function (e, sender) { };
        ViewBase.prototype.transitioncancel = function (e, sender) { };
        ViewBase.prototype.copy = function (e, sender) { };
        ViewBase.prototype.cut = function (e, sender) { };
        ViewBase.prototype.paste = function (e, sender) { };
        ViewBase.prototype.pointerrawupdate = function (e, sender) { };
        ViewBase.prototype.beforecopy = function (e, sender) { };
        ViewBase.prototype.beforecut = function (e, sender) { };
        ViewBase.prototype.beforepaste = function (e, sender) { };
        ViewBase.prototype.search = function (e, sender) { };
        ViewBase.prototype.fullscreenchange = function (e, sender) { };
        ViewBase.prototype.fullscreenerror = function (e, sender) { };
        ViewBase.global = window;
        return ViewBase;
    }());
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
    var View = /** @class */ (function (_super) {
        __extends(View, _super);
        function View(element) {
            var _this = _super.call(this, element) || this;
            _this._htmlElement = null;
            _this._textElement = null;
            return _this;
        }
        Object.defineProperty(View.prototype, "html", {
            /**
             * Gets the HTML content of the view's HTML element.
             */
            get: function () {
                return (this._htmlElement || this._element).innerHTML;
            },
            /**
             * Sets the HTML content in the view's HTML element.
             * @param html
             */
            set: function (html) {
                (this._htmlElement || this._element).innerHTML = html;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "text", {
            /**
             * Gets the text content of the view's text element.
             */
            get: function () {
                return (this._textElement || this._element).textContent;
            },
            /**
             * Sets the HTML content in the view's text element.
             * @param text
             */
            set: function (text) {
                (this._textElement || this._element).textContent = text;
            },
            enumerable: false,
            configurable: true
        });
        return View;
    }(Super.ViewBase));
    Super.View = View;
})(Super || (Super = {}));
//# sourceMappingURL=superview.es5.js.map