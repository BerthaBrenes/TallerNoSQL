import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  /**
   * The name of the Collection of data
   */
  collectionName = 'Students';
  /**
   * First method in the service
   * @param firestore Controller for access to the firebase API
   */
  constructor(
    private firestore: AngularFirestore
  ) { }
  /**
   * Create a new student in the collection
   * @param record data of the student
   */
  create_student(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }
  /**
   * Read all the student data from the collection
   */
  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  /**
   * Update data of a student
   * @param recordID id of the student
   * @param record data for update
   */
  update_student(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }
  /**
   * Delete an student function
   * @param record_id id of the student
   */
  delete_student(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
