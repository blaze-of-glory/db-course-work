import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../core/api.service";
import {AboutUs} from "../../../../shared/interfaces/about-us";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
  aboutUs!: AboutUs;

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.apiService.getAboutUs().subscribe(aboutUs => {
      this.aboutUs = aboutUs;
    })
  }
}
