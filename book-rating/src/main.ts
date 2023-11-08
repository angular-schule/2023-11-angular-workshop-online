import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


///////////////////////////////

class Customer {
  /*private id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  constructor(private id: number) {}


  fooBar(arg: number): number {
    setTimeout(() => {
      console.log('Die ID ist:', this.id)
    }, 2000);

    return 5;
  }
}


const myCustomer = new Customer(4);
myCustomer.fooBar(5);



////////

const foo1 = function (arg: number) {
  return arg + 1;
}

const foo2 = (arg: number, arg2: string) => arg + 1;
