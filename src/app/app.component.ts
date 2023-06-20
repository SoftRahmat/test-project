import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleInterface } from './article.interface';
import { ArticlesService } from './articles.service';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue = '';
  articles: ArticleInterface[] = [];
  searchForm = this.fb.group({
    searchValue: '',
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private articlesService: ArticlesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.testFn();
    // this.testArr();
    this.subscribeToObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getValueAfterDelay() {
    return new Observable((observer) => {
      const timer = setTimeout(() => {
        observer.next('Printed after 5 second');
        observer.complete();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    });
  }

  subscribeToObserver() {
    this.subscription = this.getValueAfterDelay().subscribe((res) => {
      console.log(res);
    });

    // setTimeout(() => {
    //   this.subscription.unsubscribe();
    // }, 8000);

    const number = (num: any) => {
      let isPrime = true;
      if (num === 1) {
        return `${num} is neither prime nor composit number.`;
      } else if (num > 1) {
        for (let i = 2; i < num; i++) {
          if (num % i == 0) {
            isPrime = false;
            break;
          }
        }

        if (isPrime) {
          return `${num} is a prime number.`;
        } else {
          return `${num} is not a prime number.`;
        }
      } else {
        return `The number is not a prime number.`;
      }
    };
    console.log('🚀 Result:', number(-1));
  }

  fetchData(): void {
    this.articlesService.getArticles(this.searchValue).subscribe((posts) => {
      this.articles = posts;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  testFn() {
    // Create a funtion which stores inside a secret word which cannot be changed or accessed from outside
    // const someFn = () => {
    //     const secret = 'My Secret';
    //     return () => secret;
    // }
    // const getSecret = someFn();
    // console.log(getSecret());
    // How can i clone an object in javascript
    // let obj = { a: 1, b: 2 };
    // let clone = {...obj}
    // // let clone = Object.assign({}, obj);
    // clone.foo = 'foo'
    // console.log(obj, clone);
    // Count vowels inside a string
    // const findVowels = str => {
    //     const vowels = ['a', 'e', 'i', 'o', 'u'];
    //     return str.toLowerCase().split('').reduce((acc, char) =>  vowels.includes(char) ? acc + 1 : acc, 0)
    // }
    // console.log(findVowels('ashseeixhuuu'))
    // Revers each word in sentence
    // const reverseStr = str => str.split(' ').reverse().join(' ')
    // const str = 'Hello world how is going everything'
    // console.log(reverseStr(str));
    // Define a function that takes an array of strings, and returns the most commonly occuring string in that array.
    //   const mostFrequent = (arr: any[]): any => {
    //     const mapping: { [key: number]: any } = arr.reduce((acc, el) => {
    //       acc[el] = acc[el] ? acc[el] + 1 : 1;
    //       return acc;
    //     }, {});
    //     return Object.entries(mapping).reduce(
    //       (acc, el) => (el[1] > acc[1]! ? el : acc),
    //       [null, 0]
    //     )[0];
    //   };
    //   console.log(mostFrequent(['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b']));
    //   const array = [1, 1, 45, 56, 67, 67, 46, 76];
    //   const sum = array.reduce((p, c) => {
    //     return p + c;
    //   }, 0);
    //   console.log('🚀 Sum:', sum);
    //   const peoples = [
    //     {
    //       name: 'Rahmat Ali',
    //       age: 50,
    //       isMale: true,
    //     },
    //     {
    //       name: 'Kaziul Ali',
    //       age: 26,
    //       isMale: false,
    //     },
    //     {
    //       name: 'Kebarat Ali',
    //       age: 51,
    //       isMale: true,
    //     },
    //   ];
    //   const users = peoples
    //     .sort((people1, people2) => (people1.age < people2.age ? -1 : 1))
    //     .filter((people) => people.isMale)
    //     .map((people) => people.name);
    //   console.log(users);
    //   const isUserExist = (name: any, arr: any) =>
    //     arr.some((user: any) => user.name === name);
    //   console.log('🚀isUserExist:', isUserExist('Rahmat Ali', peoples));
    //   const oldest = peoples.reduce((p, c) => {
    //     if (c.age > p) {
    //       return c.age;
    //     }
    //     return p;
    //   }, 0);
    //   const firstAndLastNameFirtChar = peoples.reduce((p, c, i, a) => {
    //     const split = c.name.split(' ');
    //     let part = `${split[0][0]}${split[1][0]}`;
    //     if (i === a.length - 1) {
    //       part += '.';
    //     } else {
    //       part += ', ';
    //     }
    //     return p + part;
    //   }, '');
    //   console.log('🚀Oldest:', oldest);
    //   console.log('🚀firstAndLastNameFirtChar:', firstAndLastNameFirtChar);
  }

  // testArr() {
  //   const fruits: any = ['Banana', 'Orange', 'Lemon', 'Apple', 'Wtermelon'];

  //   fruits.splice(4, 0, 'Dorian');

  //   console.log(fruits);
  // }
}
