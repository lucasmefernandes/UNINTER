import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Footer, Header, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
