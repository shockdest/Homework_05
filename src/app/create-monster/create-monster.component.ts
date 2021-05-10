import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monsters/monster';


@Component({
  selector: 'app-create-monster',
  templateUrl: './create-monster.component.html',
  styleUrls: ['./create-monster.component.scss']
})
export class CreateMonsterComponent implements OnInit {

  @Input() monster?: Monster;
  constructor() { }

  ngOnInit(): void {
  }

}
