import { Component, input } from '@angular/core';
import { Tag } from '../tag';

@Component({
  selector: 'app-note',
  standalone: true,
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  id = input<number>(0);
  title = input<string>('');
  content = input<string>('');
  color = input<string>('#000000');
  tags = input<Tag[]>([]);

  public get Tags(): Tag[] {
    return this.tags();
  }
}