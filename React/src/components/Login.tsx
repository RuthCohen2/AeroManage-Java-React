import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// הגדרת המבנה של המשתמש שהשרת מחזיר
interface UserDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
}

// הגדרת ה-Props: הקומפננטה מקבלת פונקציה מ-App כדי לעדכן אותו כשיש הצלחה
interface LoginProps {
  onLoginSuccess: (user: UserDTO) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post<UserDTO>(
        `http://localhost:8081/api/users/login?username=${username}&password=${password}`
      );
      
      // שליחת המשתמש שהתחבר בחזרה לקומפננטת App האבא
      onLoginSuccess(response.data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage("שגיאה: שם משתמש או סיסמה שגויים");
      } else {
        setErrorMessage("לא ניתן להתחבר לשרת הג'אווה. ודאי שהוא רץ על פורט 8081");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', fontFamily: 'Arial', direction: 'rtl' }}>
      <h2>התחברות למערכת הטיסות</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="שם משתמש" 
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', textAlign: 'right' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="password" 
            placeholder="סיסמה" 
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa', textAlign: 'right' }}
            required 
          />
        </div>
        
        {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
        
        <button type="submit" style={{ width: '95%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          התחבר
          </button>
      </form>
    </div>
  );
}

export default Login;