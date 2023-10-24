import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'frontend';
  //title!: string;
  //object!: [];

  http = inject(HttpClient);

  /*changeTitle1(name: string) {
    this.title = name;
  }*/

  /*changeTitle2() {
    const nombreElement = document.querySelector(".nombre") as HTMLInputElement;
    if (nombreElement) {
      console.log(nombreElement.value)
      this.title = nombreElement.value;
    } else {
      console.error('Element with class "nombre" not found');
    }
  }*/

  /*onInit() {
    this.http.get("http://127.0.0.1:8000/")
      .subscribe((data) => {
        this.object = data
      });
  }*/
}
