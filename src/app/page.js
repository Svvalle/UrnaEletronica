import Image from "next/image";
import styles from "./page.module.css";
import UrnaEletronica from "./urna";

export default function Home() {
  return (
    <div className={styles.page}>
      <UrnaEletronica/>
    </div>
  );
}