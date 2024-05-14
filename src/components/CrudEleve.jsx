import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function CrudEleve() {
    const [eleve, setEleve] = useState('');
    const [eleves, setEleves] = useState([]);
    const [edit, setEdit] = useState(false);
    const [noteScience, setEleveNoteScience] = useState(0);
    const [noteFrancais, setEleveNoteFrancais] = useState(0);
    const [noteGeo, setEleveNoteGeo] = useState(0);
    const refName = useRef(null);
    const refNoteFR = useRef(null);
    const refNoteScience = useRef(null);
    const refNoteGeo = useRef(null);
    const refEdit = useRef(null);
    const [newEleveName, setNewEleveName] = useState('');
    const [newEleveNoteScience, setNewEleveNoteScience] = useState(0);
    const [newEleveNoteFrancais, setNewEleveNoteFrancais] = useState(0);
    const [newEleveNoteGeo, setNewEleveNoteGeo] = useState(0);
    const [editEleveId, setEditEleveId] = useState(0);
    const [eleveId, setEleveId] = useState(0);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem('students'));
        if (students) {
            setEleves(students);
        }
    }, []);

    const saveToLocalStorage = (eleves) => {
        localStorage.setItem('students', JSON.stringify(eleves));
    }

    const handleChange = (e) => {
        setEleve(e.target.value);
    }

    const handleEdit = (eleve) => {
        setEditEleveId(eleve.id);
        setNewEleveName(eleve.eleve);
        setNewEleveNoteScience(eleve.noteScience);
        setNewEleveNoteFrancais(eleve.noteFrancais);
        setNewEleveNoteGeo(eleve.noteGeo);
        setEdit(true);
    }

    const handleDelete = (e) => {
        if (edit) {
            setEdit(false);
        }
        const eleveId = e.target.parentElement.parentElement.getAttribute('data-eleve-id');

        const newEleves = eleves.filter((eleve) => eleve.id != eleveId);
        setEleves(newEleves);
        saveToLocalStorage(newEleves);
    }

    const handleSave = (e) => {
        const eleveId = e.target.parentElement.parentElement.getAttribute('data-eleve-id');
        const newEleves = eleves.map((eleve) => {
            if (eleve.id == eleveId) {
                eleve.eleve = newEleveName;
                eleve.noteScience = newEleveNoteScience;
                eleve.noteFrancais = newEleveNoteFrancais;
                eleve.noteGeo = newEleveNoteGeo;
                eleve.notes = [];
                eleve.notes.push(parseInt(newEleveNoteScience), parseInt(newEleveNoteFrancais), parseInt(newEleveNoteGeo));
                eleve.moyenne = moyenne(eleve.notes);
                setNotes([]);
            }
            return eleve;
        })
        setEdit(false);
        setEleves(newEleves);
        saveToLocalStorage(eleves);

    }

    function createEleve(id, eleve) {
        if (edit) {
            setEdit(false);
        }
        notes.push(parseInt(noteScience), parseInt(noteFrancais), parseInt(noteGeo));
        const eleveObject = { id: eleves.length, eleve: eleve, noteScience: noteScience, noteFrancais: noteFrancais, noteGeo: noteGeo, notes: notes };
        setNotes([])
        setEleves(prevEleves => {
            const updatedEleves = [...prevEleves, eleveObject];
            saveToLocalStorage(updatedEleves);
            return updatedEleves;
        });
        saveToLocalStorage(eleves);
    }

    function moyenne(notes) {
        let totale = 0;
        for (let i = 0; i < notes.length; i++) {
            totale += notes[i];
        }

        return (totale / notes.length).toFixed(2);
    }

    function html(eleve) {
        const isEditing = editEleveId === eleve.id;

        if (edit && isEditing) {
            return (
                <>
                    <tr key={eleve.id} data-eleve-id={eleve.id} className='text-center'>
                        <td className="border border-gray-300"><input className="border border-black rounded-lg font-bold px-3" type="text" value={newEleveName} onChange={(e) => setNewEleveName(e.target.value)} /></td>
                        <td className="border border-gray-300"><input className="border border-black rounded-lg font-bold px-3" type="number" value={newEleveNoteFrancais} onChange={(e) => setNewEleveNoteFrancais(e.target.value)} /></td>
                        <td className="border border-gray-300"><input className="border border-black rounded-lg font-bold px-3" type="number" value={newEleveNoteScience} onChange={(e) => setNewEleveNoteScience(e.target.value)} /></td>
                        <td className="border border-gray-300"><input className="border border-black rounded-lg font-bold px-3" type="number" value={newEleveNoteGeo} onChange={(e) => setNewEleveNoteGeo(e.target.value)}></input></td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300"><button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Enregistrer</button></td>
                    </tr>
                </>
            )
        } else {
            return (
                <>
                    <tr key={eleve.id} data-eleve-id={eleve.id} className='text-center'>
                        <td className="border border-gray-300"><p id="name" ref={refName}>{eleve.eleve}</p></td>
                        <td className="border border-gray-300"><p id="notefr" ref={refNoteFR}>{eleve.noteFrancais}</p></td>
                        <td className="border border-gray-300"><p id="notescience" ref={refNoteScience}>{eleve.noteScience}</p></td>
                        <td className="border border-gray-300"><p id="notegeo" ref={refNoteGeo}>{eleve.noteGeo}</p></td>
                        <td className="border border-gray-300"><p id="moyenne">{moyenne(eleve.notes)}</p></td>
                        <td className="border border-gray-300">
                            <button id="btn-edit" ref={refEdit} onClick={() => handleEdit(eleve)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Modifier</button>
                            <button id="btn-delete" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Supprimer</button>
                        </td>
                    </tr>
                </>
            )
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden space-y-4">
                <div className="p-6 space-y-4">
                    <label htmlFor="nomEleve" className="">
                    Nom de l'élève
                    </label>
                    <input
                    id="nomEleve"
                    type="search"
                    value={eleve}
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300'
                    onChange={handleChange}
                    data-eleve-id={eleveId}
                    placeholder="Nom de l'élève"
                    name='nomEleve'
                    />

                    <label htmlFor="noteScience" className="">
                    Note de science
                    </label>
                    <input
                    id="noteScience"
                    type="number"
                    value={noteScience}
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300'
                    onChange={(e) => setEleveNoteScience(e.target.value)}
                    placeholder="Note en Science"
                    />

                    <label htmlFor="noteFrancais" className="">
                    Note de français
                    </label>
                    <input
                    id="noteFrancais"
                    type="number"
                    value={noteFrancais}
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300'
                    onChange={(e) => setEleveNoteFrancais(e.target.value)}
                    placeholder="Note en Français"
                    />

                    <label htmlFor="noteGeo" className="">
                    Note de géographie
                    </label>
                    <input
                    id="noteGeo"
                    type="number"
                    value={noteGeo}
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300'
                    onChange={(e) => setEleveNoteGeo(e.target.value)}
                    placeholder="Note en Géographie"
                    />
                    <button
                        onClick={() => createEleve(eleveId, eleve)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
            <div className="w-full py-3 px-5 bg-white rounded-xl shadow-md overflow-hidden space-y-4">
                <table className="w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Note de Français</th>
                            <th className="px-4 py-2">Note de Science</th>
                            <th className="px-4 py-2">Note de Géographie</th>
                            <th className="px-4 py-2">Moyenne</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='eleves'>
                        {eleves.map((eleve, i) => (
                            html(eleve, i)
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
