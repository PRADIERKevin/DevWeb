import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component'
import { NotesComponent } from './notes/notes.component'

export const routes: Routes = [
    {path:'', component: NotesComponent},
    {path:'tags', component: TagsComponent}
];
