import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  @Input() subtitle!: string;

  @Input() dataToLoad!: any;

  @Output() onSubmit = new EventEmitter<any>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    if(this.dataToLoad) {
      this.form.setValue(this.dataToLoad);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      title: [null , [Validators.required]],
      body: [null, [Validators.required]],
      userId: [1, []]
    });
  }

  sendData(): void {
    const data = this.form.getRawValue();
    this.onSubmit.next(data);
  }

}
