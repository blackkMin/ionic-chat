import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {DataBase} from "../../providers/data-base";
import {DropdownQuestion} from "./question-dropdown";
import {TextboxQuestion} from "./question-textbox";
import {FormGroup} from "@angular/forms";
import {DynamicService} from "../../providers/dynamic.service";

@IonicPage()
@Component({
    templateUrl: './dynamic-form.html'
})

export class DynamicFormPage{
    data: DataBase<any>[] = [];
    form: FormGroup;

    constructor(private ds: DynamicService){
        this.data = this.getQuestions();
    }

    ngOnInit() {
        this.form = this.ds.toFormGroup(this.data);
    }

    getQuestions() {

        let questions: DataBase<any>[] = [

            new DropdownQuestion({
                key: 'brave',
                label: 'Bravery Rating',
                options: [
                    {key: 'solid',  value: 'Solid'},
                    {key: 'great',  value: 'Great'},
                    {key: 'good',   value: 'Good'},
                    {key: 'unproven', value: 'Unproven'}
                ],
                order: 3
            }),

            new TextboxQuestion({
                key: 'firstName',
                label: 'First name',
                value: 'Bombasto',
                required: true,
                order: 1
            }),

            new TextboxQuestion({
                key: 'emailAddress',
                label: 'Email',
                required: true,
                isMobile: true,
                type: 'email',
                order: 2
            })
        ];

        return questions.sort((a, b) => a.order - b.order);
    }
}