import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contacts'); 
      setMessages(res.data);
    } catch (err) {
      addToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id) => {
    try {
      await api.patch(`/contacts/${id}/status`);
      addToast('Marked as Replied', 'success');
      fetchMessages();
    } catch (err) {
      addToast('Update failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contacts/${id}`);
        addToast('Message deleted', 'success');
        fetchMessages();
      } catch (err) {
        addToast('Delete failed', 'error');
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-cyan-400">Contact Messages</h3>
      
      <div className="grid gap-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages found.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-white">{msg.subject}</h4>
                  <p className="text-sm text-cyan-400">{msg.name} ({msg.email})</p>
                </div>
                <div className="flex gap-2">
                  {msg.status === 'Pending' ? (
                    <button onClick={() => handleStatusUpdate(msg.id)} className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30" title="Mark as Replied">
                      <Clock size={18} />
                    </button>
                  ) : (
                    <span className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                      <CheckCircle size={18} />
                    </span>
                  )}
                  <button onClick={() => handleDelete(msg.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30" title="Delete Message">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic">"{msg.message}"</p>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${msg.status === 'Replied' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContacts;