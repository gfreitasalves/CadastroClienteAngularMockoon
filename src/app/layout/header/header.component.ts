import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  messageService = inject(MessageService);
}
