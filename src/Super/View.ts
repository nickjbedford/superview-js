module Super
{
	export class View
	{
		static global = <any>window;
		
		_element: Element;
		_children: View[] = [];
		_name: string = null;
		superview: View = null;
		[key: string]: any;
		
		constructor(element: any)
		{
			(<any>element).View = this;
			
			this._element = element;
			this._name = element.getAttribute('var') || null;
			
			this._registerWithParent();
			this._registerViewEvents();
		}
		
		static initializeViews(context: ParentNode)
		{
			context ||= document;
			let elements = context.querySelectorAll('[view]');
			let views: View[] = [];
			
			for(let i = 0; i < elements.length; i++)
			{
				let element = elements[i];
				let className = element.getAttribute('view') || 'Super.View';
				let classConstructor = ObjectProperty.fromObjectPath(window, className);
				
				if (!classConstructor || !classConstructor.isFunction())
					throw new Error('View class name is not a valid constructor.');
				
				views.push(new classConstructor.property(element));
			}
			return views;
		}
		
		addClass(classes: string|string[]): View
		{
			if (typeof classes == 'string')
				classes = classes.split(' ');
			this._element.classList.add.apply(this._element.classList, classes);
			return this;
		}
		
		removeClass(classes: string|string[]): View
		{
			if (typeof classes == 'string')
				classes = classes.split(' ');
			this._element.classList.remove.apply(this._element.classList, classes);
			return this;
		}
		
		_registerWithParent()
		{
			let parent = this._element.parentElement;
			
			while (parent && !('View' in parent))
				parent = parent.parentElement;
				
			if (parent && (<any>parent).View)
			{
				this.superview = (<any>parent).View;
				this.superview._children.push(this);
				
				if (this._name)
					this.superview[this._name] = this;
			}
			else if (this.as)
				(<any>window)[this.as] = this;
		}
		
		_registerViewEvents()
		{
			let attributes = this._element.attributes;
			if (!attributes)
				return;
			
			for(let k in attributes)
			{
				if (!attributes.hasOwnProperty(k))
					continue;
				
				let key = attributes[k].name;
				if (key.indexOf('@') !== 0)
					continue;
				
				this._registerViewEvent(key.substr(1), attributes[k].value);
			}
		}
		
		_registerViewEvent(event: string, specification: string)
		{
			let target = ObjectProperty.fromObjectPath(this, specification) ||
				ObjectProperty.fromObjectPath(window, specification);
			
			if (!target)
				throw new Error('View event target [' + specification + '] is not valid.');
			
			if (!target.isFunction())
				throw new Error('View event target [' + specification + '] is not a function.');
			
			let listener = (function(target, sender)
			{
				return function(e: Event)
				{
					target.callFunction(e, sender);
				};
			})(target, this);
			
			this._element.addEventListener(event, listener);
		}
	}
}