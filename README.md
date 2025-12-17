# 🧩 Form Builder Studio

### 🏗️ A No-Code Form Builder built with Angular

**Form Builder Studio** is a dynamic **no-code web application** that lets anyone create fully functional, validated forms by simply **clicking to add fields** — no coding required.

Built with **Angular 19**, **Material Design**, and **Reactive Forms** with **Signals**, it allows users to visually design forms, set validation rules, preview them live, and export or share them as JSON templates.

---

## 🚀 Live Demo
> 🔗 https://dev-rik.github.io/Form-Builder-Studio/

---

## 📸 Preview
<img width="1470" height="801" alt="Screenshot 2025-12-17 at 9 23 07 PM" src="https://github.com/user-attachments/assets/f7f497de-d32d-47ee-8a30-9ac3f4c1488e" />


---

## ✨ Features

### 🎨 **Visual Form Building**
- **Click-to-Add Fields** - Simply click on any field type in the palette to add it to your form
- **Reorder Fields** - Drag and drop fields within the canvas to rearrange them
- **Delete Fields** - Remove unwanted fields with a single click
- **Select & Edit** - Click any field to edit its properties in real-time

### 🔧 **Powerful Field Customization**
- **9 Field Types Available:**
  - Text Input
  - Email
  - Number
  - Date
  - Dropdown
  - Checkbox
  - Radio Button
  - Textarea
  - File Upload

### ⚙️ **Advanced Configuration**
- **Field Properties**
  - Custom labels and placeholders
  - Required field validation
  - Min/Max length constraints
  - Regex pattern validation
  - Custom options for dropdowns and radio buttons

### 🎯 **Conditional Logic**
- **Show/Hide Fields Dynamically**
  - Display fields based on other field values
  - Multiple operators: equals, not equals, contains
  - Perfect for creating smart, adaptive forms

### 📋 **Three View Modes**
1. **Builder Mode** - Full editing interface with palette, canvas, and properties panel
2. **Preview Mode** - See your form in action with working validation
3. **JSON Mode** - View and copy the generated schema

### 💾 **Import/Export**
- **Export Schemas** - Save your form design as a JSON file
- **Import Schemas** - Load previously saved forms to continue editing

### ✅ **Smart Validation**
- Real-time validation feedback
- Multiple validation rules per field
- Custom error messages
- Required field enforcement
- Email format validation
- Checkbox required validation (must be checked)

---

## 🧠 Project Overview

**Form Builder Studio** aims to simplify form creation for everyone — developers, HR teams, teachers, or businesses — without needing to write a single line of code.

Think of it like a mini version of **Google Forms** or **Typeform**, but built in **Angular 19** with complete flexibility and open-source freedom.

---

## 🛠️ Tech Stack

| Category | Tools / Frameworks |
|:----------|:-------------------|
| **Frontend** | Angular 19, Angular Material, Angular CDK |
| **Forms & State** | Reactive Forms, Signals |
| **Styling** | SCSS, Flex/Grid Layout |
| **Storage** | LocalStorage (for schema persistence) |
| **Deployment** | GitHub Pages |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── field-palette/           # Field type selector
│   │   │   ├── field-palette.component.ts
│   │   │   ├── field-palette.component.html
│   │   │   └── field-palette.component.scss
│   │   ├── builder-canvas/          # Main form builder area
│   │   │   ├── builder-canvas.component.ts
│   │   │   ├── builder-canvas.component.html
│   │   │   └── builder-canvas.component.scss
│   │   ├── properties-panel/        # Field properties editor
│   │   │   ├── properties-panel.component.ts
│   │   │   ├── properties-panel.component.html
│   │   │   └── properties-panel.component.scss
│   │   └── form-renderer/           # Live form preview
│   │       ├── form-renderer.component.ts
│   │       ├── form-renderer.component.html
│   │       └── form-renderer.component.scss
│   ├── services/
│   │   └── schema.service.ts        # Form state management with Signals
│   ├── model/
│   │   └── form-schema.ts           # TypeScript interfaces
│   ├── app.component.ts             # Main app component
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.config.ts                # App configuration
├── main.ts                          # Bootstrap file
└── styles.scss                      # Global styles
```

---

## 📖 How to Use

### Creating a Form

1. **Add Fields**
   - Click on any field type in the **Field Palette** (left panel)
   - The field will be added to your form canvas

2. **Configure Fields**
   - Click on a field in the canvas to select it
   - Edit properties in the **Properties Panel** (right panel):
     - Change label and placeholder text
     - Toggle required validation
     - Add validation rules (min/max length, regex)
     - Configure options for dropdowns/radio buttons
     - Set up conditional visibility

3. **Arrange Fields**
   - Drag fields within the canvas to reorder them
   - Delete unwanted fields using the × button

4. **Preview Your Form**
   - Click the **Preview** button in the header
   - Test the form with real validation
   - Try submitting to see validation in action

5. **Export Your Form**
   - Click **JSON** to view the schema
   - Click **Export** to download as JSON file
   - Share the JSON with others or save for later

### Importing a Form

1. Click the **Import** button in the header
2. Select a previously exported JSON file
3. The form will be loaded into the builder
4. Continue editing or preview the imported form

---
