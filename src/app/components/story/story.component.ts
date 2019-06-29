import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from '../../entities/item.entity';
import { HackernewsService } from 'src/app/services/hackernews.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.sass']
})
export class StoryComponent implements OnInit {
  @Input()
  storyId: number;

  @Input()
  index: number;

  story$: Observable<Item>;

  constructor(
    private hackernewsService: HackernewsService,
  ) { }

  ngOnInit() {
    this.getStory();
  }

  getStory() {
    this.story$ = this.hackernewsService.getItem(this.storyId);
  }
}
