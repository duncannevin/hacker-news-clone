import { Component, OnInit, HostListener } from '@angular/core';
import { HackernewsService } from 'src/app/services/hackernews.service';
import { Router } from '@angular/router';

import { Item } from '../../entities/item.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-display',
  templateUrl: './story-display.component.html',
  styleUrls: ['./story-display.component.sass']
})
export class StoryDisplayComponent implements OnInit {
  storyType: string;
  stories$: Observable<Item[]>;
  cursorPos: number = 30;

  constructor(
    private hackernewsService: HackernewsService,
    private router: Router
  ) { }

  @HostListener('window:scroll', [ '$event' ])
  onscroll(event) {
    const windowScrollBottom = window.scrollY + window.innerHeight;
    const appStoryHeight = document.querySelector('app-story-display').scrollHeight;
    if (windowScrollBottom - appStoryHeight === 100) {
      this.incrementCursor();
    }
  }

  ngOnInit() {
    this.setStoryType();
    this.getStoryIds();
  }

  setStoryType(): void {
    this.storyType = this.router.url.replace('/', '');
  }

  getStoryIds(): void {
    this.stories$ = this.hackernewsService.getIds(this.storyType);
  }

  incrementCursor(): void {
    this.cursorPos += 30;
  }
}
