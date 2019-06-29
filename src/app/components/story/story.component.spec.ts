import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { StoryComponent } from './story.component';
import { AppModule } from 'src/app/app.module';
import { STORIES } from '../../common/STORIES';
import { Item } from 'src/app/entities/item.entity';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.story = STORIES[0] as Item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a story title', () => {
    const titleEl = el.query(By.css('.title > a'));
    expect(titleEl.nativeElement.textContent).toBe(component.story.title);
  });

  it('should display a story score', () => {
    const navs = el.queryAll(By.css('.navs li'));
    expect(navs[0].nativeElement.textContent).toBe(component.story.score + ' points');
  });

  it('should display a story author', () => {
    const navs = el.queryAll(By.css('.navs li'));
    const nav = navs[1].query(By.css('a'));
    expect(nav.nativeElement.textContent).toBe('by ' + component.story.by);
  });

  it('should display a story time', () => {
    const navs = el.queryAll(By.css('.navs li'));
    expect(navs[2].nativeElement.textContent).toBe(moment(component.story.time, 'X').fromNow());
  });

  it('should display a story comments', () => {
    const navs = el.queryAll(By.css('.navs li'));
    const nav = navs[3].query(By.css('a'));
    expect(nav.nativeElement.textContent).toBe(component.story.kids || 0 + ' comments');
  });
});
