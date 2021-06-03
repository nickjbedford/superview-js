namespace Super
{
	export class ObjectProperty
	{
		object: any;
		property: any;
		
		constructor(object: any, property: any)
		{
			this.object = object;
			this.property = property;
		}
		
		isFunction(): boolean
		{
			return typeof this.property == 'function';
		}
		
		callFunction(...params: any[]): any
		{
			return (<Function>this.property).apply(this.object, params);
		}
		
		/**
		 * Follows a dot path from an initial object using an array
		 * of property names.
		 * @param object
		 * @param path
		 */
		static fromObjectPath(
			object: any,
			path: string[]|string): ObjectProperty|null
		{
			if (typeof path == 'string')
				path = path.split('.');
			
			if (!Array.isArray(path))
				throw new Error('Object path is not an array.');
			
			if (path.length === 0)
				throw new Error('Object path is empty.');
			
			for(let i = 0; i < path.length - 1; i++)
			{
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
}