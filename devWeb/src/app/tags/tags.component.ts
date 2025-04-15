import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  public loaded: boolean;
  public tags: Tag[];
  public editing: Tag | null;
  public newTagTitle: string = '';
  public newTagColor: string = '#000000';

  constructor(private storageService: StorageService) {
    this.loaded = false;
    this.tags = [];
    this.editing = null;
    this.loadTags();
  }

  public get Tags(): Tag[] {
    return this.tags;
  }

  loadTags(force = false): void {
    if (!this.loaded || force) {
      this.tags = this.storageService.getTags();
      this.loaded = true;
    }
  }

  dialogAddTag(): void {
    const tagName = window.prompt("Nom du tag ?", this.newTagTitle);
    if (tagName) {
      const newTag: Tag = {
        id: this.tags.length,
        title: tagName,
        color: this.newTagColor || '#000000'
      };
      this.tags.push(newTag);
      this.storageService.saveTags(this.tags);
  
      this.newTagTitle = '';
    }
  }

  startEditNewTag(): void {
    this.editing = { id: 0, title: '', color: '#000000' };
  }

  startEditTag(tag: Tag): void {
    this.editing = { ...tag };
  }

  saveTag(): void {
    if (!this.editing) return;

    if (this.editing.id === 0 && this.editing.title) {
      this.editing.id = this.tags.length;
      this.tags.push(this.editing);
    } 
    else 
    {
      const index = this.tags.findIndex(t => t.id === this.editing!.id);
      if (index !== -1) this.tags[index] = this.editing;
    }

    this.storageService.saveTags(this.tags);
    this.editing = null;
  }

  cancelEdit(): void {
    this.editing = null;
  }

  deleteTag(tagToDelete: Tag): void {
    this.tags = this.tags.filter(tag => tag.id !== tagToDelete.id);
    this.storageService.saveTags(this.tags);
  }
}