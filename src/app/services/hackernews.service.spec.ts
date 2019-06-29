import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HackernewsService } from './hackernews.service';
import { topStories } from '../entities/storyparams.entity';
import { HttpErrorResponse } from '@angular/common/http';

describe('HackernewsService', () => {
  let hackernewsService: HackernewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HackernewsService
      ]
    })

    hackernewsService = TestBed.get(HackernewsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: HackernewsService = TestBed.get(HackernewsService);
    expect(service).toBeTruthy();
  });

  it('should be able to fetch story id\'s', () => {
    hackernewsService.getIds(topStories)
      .subscribe(items => {
        expect(items).toBeTruthy();
        expect(items.length).toBe(4, 'Incorrect number of ids');
        expect(items[0].id).toBe(1234);
      });

    const req = httpTestingController.expectOne(`${hackernewsService.hnLocation}/${topStories}.json`)
    expect(req.request.method).toEqual('GET');
    req.flush([1234, 5678, 9102, 12345])
  });

  it('should return [] with 404 response', () => {
    const badParam = 'notavalidparam'
    hackernewsService.getIds(badParam)
      .subscribe(ids => {
          expect(ids.length).toBe(0);
        },
        (err: HttpErrorResponse) => {
          fail('Should respond with an empty array')
        }
      );

    const req = httpTestingController.expectOne(`${hackernewsService.hnLocation}/${badParam}.json`);
    expect(req.request.method).toEqual('GET');
    req.flush('Bad param used to call api', { status: 404, statusText: 'Bad request' })
  });

  it('should fetch an item by id', () => {
    const item = {
      id: 1234
    }
    hackernewsService.getItem(item.id)
      .subscribe(rItem => {
        expect(rItem).toBeTruthy();
        expect(rItem.id).toBe(item.id);
      })

    const req = httpTestingController.expectOne(`${hackernewsService.hnLocation}/item/${item.id}.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(item);
  });

  it('should respond null when asking for non-existant item', () => {
    const item = {
      id: 1234
    }
    hackernewsService.getItem(item.id)
      .subscribe(rItem => {
        expect(rItem).toBeNull();
      })
      
    const req = httpTestingController.expectOne(`${hackernewsService.hnLocation}/item/${item.id}.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(null);
  });
});
