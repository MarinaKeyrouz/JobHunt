import { Component } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent {
  job: any = {
    company: 'Your Company Name',
    date: this.getTodayDate()
  };

  submitJobForm() {
    // Handle form submission
    console.log(this.job);
    // TODO: Send job data to backend or perform other actions
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}
