import { Injectable, Inject } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SEOService {
	private title: string;
	private subTitle: string;

	constructor(
		private titleService: Title,
		private meta: Meta,
		@Inject(DOCUMENT) private dom: Document) { }


	public updateSEO(title?: string, description?: string, imageUrl?: string, url?: string, noIndex?: boolean): void {
		this.removeNoIndexMetas();

		if(title) this.setTitle(title);
		if(description) this.setDescription(description);
		if(imageUrl) this.setImage(imageUrl);
		if(url) this.setUrl();

		if (noIndex) {
			this.addNoIndexMetas();
		}
	}

	public setTitle(title: string): void {
		this.title = title;

		title = [this.subTitle, this.title].filter(t => t).join(" - ");

		this.titleService.setTitle(title);
		this.setMeta('title', title);
	}

	public setSubTitle(subTitle: string): void {
		this.subTitle = subTitle;

		this.setTitle(this.title);
	}

	public setDescription(description: string): void {
		const tags: Array<string> = ['description', 'og:description', 'twitter:description'];

		tags.forEach((tag) => { this.setMeta(tag, description); });
	}

	public setImage(imageUrl: string): void {
		const tags: Array<string> = ['twitter:image', 'og:image'];

		tags.forEach((tag) => { this.setMeta(tag, imageUrl); });
	}

	public setUrl(url?: string): void {
		const tags: Array<string> = ['twitter:url', 'og:url'];
		//const routerUrl: string = this.router.url;
		let completeUrl: string = url;

		// if(!completeUrl){
		// 	completeUrl = `${this.URL}${routerUrl && routerUrl.length > 0 && routerUrl.charAt(0) === '/' ? routerUrl.substring(1, routerUrl.length) : routerUrl}`;
		// }

		tags.forEach((tag) => { this.setMeta(tag, completeUrl); });
		this.setLinkCanonical(completeUrl);
	}

	public addNoIndexMetas(): void {
		this.setMeta('robots', 'noindex');
		this.setMeta('googlebot', 'noindex');
	}

	public removeNoIndexMetas(): void {
		const existingRobotsMeta: HTMLMetaElement = this.meta.getTag(`name="robots"`);
		if (existingRobotsMeta) {
			this.dom.head.removeChild(existingRobotsMeta);
		}

		const existingGoogleBotMeta: HTMLMetaElement = this.meta.getTag(`name="googlebot"`);
		if (existingGoogleBotMeta) {
			this.dom.head.removeChild(existingGoogleBotMeta);
		}
	}

	public setFavicon(url: string): void {
		const link: HTMLLinkElement = this.dom.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = url;
		this.dom.head.appendChild(link);
	}

	private setLinkCanonical(url: string): void {
		const canonicalId: string = 'canonical-link';
		const existingCanonical: HTMLLinkElement = <HTMLLinkElement>this.dom.getElementById(canonicalId);

		if (existingCanonical) {
			this.dom.head.removeChild(existingCanonical);
		}

		const link: HTMLLinkElement = this.dom.createElement('link');
		link.id = canonicalId;
		link.setAttribute('rel', 'canonical');
		link.setAttribute('href', url);
		this.dom.head.appendChild(link);
	}

	private setMeta(name: string, content: string): void {
		const existingMeta: HTMLMetaElement = this.meta.getTag(`name="${name}"`);
		const newMeta: MetaDefinition = { name: name, content: content };
		if (existingMeta) {
			this.meta.updateTag(newMeta);
		} else {
			this.meta.addTag(newMeta);
		}
	}
}