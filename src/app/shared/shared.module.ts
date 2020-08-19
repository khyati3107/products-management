import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components';
import { FilterPipe } from './pipes';

@NgModule({
  declarations: [ConfirmModalComponent, FilterPipe],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalComponent,
    NgbModule,
    FilterPipe
  ],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule { }
