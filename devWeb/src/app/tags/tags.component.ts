import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  public loaded : boolean;
  public tags : Tag[];

  constructor(private storageService:StorageService) {
    this.loaded = false;
    this.tags = [];
  }

  public get Tags() : Tag[]{
    this.tags = this.storageService.getTags();
    return this.tags;
  }

  loadTags() {
    if(!this.loaded){
      this.storageService.getTags();
    }
  }

  dialogAddTag(){
    const tagName = window.prompt();
    if(tagName){
      this.storageService.addTag(tagName);
    }
  }

}
