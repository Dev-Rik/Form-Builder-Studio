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

  selectedField = computed(() => {
    const schema = this.schemaService.schema();
    const selectedId = this.schemaService.selectedField();
    if (!selectedId) return undefined;
    return schema.fields.find((f) => f.id === selectedId);
  });

  otherFields = computed(() => {
    const allFields = this.schemaService.schema().fields;
    const selectedId = this.schemaService.selectedField();
    if (!selectedId) return allFields;
    return allFields.filter((f) => f.id !== selectedId);
  });

  hasOptions(): boolean {
    const field = this.selectedField();
    return field?.type === FieldType.DROPDOWN || field?.type === FieldType.RADIO;
  }

  updateLabel(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { label: input.value });
  }

  updateCheckboxLabel(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(this.selectedField()!.id, {
      checkboxLabel: input.value,
    });
  }

  updatePlaceholder(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { placeholder: input.value });
  }

  updateRequired(event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const checkbox = event.target as HTMLInputElement;
    this.schemaService.updateField(field.id, { required: checkbox.checked });
  }

  updateOption(index: number, event: Event): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const input = event.target as HTMLInputElement;
    const newOptions = [...field.options];
    newOptions[index] = input.value;
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  addOption(): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  removeOption(index: number): void {
    const field = this.selectedField();
    if (!field || !field.options) return;
    const newOptions = field.options.filter((_, i) => i !== index);
    this.schemaService.updateField(field.id, { options: newOptions });
  }

  updateValidation(key: string, event: Event): void {
    const field = this.selectedField();
    if (!field) return;
    const input = event.target as HTMLInputElement;
    const validation = { ...field.validation, [key]: input.value };
    this.schemaService.updateField(field.id, { validation });
  }

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
