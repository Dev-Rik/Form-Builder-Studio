import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaService } from '../services/schema.service';
import { FieldType, FieldTemplate } from '../model/form-schema';

@Component({
  selector: 'app-field-palette',
  imports: [CommonModule],
  templateUrl: './field-palette.component.html',
  styleUrl: './field-palette.component.scss'
})
export class FieldPaletteComponent {
  //field palette templates
  fieldTemplates: FieldTemplate[] = [
    { type: FieldType.TEXT, icon: 'T', label: 'Text Input' },
    { type: FieldType.EMAIL, icon: '✉', label: 'Email' },
    { type: FieldType.NUMBER, icon: '123', label: 'Number' },
    { type: FieldType.DATE, icon: '📅', label: 'Date' },
    { type: FieldType.DROPDOWN, icon: '▼', label: 'Dropdown' },
    { type: FieldType.CHECKBOX, icon: '☑', label: 'Checkbox' },
    { type: FieldType.RADIO, icon: '◉', label: 'Radio Button' },
    { type: FieldType.TEXTAREA, icon: '📝', label: 'Textarea' },
    { type: FieldType.FILE, icon: '📁', label: 'File Upload' }
  ];

  //injecting schema service
  schemaService = inject(SchemaService);

  //method to add field to schema
  addField(type: FieldType): void {
    this.schemaService.addField(type);
  }
}
