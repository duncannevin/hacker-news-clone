import { Component, OnInit } from '@angular/core';

import { Link } from '../../entities/link.entity';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  links: Link[] = [
    new Link('New', '/newstories'),
    new Link('Best', '/beststories'),
    new Link('Ask', '/askstories'),
    new Link('Jobs', '/jobstories')
  ]

  selected: Link = this.links[0]

  constructor() { }

  ngOnInit() {
  }

  updateSelected(link: Link) {
    this.selected = link;
  }
}
