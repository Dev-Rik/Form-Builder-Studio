import { Injectable, signal } from '@angular/core';
import { FormSchema, FormField, FieldType } from '../model/form-schema';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private formSchema = signal<FormSchema>({
    title: 'User Registration',
    fields: [
      {
        id: 'field1',
        type: FieldType.TEXT,
        label: 'Full Name',
        placeholder: 'Enter your name',
        required: true,
        validation: {},
        conditional: { show: false }
      },
      {
        id: 'field2',
        type: FieldType.EMAIL,
        label: 'Email',
        placeholder: '',
        required: false,
        validation: {},
        conditional: { show: false }
      },
      {
        id: 'field3',
        type: FieldType.DROPDOWN,
        label: 'Country',
        placeholder: 'Select a country',
        required: false,
        options: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'Brazil', 'South Africa', 'New Zealand', 'Italy', 'Spain', 'Mexico', 'Russia', 'Netherlands', 'Sweden', 'Switzerland', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'Ireland', 'Portugal', 'Greece', 'Turkey', 'Poland', 'Czech Republic'],
        validation: {},
        conditional: { show: false }
      },
      {
        id: 'field4',
        type: FieldType.CHECKBOX,
        label: 'I agree to the terms and conditions',
        required: false,
        validation: {},
        conditional: { show: false }
      }
    ]
  });

  private selectedFieldId = signal<string | null>(null);

  // Public signals
  readonly schema = this.formSchema.asReadonly();
  readonly selectedField = this.selectedFieldId.asReadonly();

  // To get form title
  getTitle(): string {
    return this.formSchema().title;
  }

  // To update form title
  updateTitle(title: string): void {
    this.formSchema.update(schema => ({ ...schema, title }));
  }

  // To get all fields
  getFields(): FormField[] {
    return this.formSchema().fields;
  }

  // To get selected field
  getSelectedField(): FormField | null {
    const fieldId = this.selectedFieldId();
    if (!fieldId) return null;
    return this.formSchema().fields.find(f => f.id === fieldId) || null;
  }

  // To select a field
  selectField(fieldId: string | null): void {
    this.selectedFieldId.set(fieldId);
  }

  // To add a new field
  addField(type: FieldType, index?: number): void {
    const newField: FormField = {
      id: `field${Date.now()}`,
      type,
      label: `New ${type} Field`,
      placeholder: '',
      required: false,
      validation: {},
      conditional: { show: false },
      ...(type === FieldType.DROPDOWN || type === FieldType.RADIO 
        ? { options: ['Option 1', 'Option 2'] } 
        : {})
    };

    this.formSchema.update(schema => {
      const fields = [...schema.fields];
      if (index !== undefined) {
        fields.splice(index, 0, newField);
      } else {
        fields.push(newField);
      }
      return { ...schema, fields };
    });

    this.selectField(newField.id);
  }

  // To update a field
  updateField(fieldId: string, updates: Partial<FormField>): void {
    this.formSchema.update(schema => ({
      ...schema,
      fields: schema.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  }

  // To delete a field
  deleteField(fieldId: string): void {
    this.formSchema.update(schema => ({
      ...schema,
      fields: schema.fields.filter(f => f.id !== fieldId)
    }));
    
    if (this.selectedFieldId() === fieldId) {
      this.selectField(null);
    }
  }

  // To move a field
  moveField(fromIndex: number, toIndex: number): void {
    this.formSchema.update(schema => {
      const fields = [...schema.fields];
      const [movedField] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, movedField);
      return { ...schema, fields };
    });
  }

  // To export schema
  exportSchema(): string {
    return JSON.stringify(this.formSchema(), null, 2);
  }

  // To import schema
  importSchema(schemaJson: string): void {
    try {
      const schema = JSON.parse(schemaJson);
      this.formSchema.set(schema);
      this.selectField(null);
    } catch (error) {
      console.error('Invalid schema JSON', error);
      throw new Error('Invalid schema JSON');
    }
  }
}