import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { PollutionSummaryComponent } from '../pollution-summary/pollution-summary.component';
import { Pollution } from '../../models/pollutions';
import { PollutionsService } from '../../services/pollutions/pollutions.service';

function noFutureDateValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const input = new Date(control.value);
  input.setHours(0, 0, 0, 0);
  return input > today ? { futureDate: true } : null;
}

@Component({
  selector: 'app-pollution-report',
  imports: [ReactiveFormsModule, CommonModule, PollutionSummaryComponent],
  templateUrl: './pollution-report.component.html',
  styleUrls: ['./pollution-report.component.css'],
})
export class PollutionReportComponent implements OnInit {
  pollutionFormValid: boolean = false;
  pollutionFormValues: Pollution | null = null;
  submitted = false;
  nextId: number = 1;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private pollutionsService: PollutionsService) {}

  ngOnInit(): void {
    this.pollutionsService.getPollutions().subscribe((pollutions) => {
      if (pollutions && pollutions.length > 0) {
        const maxId = Math.max(...pollutions.map((p) => p.id));
        this.nextId = maxId + 1;
      }
    });
  }

  pollutionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    pollutionType: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    observationDate: new FormControl('', [
      Validators.required,
      noFutureDateValidator,
    ]),
    location: new FormControl('', Validators.required),
    latitude: new FormControl(null, [
      Validators.required,
      Validators.min(-90),
      Validators.max(90),
    ]),
    longitude: new FormControl(null, [
      Validators.required,
      Validators.min(-180),
      Validators.max(180),
    ]),
    photographUrl: new FormControl(''),
    discovererName: new FormControl('', Validators.required),
    discovererEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 5MB");
        return;
      }

      this.selectedFile = file;

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.pollutionForm.invalid) {
      this.pollutionForm.markAllAsTouched();
      return;
    }

    const rawFromValue = this.pollutionForm.value as any;
    this.pollutionFormValues = {
      id: this.nextId,
      title: rawFromValue.title,
      pollutionType: rawFromValue.pollutionType,
      description: rawFromValue.description,
      observationDate: rawFromValue.observationDate,
      location: rawFromValue.location,
      latitude: Number(rawFromValue.latitude),
      longitude: Number(rawFromValue.longitude),
      photographUrl: rawFromValue.photographUrl || null,
      photographData: this.imagePreview || null,
      discovererName: rawFromValue.discovererName,
      discovererEmail: rawFromValue.discovererEmail,
    };
    this.pollutionFormValid = true;
    this.pollutionsService
      .addPollution(this.pollutionFormValues as Pollution)
      .subscribe({
        next: (data) => {
          this.pollutionFormValid = true;
          this.pollutionForm.reset();
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de la pollution:", error);
        },
      });
    this.nextId++;
  }

  resetForm() {
    this.pollutionForm.reset();
    this.pollutionForm.markAsPristine();
    this.pollutionForm.markAsUntouched();
    this.pollutionFormValid = false;
    this.pollutionFormValues = null;
    this.submitted = false;
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
