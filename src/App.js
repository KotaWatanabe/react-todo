import React, { Component } from 'react';
import logo from './logo.svg';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm'
import './App.css';
import { DB_CONFIG } from './Config/Config';
import firebase from 'firebase/app'
class App extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initilalizeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.state ={
      notes: [],
    }
  }

  addNote=(note)=>{
    const previousNotes = this.state.notes;
    previousNotes.push({ id: previousNotes.length + 1, noteContent: note });
    this.setState({
      notes: previousNotes
    })
    
  }

  render(){
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To - Do List</div>
        </div>
        <div className="noteBody">
          {
            this.state.notes.map((note)=>{
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id}/>
              )
            })
          }
          
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  } 
}

export default App;
