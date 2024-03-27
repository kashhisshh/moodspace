import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import useAuthStore from '../../stores/authStore';

export function UserButton() {
  const uname = useAuthStore((store)=>store.uname);
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {uname}
          </Text>

          <Text c="dimmed" size="xs">
            {uname}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}