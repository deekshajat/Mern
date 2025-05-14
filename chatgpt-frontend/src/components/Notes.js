import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingNote, setEditingNote] = useState(null);
    const { token } = useAuth();

    const authConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/notes`, authConfig);
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNote) {
                await axios.put(`${config.apiUrl}/api/notes/${editingNote._id}`, {
                    title,
                    content
                }, authConfig);
                setEditingNote(null);
            } else {
                await axios.post(`${config.apiUrl}/api/notes`, {
                    title,
                    content
                }, authConfig);
            }
            setTitle('');
            setContent('');
            fetchNotes();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/notes/${id}`, authConfig);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="notes-container">
            <form onSubmit={handleSubmit} className="note-form">
                <h2>{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editingNote ? 'Update' : 'Add'} Note</button>
                {editingNote && (
                    <button type="button" onClick={() => {
                        setEditingNote(null);
                        setTitle('');
                        setContent('');
                    }}>Cancel</button>
                )}
            </form>

            <div className="notes-list">
                <h2>Your Notes</h2>
                {notes.map((note) => (
                    <div key={note._id} className="note-card">
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <div className="note-actions">
                            <button onClick={() => handleEdit(note)}>Edit</button>
                            <button onClick={() => handleDelete(note._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes; 