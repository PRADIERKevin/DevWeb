import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule, TagComponent],
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

  loadTags(): void {
    if (!this.loaded)
    {
      this.tags = this.storageService.getTags();
      this.loaded = true;
    }
  }

  dialogAddTag(): void {
    if (this.newTagTitle)
    {
      const newTag: Tag = {
        id: this.tags.length,
        title: this.newTagTitle,
        color: this.newTagColor
      };
      this.tags.push(newTag);
      this.storageService.saveTags(this.tags);
  
      this.newTagTitle = '';
    }
  }

  startEditTag(tag: Tag): void {
    this.editing = { ...tag };
  }

  saveTag(): void {
    const index = this.tags.findIndex(t => t.id === this.editing!.id);
    if (index > -1)
    {
      this.tags[index] = this.editing!;
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