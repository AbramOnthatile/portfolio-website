import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { Moon, Sun } from 'lucide-react';

export default function ThemeControl({ theme, onThemeToggle }) {
  return (
    <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} arrow>
      <label className="theme-control">
        <span className="theme-icon" aria-hidden="true">{theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}</span>
        <Switch checked={theme === 'light'} onChange={onThemeToggle} size="small" slotProps={{ input: { 'aria-label': 'Toggle light theme' } }} />
      </label>
    </Tooltip>
  );
}