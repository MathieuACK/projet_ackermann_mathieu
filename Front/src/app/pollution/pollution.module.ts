import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionDetailComponent } from '../components/pollution-detail/pollution-detail.component';
import { PollutionListComponent } from '../components/pollution-list/pollution-list.component';
import { PollutionReportComponent } from '../components/pollution-report/pollution-report.component';
import { PollutionSummaryComponent } from '../components/pollution-summary/pollution-summary.component';
import { PollutionsService } from '../services/pollutions/pollutions.service';
import { PollutionRoutingModule } from './pollution-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PollutionDetailComponent,
    PollutionListComponent,
    PollutionReportComponent,
    PollutionSummaryComponent,
    PollutionRoutingModule,
  ],
  providers: [PollutionsService],
})
export class PollutionModule {}
