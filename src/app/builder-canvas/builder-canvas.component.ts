import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '../model/form-schema';
import { FormsModule } from '@angular/forms';
import { SchemaService } from '../services/schema.service';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-builder-canvas',
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './builder-canvas.component.html',
  styleUrls: ['./builder-canvas.component.scss']
})
export class BuilderCanvasComponent {
  schemaService = inject(SchemaService); 
  formTitle = signal('');
  fields = signal<FormField[]>([]);
  selectedFieldId = this.schemaService.selectedField;

  constructor() {
    // Effect to automatically sync the form title and fields whenever the schema changes
    effect(() => {
      const schema = this.schemaService.schema();
      this.formTitle.set(schema.title);
      this.fields.set(schema.fields);
    });
  }

  // To update form title
  updateTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.schemaService.updateTitle(input.value);
  }

  // To select a field
  selectField(fieldId: string): void {
    this.schemaService.selectField(fieldId);
  }

  // To delete a field
  deleteField(fieldId: string, event: Event): void {
    event.stopPropagation();
    this.schemaService.deleteField(fieldId);
  }

  // To check if a field is selected
  isSelected(fieldId: string): boolean {
    return this.selectedFieldId() === fieldId;
  }

  // To handle drag and drop of fields
  drop(event: CdkDragDrop<FormField[]>): void {
    if (event.previousContainer === event.container) {
      this.schemaService.moveField(event.previousIndex, event.currentIndex);
    } else {
      const fieldTemplate = event.item.data;
      this.schemaService.addField(fieldTemplate.type, event.currentIndex);
    }
  }
}