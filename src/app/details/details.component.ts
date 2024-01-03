import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ElementInterface } from '../elementInterface';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  elementService = inject(ElementService);
  moskisElement: ElementInterface | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    // const elementId = Number(this.route.snapshot.params['id']);
    // this.moskisElement = this.elementService.getElementById(elementId);

      const elementId = parseInt(this.route.snapshot.params['id'], 10);
      this.elementService.getElementById(elementId).then(receivedElement => {
        this.moskisElement = receivedElement;
      });
  }

  submitApplication() {
    this.elementService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}