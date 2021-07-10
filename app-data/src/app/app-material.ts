import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
      MatCardModule,
      MatGridListModule,
      MatDialogModule
    ]
})
export class AppMaterialModule { }
