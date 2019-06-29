import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDisplayComponent } from './story-display.component';
import { HackernewsService } from 'src/app/services/hackernews.service';
import { AppModule } from 'src/app/app.module';

xdescribe('StoryDisplayComponent', () => {
  let component: StoryDisplayComponent;
  let fixture: ComponentFixture<StoryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
    pending();
  });
});
