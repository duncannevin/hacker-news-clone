import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import * as moment from 'moment';

import { StoryComponent } from './story.component';
import { AppModule } from 'src/app/app.module';
import { STORIES } from '../../common/STORIES';
import { Item } from 'src/app/entities/item.entity';
import { HackernewsService } from 'src/app/services/hackernews.service';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let el: DebugElement;
  let hackernewsService: any;

  beforeEach(async(() => {
    const hackernewsServiceSpy = jasmine.createSpyObj('HackernewsService', [
      'getItem' 
    ]);

    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        { provide: HackernewsService, useValue: hackernewsServiceSpy }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(StoryComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      hackernewsService = TestBed.get(HackernewsService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render a story if `story$` is null', () => {
    const container = el.query(By.css('div'));
    expect(container).toBeFalsy();
  });

  it('should render a story when `story$` contains an Item', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[0] as Item));
    fixture.detectChanges();
    const container = el.query(By.css('div'));
    expect(container).toBeTruthy();
  });

  it('should render corrent item number', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const container = el.query(By.css('div'));
    expect(container).toBeTruthy();
    const pageNumber = container.query(By.css('.page-number'));
    expect(parseInt(pageNumber.nativeElement.textContent)).toBe(11 + 1);
  });

  it('should render the correct title', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const container = el.query(By.css('div'));
    expect(container).toBeTruthy();
    const title = container.query(By.css('.title a'));
    expect(title.nativeElement.textContent).toBe(STORIES[11].title);
  });

  it('should render a score', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const navs = el.query(By.css('.navs'));
    expect(navs).toBeTruthy();
    const points = navs.queryAll(By.css('li'));
    expect(points[0].nativeElement.textContent).toBe(STORIES[11].score + ' points');
  });

  it('should render the author', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const navs = el.query(By.css('.navs'));
    expect(navs).toBeTruthy();
    const points = navs.queryAll(By.css('li'));
    const link = points[1].query(By.css('a'));
    expect(link.nativeElement.textContent).toBe('by ' + STORIES[11].by);
  });

  it('should render publish date', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const navs = el.query(By.css('.navs'));
    expect(navs).toBeTruthy();
    const points = navs.queryAll(By.css('li'));
    expect(points[2].nativeElement.textContent).toBe(moment(STORIES[11].time, 'X').fromNow());
  });

  it('should render comment count', () => {
    hackernewsService.getItem.and.returnValue(of(STORIES[11] as Item));
    component.index = 11;
    fixture.detectChanges();
    const navs = el.query(By.css('.navs'));
    expect(navs).toBeTruthy();
    const points = navs.queryAll(By.css('li'));
    const link = points[3].query(By.css('a'));
    expect(link.nativeElement.textContent).toBe((STORIES[11].kids || []).length + ' comments');
  });
});
