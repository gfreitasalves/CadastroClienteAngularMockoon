import { Injectable, TemplateRef  } from '@angular/core';

export interface Toast {
	message: string;
	classname?: string;
	delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  toasts: Toast[] = [];

  log(message: string) {
    //TODO:Implement log
    console.log(message)    
  }

  showSuccess(message: string) {    
    this.toasts.push({ message: message, classname: 'bg-success text-light'});
  }

  hide(toast:Toast) {   
		this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
		this.toasts.splice(0, this.toasts.length);
  }
}
