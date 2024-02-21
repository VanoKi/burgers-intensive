import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currency = "$"

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }
  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: 'smooth'})
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe(
          {
            next: (responce: any) => {
              alert(responce.message);
              this.form.reset();
            },
            error: (responce) => {
              alert(responce.error.message)
            },
          }
        )
      }
    }

  changeCurrency() {
    let newCurrency = '$';
    let coefficient = 1;
    if (this.currency === '$') {
      newCurrency = '₽';
      coefficient = 80;
    } else if (this.currency === '₽') {
      newCurrency = 'BYN';
      coefficient = 3;
    } else if (this.currency === 'BYN') {
      newCurrency = '€';
      coefficient = 0.9;
    } else if (this.currency === '€') {
      newCurrency = '¥';
      coefficient = 7;
    }

    this.currency = newCurrency;
    this.productsData.forEach((item: any) => {
      item.price = +(item.baseprice * coefficient).toFixed(1);
    })
  }

}

