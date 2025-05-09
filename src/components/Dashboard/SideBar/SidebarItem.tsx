import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { TDrawerItem } from '@/types';
import { usePathname } from 'next/navigation';

type TProps = {
  item: TDrawerItem;
};

const SidebarItem = ({ item }: TProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();

  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathName === linkPath
            ? {
                borderLeft: '4px solid #5A9F68',
                '& svg': {
                  color: '#5A9F68',
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
