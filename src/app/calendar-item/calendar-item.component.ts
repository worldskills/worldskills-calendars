import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CalendarItemService } from '../calendar-item.service';
import { CalendarItem } from '../calendar-item';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent implements OnInit {

  @Input() item: CalendarItem;

  title: string;

  countries: Country[] = [];

  submitted = false;

  loading = false;

  tempStartDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendarItemService: CalendarItemService,
    private countryService: CountryService,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.calendarItemService.getItem(id)
        .subscribe(item => {
          this.loading = false;
          this.tempStartDate = new Date(item.start_date);
          this.item = item;
          this.title = item.name.text;
        }, error => {
          this.loading = false;
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            window.alert('Server error: ' + JSON.stringify(error.error));
          }
        });
    } else {
      this.item = { id: 0, calendar_id: 1, name: { text: '', lang_code: 'en' }, location: { text: '', lang_code: 'en' }, description: { text: '', lang_code: 'en' }, start_date: '', end_date: '', status: 'scheduled' } as CalendarItem;
    }
    this.countryService.getList()
      .subscribe(list => {
        this.countries = list.countries;
      });
  }

  compareCountry(c1: Country, c2: Country): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit(form: any) {
    this.submitted = true;
    if (form.form.valid) {
      this.loading = true;
      if (this.item.id) {
        this.calendarItemService.updateItem(this.item)
          .subscribe(item => {
            this.router.navigate(['/items']);
          }, error => {
            this.loading = false;
            if (error.error instanceof ErrorEvent) {
              console.error('An error occurred:', error.error.message);
            } else {
              window.alert('Server error: ' + JSON.stringify(error.error));
            }
          });
      } else {
        this.calendarItemService.addItem(this.item)
          .subscribe(item => {
            this.router.navigate(['/items']);
          }, error => {
            this.loading = false;
            if (error.error instanceof ErrorEvent) {
              console.error('An error occurred:', error.error.message);
            } else {
              window.alert('Server error: ' + JSON.stringify(error.error));
            }
          });
      }
    }
  }

  onStartDateChange(newStartDate: string) {
    var parsedStartDate = new Date(newStartDate);
    if (parsedStartDate instanceof Date && !isNaN(parsedStartDate.getTime())) {
      var diff = parsedStartDate.getTime() - this.tempStartDate.getTime();
      this.tempStartDate = parsedStartDate;
      var parsedEndDate = new Date(this.item.end_date);
      if (parsedEndDate instanceof Date && !isNaN(parsedEndDate.getTime())) {
        var newEndDate = new Date(parsedEndDate.getTime() + diff);
        this.item.end_date = newEndDate.toISOString().slice(0, 10);
      }
    }
  }

  onUrlChange() {
    if (this.item.url != '') {
        if (!/^http/i.test(this.item.url)) {
            this.item.url = 'http://' + this.item.url;
        }
    }
  }

  clone() {
    if (window.confirm('Duplicating the Date will create a copy. Click OK to proceed.')) {
      this.calendarItemService.cloneItem(this.item.id)
        .subscribe(item => {
          window.alert('The Date has been duplicated successfully. Please edit the information of the duplicate below.');
          this.router.navigate(['/items', item.id]);
        }, error => {
          this.loading = false;
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            window.alert('Server error: ' + JSON.stringify(error.error));
          }
        });
    }
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this Date? Click OK to proceed.')) {
      this.calendarItemService.deleteItem(this.item.id)
        .subscribe(() => {
          window.alert('Item deleted.');
          this.router.navigate(['/items']);
        }, error => {
          this.loading = false;
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            window.alert('Server error: ' + JSON.stringify(error.error));
          }
        });
    }
  }

}
