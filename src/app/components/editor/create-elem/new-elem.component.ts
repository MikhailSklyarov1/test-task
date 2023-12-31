import {Component} from "@angular/core";
import {TaskService} from "../../../services/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'new-elem',
  templateUrl: './new-elem.component.html',
  styleUrls: ['./new-elem.component.css'],
})
export class NewElemComponent {
  constructor(protected taskService: TaskService) {}

  currentdate = new Date();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(200),
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
    ]),
    dateCompletion: new FormControl('', Validators.required),
    timeCompletion: new FormControl('', Validators.required),
    dateCreation: new FormControl(this.currentdate, Validators.required),
    timeCreation: new FormControl(
      (this.currentdate.getHours().toString().length > 1 ? '' : '0')+
            this.currentdate.getHours().toString() +
            (this.currentdate.getMinutes().toString().length > 1 ? ':' : ':0') +
            this.currentdate.getMinutes().toString(), Validators.required),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  get dateCompletion() {
    return this.form.controls.dateCompletion as FormControl;
  }

  get timeCompletion() {
    return this.form.controls.timeCompletion as FormControl;
  }

  get dateCreation() {
    return this.form.controls.dateCreation as FormControl;
  }

  get timeCreation() {
    return this.form.controls.timeCreation as FormControl;
  }
  
  submit() {
    let deadlineDateTime: Date = new Date(
      new Date(this.dateCompletion.value).setHours(
        this.timeCompletion.value.split(':')[0],
        this.timeCompletion.value.split(':')[1]
      )
    );

    let creationDateTime: Date = new Date(
      new Date(this.dateCreation.value).setHours(
        this.timeCreation.value.split(':')[0],
        this.timeCreation.value.split(':')[1]
      )
    );

    this.taskService.create({
      id: Math.random(),
      title: this.title.value,
      text: this.description.value,
      created: creationDateTime,
      deadline: deadlineDateTime,
    });
  }
}
