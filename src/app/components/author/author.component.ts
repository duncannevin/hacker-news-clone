import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/entities/item.entity';
import { HackernewsService } from 'src/app/services/hackernews.service';

@Component({
  selector: 'app-user',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class UserComponent implements OnInit {
  author$: Observable<Item>

  constructor(
    private route: ActivatedRoute,
    private hackerNewsService: HackernewsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.author$ = this.getAuthor(params.id)
    })
  }

  getAuthor(id): Observable<Item> {
    return this.hackerNewsService.getAuthor(id)
  }
}
