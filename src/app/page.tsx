import { Button } from "~/components/Button";

import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Button>Pay total</Button>
      </div>
    </main>
  );
}
