import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  // Variablen für "collectData()" um Daten mit Firebase abzurufen
  items$;
  items;

  // Variablen für "onSnapshot()" um Daten mit Firebase abzurufen
  unsubList;
  unsubSingle;

  firestore: Firestore = inject(Firestore);


  constructor() {
    // Variante mit "collectData()" um Daten mit Firebase abzurufen
    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    });
    this.items.unsubscribe();


    // 1. Variante mit "onSnapshot()" um Daten mit Firebase abzurufen
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      })
    })

    // 2. Variante mit "onSnapshot()" um Daten mit Firebase abzurufen
    this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a64456ef486464"), (element) => {

    })

    // so werden die Daten die mit onSnapshot() von Firebase abgerufen wurden wieder unsubscribed
    this.unsubSingle();
    this.unsubList();
  }

  // const itemCollection = collection(this.firestore, 'items');

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }


  getTrashRef() {
    return collection(this.firestore, 'trash');
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}