import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemaService } from '../services/schema.service';
import { FormField, FieldType } from '../model/form-schema';
import { F } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-renderer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-renderer.component.html',
  styleUrl: './form-renderer.component.scss'
})
export class FormRendererComponent {
  formTitle = computed(() => this.schemaService.schema().title);
  fields = computed(() => this.schemaService.schema().fields);
  formGroup: FormGroup;

  visibleFields = computed(() => {
    return this.fields().filter(field => this.shouldShowField(field));
  });

  constructor(
    private schemaService: SchemaService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.createFormGroup();
    
    // Recreate form when schema signal changes using an Angular effect
    effect(() => {
      this.schemaService.schema();
      this.formGroup = this.createFormGroup();
    });
  }

  private createFormGroup(): FormGroup {
    const group: any = {};

    this.fields().forEach(field => {
      const validators = [];

      if (field.required) {
        if (field.type === FieldType.CHECKBOX) {
          validators.push(Validators.requiredTrue);
        } else {
          validators.push(Validators.required);
        }
      }

      if (field.validation?.minLength) {
        validators.push(Validators.minLength(+field.validation.minLength));
      }

      if (field.validation?.maxLength) {
        validators.push(Validators.maxLength(+field.validation.maxLength));
      }

      if (field.validation?.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }

      if (field.type === FieldType.EMAIL) {
        validators.push(Validators.email);
      }

      if (field.validation?.min !== undefined) {
        validators.push(Validators.min(field.validation.min));
      }

      if (field.validation?.max !== undefined) {
        validators.push(Validators.max(field.validation.max));
      }

      group[field.id] = [field.type === FieldType.CHECKBOX ? false : '', validators];
    });

    return this.fb.group(group);
  }

  private shouldShowField(field: FormField): boolean {
    if (!field.conditional?.show || !field.conditional.field) {
      return true;
    }

    const dependentFieldValue = this.formGroup.get(field.conditional.field)?.value;
    const targetValue = field.conditional.value;

    switch (field.conditional.operator) {
      case 'equals':
        return dependentFieldValue === targetValue;
      case 'notEquals':
        return dependentFieldValue !== targetValue;
      case 'contains':
        return String(dependentFieldValue).includes(targetValue || '');
      default:
        return true;
    }
  }

  isInvalid(fieldId: string): boolean {
    const control = this.formGroup.get(fieldId);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onFileChange(event: Event, fieldId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formGroup.patchValue({ [fieldId]: input.files[0].name });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
      alert('Form submitted successfully!\n\n' + JSON.stringify(this.formGroup.value, null, 2));
      this.formGroup.reset();
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        control?.markAsTouched();
        control?.markAsDirty();
      });
    }
  }
}
