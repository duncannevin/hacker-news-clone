import { Component, OnInit } from '@angular/core';
import { HackernewsService } from 'src/app/services/hackernews.service';
import { Router } from '@angular/router';

import { Item } from '../../entities/item.entity';
import { STORIES } from '../../common/STORIES';

@Component({
  selector: 'app-story-display',
  templateUrl: './story-display.component.html',
  styleUrls: ['./story-display.component.sass']
})
export class StoryDisplayComponent implements OnInit {
  storyType: string;
  stories: Item[] = [];
  // STORIES.map(s => s as Item);
  cursorPos: number = 0;

  constructor(
    private hackernewsService: HackernewsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setStoryType();
    this.getStoryIds();
  }

  setStoryType(): void {
    this.storyType = this.router.url.replace('/', '');
  }

  getStoryIds(): void {
    this.hackernewsService.getIds(this.storyType)
      .subscribe(items => {
        this.stories = items;
        this.getStories();
      });
  }

  getStories(): void {
    const getStory: Item = this.stories[this.cursorPos]
    if(!getStory || (this.cursorPos && this.cursorPos % 30 === 0)) {
      return;
    }
    this.hackernewsService.getItem(this.stories[this.cursorPos].id)
      .subscribe(story => {
        story.index = this.cursorPos;
        this.stories[this.cursorPos] = story as Item;
        this.cursorPos++;
        this.getStories();
      });
  }

  getDisplayStories(): Item[] {
    return this.stories.slice(0, this.cursorPos - 1);
  }

  readyToDisplay(): boolean {
    const display = this.getDisplayStories();
    return display.length && !!display[display.length - 1].index
  }
}
