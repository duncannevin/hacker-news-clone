import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../entities/item.entity';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.sass']
})
export class StoryComponent implements OnInit {
  @Input()
  story: Item;

  constructor() { }

  ngOnInit() {
  }
}
