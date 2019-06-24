import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CalendarItemService } from '../calendar-item.service';
import { CalendarItemList } from '../calendar-item-list';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-calendar-items',
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss']
})
export class CalendarItemsComponent implements OnInit {

  items: CalendarItemList = { items: [], total_count: 0 };

  countries: Country[] = [];

  filterName: string;
  filterCountry: number;

  page = 1;
  pageSize = 10;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendarItemService: CalendarItemService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.filterName = params.get('name');
        this.filterCountry = parseInt(params.get('country'), 10);
      });
    this.loadItems();
    this.countryService.getList()
      .subscribe(list => {
        this.countries = list.countries;
      });
  }

  loadItems() {
    this.loading = true;
    this.items.items = [];
    this.calendarItemService.getItems(this.filterName, this.filterCountry, (this.page - 1) * this.pageSize, this.pageSize)
      .subscribe(items => {
        this.items = items;
        this.loading = false;
      }, error => {
        this.loading = false;
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else if (error.status > 0) {
          window.alert('Server error: ' + JSON.stringify(error.error));
        } else {
          console.error('An error occurred:', error.error);
        }
      });
  }

  refresh() {
    this.router.navigate(['/items'], { queryParams: { name: this.filterName, country: this.filterCountry } });
    this.loadItems();
  }

  onSubmit() {
    this.refresh();
  }

  clear() {
    this.filterName = null;
    this.filterCountry = null;

    this.refresh();
  }

}
