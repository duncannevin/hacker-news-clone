import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoryDisplayComponent } from './components/story-display/story-display.component';
import { HackernewsService } from './services/hackernews.service';
import { StoryComponent } from './components/story/story.component';
import { TimePipe } from './pipes/time.pipe';
import { UserComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoryDisplayComponent,
    StoryComponent,
    UserComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HackernewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
