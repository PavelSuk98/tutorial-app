import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnChanges, DoCheck {

  constructor(private http: HttpClient) {

  }

  title = 'tutorial-app';

  today = new Date();

  dataFromComponent: any | null = null;

  dataFromServer$!: Observable<Post[]>;

  dataToLoad = null;

  ngOnInit() {
    setInterval(() => {
      this.today = new Date();
    }, 1000);
    this.prepareTableForUI();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngDoCheck(): void {
   // console.log('Změna');
  }

  changeTitle(event: any): void{
    this.title = 'Moje úžasná aplikace';
  }

  sendDataToServer(data: any): void {
    this.postDataToServer(data).subscribe(post => {
      this.dataFromComponent = JSON.stringify(post);
      this.prepareTableForUI();
    });
  }

  prepareTableForUI(): void {
    this.dataFromServer$ = this.getDataFromServer();
  }

  postDataToServer(data: any): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.post<Post>(url, data);
  }

  getDataFromServer(): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Post[]>(url);
  }
}

export interface Post {

  readonly userId: number;

  readonly id: number;

  readonly title: string;

  readonly body: string;
}
