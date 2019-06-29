import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryDisplayComponent } from './components/story-display/story-display.component';

export const routes: Routes = [
  { path: 'newstories', component: StoryDisplayComponent },
  { path: 'beststories', component: StoryDisplayComponent },
  { path: 'askstories', component: StoryDisplayComponent },
  { path: 'showstories', component: StoryDisplayComponent },
  { path: 'jobstories', component: StoryDisplayComponent },
  { path: '', redirectTo: '/newstories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
