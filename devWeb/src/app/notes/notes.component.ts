import { Component } from '@angular/core';
import { Note } from '../note';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: Note[] = [];
  tags: Tag[] = [];
  editing: Note | null = null;
  newNote: Note = { title: '', content: '', color: '#dddddd', tags: [] };

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
    const newNoteCopy = { ...this.newNote, tags: [...this.newNote.tags] };
    this.notes.push(newNoteCopy);
    this.saveNotes();
    this.resetForm();
  }

  editNote(note: Note) {
    this.editing = { ...note, tags: [...note.tags] };
  }

  saveEdit() {
    if (!this.editing) return;
    const index = this.notes.findIndex(n => n.title === this.editing!.title);
    if (index !== -1) {
      this.notes[index] = this.editing!;
      this.saveNotes();
    }
    this.editing = null;
  }

  cancelEdit() {
    this.editing = null;
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter(n => n.title !== note.title);
    this.saveNotes();
  }

  resetForm() {
    this.newNote = { title: '', content: '', color: '#dddddd', tags: [] };
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
}
