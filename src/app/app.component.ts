import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'interceptor';

  constructor(public httpClient: HttpClient, public router: Router) {}

  sendGetRequest200() {
    this.httpClient.get('https://httpstat.us/200').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest204() {
    this.httpClient.get('https://httpstat.us/204').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest400() {
    this.httpClient.get('https://httpstat.us/400').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest401() {
    this.httpClient.get('https://httpstat.us/401').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest404() {
    this.httpClient.get('https://httpstat.us/404').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest500() {
    this.httpClient.get('https://httpstat.us/500').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest501() {
    this.httpClient.get('https://httpstat.us/501').subscribe((res) => {
      console.log(res);
    });
  }

  sendGetRequest504() {
    this.httpClient.get('https://httpstat.us/504').subscribe((res) => {
      console.log(res);
    });
  }
}
