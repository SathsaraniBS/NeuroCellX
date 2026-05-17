import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

const EVChargingCost = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-navy-950 via-dark-500 to-navy-950 text-white font-sans">
            {/* Navigation */}
            <Navbar />

            <EVCalculator />

            {/* Footer */}
            <Footer />
            <EVChatbot />

        </div>
    );
};

export default EVChargingCost; 