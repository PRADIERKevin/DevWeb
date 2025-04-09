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
    let tags : Tag[]= JSON.parse(localStorage.getItem("tags")!) || [] as Tag[];
    let nb = tags.length;
    let tag : Tag = {
      title: tagName,
      color: '#000000',
      id: nb
    };
    console.log("addTag")
    console.log(tag)
    const newTag = tag;
    tags.push(newTag);
    localStorage.setItem("tags", JSON.stringify(tags));

    let tags2 : Tag[]= JSON.parse(localStorage.getItem("tags")!) || [] as Tag[];
    console.log("storage")
    console.log(tags2)
  }
}
