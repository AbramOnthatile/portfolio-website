import { useState } from 'react';
import { ArrowUpRight, CornerDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showcasedProjects, skillGroups } from '../data.js';

const commands = {
  help: ['about  /  projects  /  skills  /  contact  /  clear'],
  about: ['Abram Onthatile Mohlamonyane', 'ICT Application Development graduate · Cape Town, South Africa'],
  projects: showcasedProjects.map(({ name }) => name),
  skills: skillGroups.flatMap(({ items }) => items).filter((skill, index, skills) => skills.indexOf(skill) === index),
  contact: ['onthatileabram@gmail.com']
};

const starterLines = [
  { command: 'whoami', output: ['Abram Onthatile Mohlamonyane', 'Software Developer · Backend & Full-Stack'] },
  { command: 'status', output: ['Building useful software. Open to opportunities.'] }
];

export default function DeveloperTerminal() {
  const [history, setHistory] = useState(starterLines);
  const [value, setValue] = useState('');

  const submitCommand = (event) => {
    event.preventDefault();
    const command = value.trim().toLowerCase().replace(/^\$\s*/, '');
    if (!command) return;
    setValue('');

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    setHistory((current) => [...current, {
      command,
      output: commands[command] || ['Command not found. Type help to see available commands.']
    }]);
  };

  return (
    <section className="developer-terminal" aria-label="Interactive developer terminal">
      <div className="terminal-heading">
        <div className="terminal-lights" aria-hidden="true"><i /><i /><i /></div>
        <span>TECHNOVERSE / TERMINAL</span>
        <span className="terminal-state"><i /> LOCAL</span>
      </div>
      <div className="terminal-output" role="log" aria-live="polite" aria-label="Terminal output">
        {history.map(({ command, output }, index) => (
          <div className="terminal-entry" key={`${command}-${index}`}>
            <p className="terminal-command"><span>$</span> {command}</p>
            <div className="terminal-response">
              {output.map((line) => <p key={line}>{line}</p>)}
              {command === 'projects' && <Link to="/projects">Open selected work <ArrowUpRight size={13} /></Link>}
              {command === 'skills' && <Link to="/skills">Open skills index <ArrowUpRight size={13} /></Link>}
              {command === 'contact' && <a href="mailto:onthatileabram@gmail.com">Write an email <ArrowUpRight size={13} /></a>}
            </div>
          </div>
        ))}
      </div>
      <form className="terminal-input" onSubmit={submitCommand}>
        <label className="visually-hidden" htmlFor="terminal-command">Enter a terminal command</label>
        <span aria-hidden="true">$</span>
        <input id="terminal-command" value={value} onChange={(event) => setValue(event.target.value)} placeholder="try help" autoComplete="off" spellCheck="false" />
        <button type="submit" aria-label="Run command"><CornerDownLeft size={15} /></button>
      </form>
    </section>
  );
}