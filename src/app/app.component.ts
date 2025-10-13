import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FieldPaletteComponent } from './field-palette/field-palette.component';
import { BuilderCanvasComponent } from './builder-canvas/builder-canvas.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';

@Component({
  selector: 'app-root',
    imports: [
    RouterOutlet,
    MatToolbarModule,
    FieldPaletteComponent,
    BuilderCanvasComponent,
    PropertiesPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-builder-studio';
}
