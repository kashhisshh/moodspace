import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconGauge,
  IconMoodHappy,
  IconNotebook,
  IconBooks,
  IconArticle,
  IconApps,
  IconBrandDenodo,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./nav.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const data = [
  { icon: IconGauge, label: "Dashboard", link: "" },
  { icon: IconMoodHappy, label: "Mood", link: "/mood" },
  { icon: IconNotebook, label: "Journal", link: "/journal" },
  { icon: IconBooks, label: "Books", link: "/resources/books" },
  { icon: IconArticle, label: "Articles", link: "/resources/articles" },
  { icon: IconApps,label: "Apps", link: "/resources/apps" },
  { icon: IconBrandDenodo, label: "Organizations", link: "/resources/organizations" },
];

export default function Navigation() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(`/dashboard${item.link}`)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Link
          to="/logout"
          className={classes.link}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
