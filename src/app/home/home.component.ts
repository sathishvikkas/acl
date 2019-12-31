import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roleForm: FormGroup;
  private submitted = false;
  // tslint:disable-next-line:max-line-length
  private rolePermissions: any = [{ id: 1, name: 'Admin Management', children: [] }, { id: 5, name: 'Customer Management', children: [] }, { id: 9, name: 'Roles Management', children: [] }];

  constructor(private fb: FormBuilder) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.rolePermissions.length; i++) {
      const j: number = this.rolePermissions[i].id + 1;
      this.rolePermissions[i].children.push({ id: j, name: 'Add' }, { id: j + 1, name: 'Edit' }, { id: j + 2, name: 'Delete' });
    }
    console.log(this.rolePermissions);
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      rights: this.fb.array([], minSelectedCheckboxes(1))
    });
  }

  ngOnInit() {
  }

  onChange(id: number, isChecked: boolean) {
    const rightsArray = this.roleForm.controls.rights as FormArray;

    if (isChecked) {
      rightsArray.push(new FormControl(id));
    } else {
      const index = rightsArray.controls.findIndex(x => x.value === id);
      rightsArray.removeAt(index);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.roleForm.value, null, 4));
    // console.warn(this.roleForm.value);
  }

  get formControls() {
    return this.roleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.roleForm.reset();
  }

}

function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }


