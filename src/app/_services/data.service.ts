import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, deleteUser, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class DataService {

}