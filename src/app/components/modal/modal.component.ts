import { Component, Input, ElementRef, Output, EventEmitter, OnDestroy, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Component({
	selector: 'modal',
	templateUrl: 'modal.component.html',
	styleUrls: ['modal.component.scss']
})
export class ModalComponent implements OnDestroy {
	@ViewChild('closableTarget', { static: true }) public closableTarget: ElementRef;

	private player: AnimationPlayer;
	
	public isOpened: boolean;
	public canClose: () => Promise<boolean>;

	@Input() public contentClass: string;
	@Input() public overflow: string;
	@Input() public closeButton: boolean = true;
	@Input() public outsideClickClose: boolean = true;

	@Output("onClosed") public onClosed = new EventEmitter<ModalComponent.ClosedEvent>();

	constructor(
		private animationBuilder: AnimationBuilder,
		private elRef: ElementRef,
		private renderer: Renderer2) {

		this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
		this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '0');
	}

	public open(): Promise<void> {
		return new Promise<void>(resolve => {
			this.isOpened = true;
			this.player =
				this.animationBuilder
					.build([
						style({
							opacity: '0',
							zIndex: '99999'
						}),
						animate('500ms ease', style({ opacity: '1' }))
					])
					.create(this.elRef.nativeElement);
	
			this.player.onDone(() => {
				resolve();
			});
	
			this.renderer.setStyle(this.elRef.nativeElement, 'display', '');
	
			setTimeout(() => {
				this.player.play();
			}, 0);
	
			this.suspendBodyScroll();
			this.suspendHeaderZindex();
		});
	}

	public async close(): Promise<void> {
		if (this.isOpened) {
			if (this.canClose) {
				const can = await this.canClose();
				can && await this.doClose();
			}
			else {
				await this.doClose();
			}
		}
	}

	private doClose(): Promise<void> {
		if (this.isOpened) {
			return new Promise<void>(resolve => {
				this.player =
					this.animationBuilder
						.build([
							animate('500ms ease', style({ opacity: '0' }))
						]).create(this.elRef.nativeElement);

				this.player.onDone(() => {
					this.isOpened = false;
					this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');

                    setTimeout(() => {
                        try {
						    this.onClosed.emit({
							    modal: this
                            });
                        }
					    catch { }

						resolve();
					});
				});

				setTimeout(() => {
					this.player.play();
				}, 0);

				this.resumeBodyScroll();
				this.resumeHeaderZindex();
			});
		}
		
		return Promise.resolve();
	}

	public outSideClick($event: Event): void {
		if ($event.target === this.closableTarget.nativeElement && this.outsideClickClose) {
			this.close();
		}
	}

	public ngOnDestroy(): void {
		this.onClosed.unsubscribe();
	}

	private suspendBodyScroll(): void {
		try {
			if (document && document.body) {
				if (!(document.body as any).suspendScroll) {
					(document.body as any).suspendScroll = 1;
					this.renderer.setStyle(document.body, 'overflow', 'hidden');
				}
				else {
					(document.body as any).suspendScroll++;
				}
			}
		}
		catch (ex) {
			console.log(ex);
		}
	}

	private resumeBodyScroll(): void {
		try {
			if ((document.body as any).suspendScroll) {
				(document.body as any).suspendScroll--;
			}

			if (!(document.body as any).suspendScroll) {
				this.renderer.setStyle(document.body, 'overflow', 'auto');
			}
		}
		catch (ex) {
			console.log(ex);
		}
	}

	private suspendHeaderZindex(): void {
		try {
			if (document && document.body) {
				const header = document.getElementsByClassName("app-header")[0];
				
				this.renderer.setStyle(header, 'z-index', '-1');
			}
		}
		catch (ex) {
			console.log(ex);
		}
	}

	private resumeHeaderZindex(): void {
		try {
			if (document && document.body) {
				const header = document.getElementsByClassName("app-header")[0];

				this.renderer.setStyle(header, 'z-index', '99');
			}
		}
		catch (ex) {
			console.log(ex);
		}
	}

	@HostListener('document:keyup', ['$event'])
	public onKeyUp(event: KeyboardEvent) {
		event.preventDefault();
		event.stopPropagation();
		if (event.keyCode === 27 && (this.closeButton || this.outsideClickClose)) { //escape
			this.close();
		}
	}
}
export namespace ModalComponent {
	export interface ClosedEvent {
		modal: ModalComponent;
	}

	export interface BeforeCloseEvent {
		modal: ModalComponent;
		cancel: boolean;
	}
}