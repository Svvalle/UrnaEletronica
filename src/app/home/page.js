"use client"; // Necessário para usar hooks no Next.js 13+

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import UrnaEletronica from "../../components/UrnaEletronica";
//import styles from "../app/urna.css"

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('darkTheme', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('darkTheme', 'false');
    }
  };

  return (
    <div className={styles.page}>
      <UrnaEletronica/> 
      <button id="themeToggle" onClick={toggleTheme}>
        {isDarkTheme ? "☀️ Alterar Tema" : "🌙 Alterar Tema"}
      </button>
    </div>
  );
}