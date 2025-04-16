import { Component } from '@angular/core';
import { Note } from '../note';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: Note[] = [];
  tags: Tag[] = [];
  editing: Note | null = null;
  defaultNote: Note = { title: 'Title', content: 'Content', color: '#dddddd', tags: [] };
  draggedNote: Note | null = null;

  constructor(private storageService: StorageService) {
    this.loadNotes();
    this.tags = this.storageService.getTags();
  }

  loadNotes() {
    this.notes = this.storageService.getNotes();
  }

  saveNotes() {
    this.storageService.saveNotes(this.notes);
  }

  createNote() {
    const newNote =
    {
      ...this.defaultNote,
      id: Date.now(),
      tags: [...this.defaultNote.tags],
    };
    this.notes.push(newNote);
    this.saveNotes();
    this.resetForm();
  }
  
  resetForm() {
    this.defaultNote = { title: 'Title', content: 'Content', color: '#dddddd', tags: [] };
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter(n => n.id !== note.id);
    this.saveNotes();
  }

  editNote(note: Note) {
    this.editing = { ...note, tags: [...note.tags] };
  }
  
  saveEdit() {
    if (!this.editing) return;
    const index = this.notes.findIndex(n => n.id === this.editing!.id);
    if (index !== -1) {
      this.notes[index] = this.editing!;
      this.saveNotes();
    }
    this.editing = null;
  }  

  cancelEdit() {
    this.editing = null;
  }

  toggleTagSelection(note: Note, tagTitle: string) {
    if (note.tags.includes(tagTitle)) {
      note.tags = note.tags.filter(t => t !== tagTitle);
    } else {
      note.tags.push(tagTitle);
    }
  }

  getTagColor(tagTitle: string): string {
    const tag = this.tags.find(t => t.title === tagTitle);
    return tag?.color || '#ccc';
  }

  onDragStart(note: Note) {
    this.draggedNote = note;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(targetNote: Note) {
    if (this.draggedNote || this.draggedNote !== targetNote)
    {
      const fromIndex = this.notes.findIndex(n => n === this.draggedNote);
      const toIndex = this.notes.findIndex(n => n === targetNote);
  
      if (fromIndex !== -1 && toIndex !== -1)
      {
        const [moved] = this.notes.splice(fromIndex, 1);
        this.notes.splice(toIndex, 0, moved);
        this.saveNotes();
      }
  
      this.draggedNote = null;
    }
  }

}
