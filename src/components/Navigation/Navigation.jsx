import {
  Text,
  Group,
} from '@mantine/core';
import { IconMoodHappyFilled, IconGauge, IconNotebook} from '@tabler/icons-react';
import classes from './nav.module.css';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { icon: IconGauge, label: 'Dashboard', link: ""},
  {icon: IconMoodHappyFilled, label:"Mood", link:"/mood"},
  {icon: IconNotebook, label: 'Journal', link:"/journal"}
];

const resources = [
  { label: 'Books', link:"/resources/books" },
  { label: 'Articles', link:"/resources/articles" },
  { label: 'Apps', link:"/resources/apps" },
  { label: 'Organizations', link:"/resources/organizations" },
];

export default function Navigation() {
  const mainLinks = links.map((link) => (
    <NavLink key={link.label} className={classes.mainLink} component={Link} to={{pathname: `/dashboard${link.link}`}}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </NavLink>
  ));

  const collectionLinks = resources.map((item) => (
    <NavLink key={item.label} className={classes.mainLink} component={Link} to={{pathname: `/dashboard${item.link}`}}>
      <div className={classes.mainLinkInner}>
        <span>{item.label}</span>
      </div>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Resources
          </Text>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </div>
    </nav>
  );
}