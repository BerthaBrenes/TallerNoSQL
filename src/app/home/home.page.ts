import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Interface for the format of the student in the database
 */
interface StudentData {
  Name: string;
  Age: number;
  Address: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /**
   * The initial lis of the student
   */
  studentList = [];
  /**
   * Student Data
   */
  studentData: StudentData;
  /**
   * Formyl for the student data
   */
  studentForm: FormGroup;
  /**
   * First method in the page
   * @param firebaseService Controller for the Service
   * @param fb Controller for the form builder
   */
  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.studentData = {} as StudentData;
  }
  /**
   * Called after first initialization
   * Set the validation for the inputs
   */
  ngOnInit() {
    this.studentForm = this.fb.group({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]]
    });
    /**
     * First call at the database for look for data
     */
    this.firebaseService.read_students().subscribe(data => {

      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      });
      console.log(this.studentList);
    });
  }
  /**
   * Call the service for create data
   */
  CreateRecord() {
    console.log(this.studentForm.value);
    this.firebaseService.create_student(this.studentForm.value).then(resp => {
      this.studentForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }
  /**
   * Call the service for delete the student
   * @param rowID id of the studente
   */
  RemoveRecord(rowID) {
    this.firebaseService.delete_student(rowID);
  }
  /**
   * Edit the data existing
   * @param record Data
   */
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
  /**
   * Call the service for update the data in the db
   * @param recordRow data to update
   */
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
