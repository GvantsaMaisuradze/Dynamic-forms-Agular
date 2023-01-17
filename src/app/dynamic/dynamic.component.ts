import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  dynamicForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.dynamicForm = this.formBuilder.group({
      humans:this.formBuilder.array([])
    })
  } 

  getAllHumans():FormArray{
    return this.dynamicForm.get('humans') as FormArray;
  }

  createNewHuman():FormGroup{
    return this.formBuilder.group({
      image:"",
      fullName:"",
      email:"",
      phoneNumber:"",
      age:0,
      workPlace:"",
      gender:"",
      familyMembers:this.formBuilder.array([])
    })
  }

  getFamilyMembers(humanIndex:number):FormArray{
    return this.getAllHumans().at(humanIndex).get("familyMembers") as FormArray
  }

  createNewFamilyMember():FormGroup{
    return this.formBuilder.group({
      fullName:"",
      age:0,
      email:"",
      workPlace:"",
    })
  }

  ngOnInit(): void {
  }

  //------------------------ view Fuctios -----------------------

  addNewHuman():void{
    this.getAllHumans().push(this.createNewHuman())
  }

  deleteHuman(humanIndex:number):void{
    this.getAllHumans().removeAt(humanIndex) ;
  }

  addNewFamilyMember(humanIndex:number):void{
    this.getFamilyMembers(humanIndex).push(this.createNewFamilyMember())
  }

  deleteFamilyMember(humanIndex:number, familyMemberIndex:number):void{
    this.getFamilyMembers(humanIndex).removeAt(familyMemberIndex);
  }

  onFormSubmit(){
    console.log(this.dynamicForm);
    console.log(this.dynamicForm.value);
    this.dynamicForm.reset()

  }

}
