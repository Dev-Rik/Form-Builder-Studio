import { Component, computed, inject } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { FieldType, FormField } from '../model/form-schema';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.scss'
})
export class PropertiesPanelComponent {
  private schemaService = inject(SchemaService);

  // Computed the currently selected field by filtering the schema fields
  selectedField = computed(() => {
    const schema = this.schemaService.schema();
    const selectedId = this.schemaService.selectedField();
    if (!selectedId) return undefined;
    return schema.fields.find((f) => f.id === selectedId);
  });

  // Extracted all fields except the currently selected one to use in conditional field dropdowns (to avoid circular dependencies)
  otherFields = computed(() => {
    const allFields = this.schemaService.schema().fields;
    const selectedId = this.schemaService.selectedField();
    if (!selectedId) return allFields;
    return allFields.filter((f) => f.id !== selectedId);
  });

  // Determined if the selected field supports options (dropdown/radio)
  hasOptions(): boolean {
    const field = this.selectedField();
    return field?.type === FieldType.DROPDOWN || field?.type === FieldType.RADIO;
  }

  // To update field label
  updateLabel(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { label: input.value });
  }

  // To update checkbox label
  updateCheckboxLabel(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(this.selectedField()!.id, {
      checkboxLabel: input.value,
    });
  }

  // To update field placeholder
  updatePlaceholder(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { placeholder: input.value });
  }

  // To update field required status
  updateRequired(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const checkbox = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { required: checkbox.checked });
  }

  // To update field options for dropdown/radio types
  updateOption(index: number, event: Event): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const input = event.target as HTMLInputElement;
    const newOptions = [...field.options];
    newOptions[index] = input.value;
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  // To add a new option to dropdown/radio fields
  addOption(): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  // To remove an option from dropdown/radio fields
  removeOption(index: number): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const newOptions = field.options.filter((_, i) => i !== index);
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  // To update field validation rules
  updateValidation(key: string, event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    const validation = { ...field.validation, [key]: input.value };
    this.schemaService.updateField(field.id, { validation });
  }

  // To update conditional field settings
  updateConditionalField(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const select = event.target as HTMLSelectElement;
    const conditional = {
      ...field.conditional,
      field: select.value,
      show: !!select.value
    };
    this.schemaService.updateField(field.id, { conditional });
  }

  // To update conditional operator settings
  updateConditionalOperator(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const select = event.target as HTMLSelectElement;
    const conditional = {
      ...field.conditional,
      operator: select.value as any,
      show: !!field.conditional?.field
    };
    this.schemaService.updateField(field.id, { conditional });
  }

  // To update conditional value settings
  updateConditionalValue(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    const conditional = {
      ...field.conditional,
      value: input.value,
      show: !!field.conditional?.field
    };
    this.schemaService.updateField(field.id, { conditional });
  }
}
