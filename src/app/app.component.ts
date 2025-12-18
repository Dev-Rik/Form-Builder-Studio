import { Component, inject, signal } from '@angular/core';
import { FieldPaletteComponent } from './field-palette/field-palette.component';
import { BuilderCanvasComponent } from './builder-canvas/builder-canvas.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';
import { SchemaService } from './services/schema.service';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormSchema } from './model/form-schema';

type ViewMode = 'builder' | 'preview' | 'json';

@Component({
  selector: 'app-root',
  imports: [
    FieldPaletteComponent,
    BuilderCanvasComponent,
    PropertiesPanelComponent,
    FormRendererComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private schemaService = inject(SchemaService);
  currentView = signal<ViewMode>('builder');

  // Computed JSON representation of the current schema
  schemaJson = signal(
    JSON.stringify(this.schemaService.schema(), null, 2)
  );

  copyButtonText = signal('📋 Copy');

  // To copy the schema JSON to clipboard
  copyJson(): void {
    navigator.clipboard.writeText(this.schemaJson()).then(() => {
      this.copyButtonText.set('✅ Copied!');
      setTimeout(() => this.copyButtonText.set('📋 Copy'), 2000);
    });
  }

  // To switch between different views (builder, preview, json)
  setView(view: ViewMode): void {
    this.currentView.set(view);
    if (view === 'json') {
      this.updateSchemaJson();
    }
  }

  // To update the schema JSON signal
  updateSchemaJson(): void {
    this.schemaJson.set(this.schemaService.exportSchema());
  }

  // To export the current schema as a JSON file
  exportSchema(): void {
    const schema = this.schemaService.exportSchema();
    const blob = new Blob([schema], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // To import a schema from a JSON file
  importSchema(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          this.schemaService.importSchema(content);
          alert('Schema imported successfully!');
        } catch (error) {
          alert('Error importing schema. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  }
}
