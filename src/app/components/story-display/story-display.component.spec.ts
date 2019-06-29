import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { StoryDisplayComponent } from './story-display.component';
import { HackernewsService } from 'src/app/services/hackernews.service';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { STORIES } from '../../common/STORIES';
import { routes } from '../../app-routing.module';

describe('StoryDisplayComponent', () => {
  let component: StoryDisplayComponent;
  let fixture: ComponentFixture<StoryDisplayComponent>;
  let el: DebugElement;
  let hackernewsService: any;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    const hackernewsServiceSpy = jasmine.createSpyObj('HackernewsService', [ 
      'getIds',
      'getItem'
    ])

    TestBed.configureTestingModule({
      imports: [ 
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: HackernewsService, useValue: hackernewsServiceSpy },
      ]
    })
    .compileComponents()
    .then(() => {
      hackernewsService = TestBed.get(HackernewsService);
      router = TestBed.get(Router);
      location = TestBed.get(Location);

      fixture = TestBed.createComponent(StoryDisplayComponent);
      router.initialNavigation();
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no stories rendered when stories$ is null', () => {
    const container = el.query(By.css('div'));
    expect(container).toBeFalsy();
  });

  it('should render 30 stories', () => {
    hackernewsService.getIds.and.returnValue(of(STORIES));
    fixture.detectChanges();
    const container = el.query(By.css('div'));
    expect(container).toBeTruthy();
    const childs = container.queryAll(By.css('app-story'));
    expect(childs.length).toBe(30);
  });

  it('should render 60 stories when `incrementCursor` called once', () => {
    hackernewsService.getIds.and.returnValue(of(STORIES));
    fixture.detectChanges();
    component.incrementCursor();
    fixture.detectChanges();
    const container = el.query(By.css('div'));
    expect(container).toBeTruthy();
    const childs = container.queryAll(By.css('app-story'));
    expect(childs.length).toBe(60);
  });
});
