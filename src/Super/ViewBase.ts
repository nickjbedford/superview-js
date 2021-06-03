// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
/// <reference path="./ObjectProperty.ts" />

namespace Super
{
	/**
	 * Defines the base functionality of all views.
	 */
	export class ViewBase
	{
		static global = <any>window;
		
		_element: Element;
		_children: ViewBase[] = [];
		name: string = null;
		superview: ViewBase = null;
		[key: string]: any;
		
		constructor(element: any)
		{
			(<any>element).View = this;
			
			this._element = element;
			this.name = element.getAttribute('var') || null;
			
			this._registerWithParent();
			this._registerViewEvents();
		}
		
		static initializeViews(context: ParentNode = document)
		{
			let elements = context.querySelectorAll('[view]');
			let views: ViewBase[] = [];
			
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
		
		addClass(classes: string|string[]): ViewBase
		{
			if (typeof classes == 'string')
				classes = classes.split(' ');
			this._element.classList.add.apply(this._element.classList, classes);
			return this;
		}
		
		removeClass(classes: string|string[]): ViewBase
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
				
				if (this.name)
					this.superview[this.name] = this;
			}
			else if (this.name)
				(<any>window)[this.name] = this;
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
				
				let event = key.substr(1);
				let specification = attributes[k].value || event;
				this._registerViewEvent(event, specification);
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
		
		beforexrselect(e: any, sender: any): any {}
		abort(e: any, sender: any): any {}
		blur(e: any, sender: any): any {}
		cancel(e: any, sender: any): any {}
		canplay(e: any, sender: any): any {}
		canplaythrough(e: any, sender: any): any {}
		change(e: any, sender: any): any {}
		click(e: any, sender: any): any {}
		close(e: any, sender: any): any {}
		contextmenu(e: any, sender: any): any {}
		cuechange(e: any, sender: any): any {}
		dblclick(e: any, sender: any): any {}
		drag(e: any, sender: any): any {}
		dragend(e: any, sender: any): any {}
		dragenter(e: any, sender: any): any {}
		dragleave(e: any, sender: any): any {}
		dragover(e: any, sender: any): any {}
		dragstart(e: any, sender: any): any {}
		drop(e: any, sender: any): any {}
		durationchange(e: any, sender: any): any {}
		emptied(e: any, sender: any): any {}
		ended(e: any, sender: any): any {}
		error(e: any, sender: any): any {}
		focus(e: any, sender: any): any {}
		formdata(e: any, sender: any): any {}
		input(e: any, sender: any): any {}
		invalid(e: any, sender: any): any {}
		keydown(e: any, sender: any): any {}
		keypress(e: any, sender: any): any {}
		keyup(e: any, sender: any): any {}
		load(e: any, sender: any): any {}
		loadeddata(e: any, sender: any): any {}
		loadedmetadata(e: any, sender: any): any {}
		loadstart(e: any, sender: any): any {}
		mousedown(e: any, sender: any): any {}
		mouseenter(e: any, sender: any): any {}
		mouseleave(e: any, sender: any): any {}
		mousemove(e: any, sender: any): any {}
		mouseout(e: any, sender: any): any {}
		mouseover(e: any, sender: any): any {}
		mouseup(e: any, sender: any): any {}
		mousewheel(e: any, sender: any): any {}
		pause(e: any, sender: any): any {}
		play(e: any, sender: any): any {}
		playing(e: any, sender: any): any {}
		progress(e: any, sender: any): any {}
		ratechange(e: any, sender: any): any {}
		reset(e: any, sender: any): any {}
		resize(e: any, sender: any): any {}
		scroll(e: any, sender: any): any {}
		seeked(e: any, sender: any): any {}
		seeking(e: any, sender: any): any {}
		select(e: any, sender: any): any {}
		stalled(e: any, sender: any): any {}
		submit(e: any, sender: any): any {}
		suspend(e: any, sender: any): any {}
		timeupdate(e: any, sender: any): any {}
		toggle(e: any, sender: any): any {}
		volumechange(e: any, sender: any): any {}
		waiting(e: any, sender: any): any {}
		wheel(e: any, sender: any): any {}
		auxclick(e: any, sender: any): any {}
		gotpointercapture(e: any, sender: any): any {}
		lostpointercapture(e: any, sender: any): any {}
		pointerdown(e: any, sender: any): any {}
		pointermove(e: any, sender: any): any {}
		pointerup(e: any, sender: any): any {}
		pointercancel(e: any, sender: any): any {}
		pointerover(e: any, sender: any): any {}
		pointerout(e: any, sender: any): any {}
		pointerenter(e: any, sender: any): any {}
		pointerleave(e: any, sender: any): any {}
		selectstart(e: any, sender: any): any {}
		selectionchange(e: any, sender: any): any {}
		animationend(e: any, sender: any): any {}
		animationiteration(e: any, sender: any): any {}
		animationstart(e: any, sender: any): any {}
		transitionrun(e: any, sender: any): any {}
		transitionstart(e: any, sender: any): any {}
		transitionend(e: any, sender: any): any {}
		transitioncancel(e: any, sender: any): any {}
		copy(e: any, sender: any): any {}
		cut(e: any, sender: any): any {}
		paste(e: any, sender: any): any {}
		pointerrawupdate(e: any, sender: any): any {}
		beforecopy(e: any, sender: any): any {}
		beforecut(e: any, sender: any): any {}
		beforepaste(e: any, sender: any): any {}
		search(e: any, sender: any): any {}
		fullscreenchange(e: any, sender: any): any {}
		fullscreenerror(e: any, sender: any): any {}
	}
}