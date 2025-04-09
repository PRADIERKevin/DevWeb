import { Injectable } from '@angular/core';
import { Tag } from './tag';

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

  addTag(tagName : string){
    console.log("addTag")
    console.log(tagName)
    let tags = JSON.parse(localStorage.getItem("tags")!) || [];
    const newTag = { tagName };
    tags.push(newTag);
    localStorage.setItem("tags", JSON.stringify(tags));
  }
}
