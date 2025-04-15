import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note';

@Injectable({
  providedIn: 'any'
})
export class StorageService {

  constructor() { }

  getTags(){
    console.log("getTags")
    let tags : Tag[]= JSON.parse(localStorage.getItem("tags")!) || [] as Tag[];
    return tags;
  }

  addTag(title: string, color: string = "#000000") {
    let tags: Tag[] = this.getTags();
    const newTag: Tag = {
      id: tags.length,
      title,
      color
    };
    tags.push(newTag);
    this.saveTags(tags);
  }  

  saveTags(tags: Tag[]) {
    localStorage.setItem("tags", JSON.stringify(tags));
  }
  
  getNotes(): Note[] {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  }
  
  saveNotes(notes: Note[]): void {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
}
