import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarItemsComponent }   from './calendar-items/calendar-items.component';
import { CalendarItemComponent }   from './calendar-item/calendar-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: CalendarItemsComponent },
  { path: 'items/:id', component: CalendarItemComponent },
  { path: 'item_create', component: CalendarItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
