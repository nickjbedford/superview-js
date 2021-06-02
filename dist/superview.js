var Super;
(function (Super) {
    class View {
        constructor(element) {
            this._children = [];
            this._name = null;
            this.superview = null;
            element.View = this;
            this._element = element;
            this._name = element.getAttribute('var') || null;
            this._registerWithParent();
            this._registerViewEvents();
        }
        static initializeViews(context) {
            context || (context = document);
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
                if (this._name)
                    this.superview[this._name] = this;
            }
            else if (this.as)
                window[this.as] = this;
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
                this._registerViewEvent(key.substr(1), attributes[k].value);
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
    }
    View.global = window;
    Super.View = View;
})(Super || (Super = {}));
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
//# sourceMappingURL=superview.js.map