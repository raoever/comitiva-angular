import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comitiva-angular';

  constructor(private http : HttpClient) {}

//   ngOnInit() {
//         console.log('Chegou aqui...');
//         this.http
//           .get('https://comitiva-back.onrender.com/cadastro')
//           .subscribe((resultado) => console.log(resultado));
//       }

}
