"use client";

import styles from "./TabBar.module.css";

export type TabName = "HOME" | "WORK" | "ABOUT" | "CONTACT";

interface TabBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  visible: boolean;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, visible }) => {
  if (!visible) {
    return null;
  }

  const tabs: TabName[] = ["HOME", "WORK", "ABOUT", "CONTACT"];

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tabButton} ${
            activeTab === tab ? styles.active : ""
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabBar;
