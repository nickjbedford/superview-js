// noinspection JSUnusedGlobalSymbols
/// <reference path="./ViewBase.ts" />

namespace Super
{
	/**
	 * Represents a view.
	 */
	export class View extends ViewBase
	{
		_htmlElement: Element = null;
		_textElement: Element = null;
		
		constructor(element: any)
		{
			super(element);
		}
		
		/**
		 * Gets the HTML content of the view's HTML element.
		 */
		get html(): string
		{
			return (this._htmlElement || this._element).innerHTML;
		}
		
		/**
		 * Sets the HTML content in the view's HTML element.
		 * @param html
		 */
		set html(html: string)
		{
			(this._htmlElement || this._element).innerHTML = html;
		}
		
		/**
		 * Gets the text content of the view's text element.
		 */
		get text(): string
		{
			return (this._textElement || this._element).textContent;
		}
		
		/**
		 * Sets the HTML content in the view's text element.
		 * @param text
		 */
		set text(text: string)
		{
			(this._textElement || this._element).textContent = text;
		}
	}
}